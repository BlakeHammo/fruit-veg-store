import express from 'express';
import cors from 'cors';
import pool from './db.js';

const app = express();
app.use(cors());
app.use(express.json());


// Serve images from the /public folder
app.use('/images', express.static('src/assets'));


// Example test route
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from API!' });
});


// GET all products
app.get('/api/products', async (req, res) => {
  try {
    const [products] = await pool.query('SELECT * FROM products ORDER BY name');
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// GET product by ID
app.get('/api/products/:id', async (req, res) => {
  try {
    const [products] = await pool.query('SELECT * FROM products WHERE id = ?', [req.params.id]);
    if (products.length === 0) return res.status(404).json({ error: 'Product not found' });
    res.json(products[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch product' });
  }
});

// GET all orders with items
app.get('/api/orders', async (req, res) => {
  try {
    const [orders] = await pool.query('SELECT * FROM orders ORDER BY order_date DESC');

    const ordersWithItems = await Promise.all(
      orders.map(async order => {
        const [items] = await pool.query(
          `SELECT oi.quantity, oi.price, p.id AS product_id, p.name, p.image_url, p.category, p.unit
           FROM order_items oi
           JOIN products p ON oi.product_id = p.id
           WHERE oi.order_id = ?`,
          [order.id]
        );
        return { ...order, items };
      })
    );

    res.json(ordersWithItems);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

// GET single order by ID with items
app.get('/api/orders/:id', async (req, res) => {
  try {
    const [orders] = await pool.query('SELECT * FROM orders WHERE id = ?', [req.params.id]);
    if (orders.length === 0) return res.status(404).json({ error: 'Order not found' });
    const order = orders[0];

    const [items] = await pool.query(
      `SELECT oi.quantity, oi.price, p.id AS product_id, p.name, p.image_url, p.category, p.unit
       FROM order_items oi
       JOIN products p ON oi.product_id = p.id
       WHERE oi.order_id = ?`,
      [order.id]
    );

    res.json({ ...order, items });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch order' });
  }
});

// POST create a new order with items
app.post('/api/orders', async (req, res) => {
  const { customer_name, customer_email, customer_phone, notes, items } = req.body;

  if (!customer_name || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: 'customer_name and at least one item are required' });
  }

  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();

    // Calculate total price
    let total_price = 0;
    for (const item of items) {
      const [products] = await conn.query('SELECT price FROM products WHERE id = ?', [item.product_id]);
      if (products.length === 0) throw new Error(`Product ID ${item.product_id} not found`);
      total_price += products[0].price * item.quantity;
    }

    // Insert order
    const [orderResult] = await conn.query(
      `INSERT INTO orders (customer_name, customer_email, customer_phone, total_price, status, notes)
       VALUES (?, ?, ?, ?, 'Pending', ?)`,
      [customer_name, customer_email || null, customer_phone || null, total_price, notes || null]
    );
    const orderId = orderResult.insertId;

    // Insert order_items
    for (const item of items) {
      const [products] = await conn.query('SELECT price FROM products WHERE id = ?', [item.product_id]);
      const price = products[0].price;
      await conn.query(
        `INSERT INTO order_items (order_id, product_id, quantity, price)
         VALUES (?, ?, ?, ?)`,
        [orderId, item.product_id, item.quantity, price]
      );
    }

    await conn.commit();
    res.status(201).json({ message: 'Order created', order_id: orderId });
  } catch (err) {
    await conn.rollback();
    console.error(err);
    res.status(400).json({ error: err.message || 'Failed to create order' });
  } finally {
    conn.release();
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);
});
