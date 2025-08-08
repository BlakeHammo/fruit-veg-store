-- Create database
DROP DATABASE IF EXISTS click_collect_shop;
CREATE DATABASE click_collect_shop;
USE click_collect_shop;

-- ========================
-- PRODUCTS TABLE
-- ========================
CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    image_url VARCHAR(255),
    price DECIMAL(10,2) NOT NULL,
    in_stock BOOLEAN DEFAULT TRUE,
    stock_qty INT DEFAULT 0,
    category VARCHAR(50),
    unit VARCHAR(20),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Example products
INSERT INTO products (name, description, image_url, price, stock_qty, category, unit)
VALUES
('Bananas', 'Fresh ripe bananas, perfect for smoothies and snacks.', '/images/bananas.jpg', 3.50,  100, 'Fruit', 'kg'),
('Carrots', 'Crisp, sweet carrots ideal for salads or cooking.', '/images/carrots.jpg', 2.00,  50, 'Vegetable', 'kg'),
('Parsley', 'Fresh parsley bunch, perfect for garnishing dishes.', '/images/parsley.jpg', 1.20, 20, 'Herbs', 'bunch');

-- ========================
-- ORDERS TABLE
-- ========================
CREATE TABLE IF NOT EXISTS orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    customer_name VARCHAR(100) NOT NULL,
    customer_email VARCHAR(100),
    customer_phone VARCHAR(20),
    order_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    total_price DECIMAL(10,2) NOT NULL,
    status VARCHAR(20) DEFAULT 'Pending',
    notes TEXT
);

-- Example orders
INSERT INTO orders (customer_name, customer_email, customer_phone, total_price, status)
VALUES
('John Smith', 'john@example.com', '0412345678', 5.50, 'Pending'),
('Mary Jones', 'mary@example.com', '0498765432', 3.50, 'Completed');

-- ========================
-- ORDER_ITEMS TABLE
-- ========================
CREATE TABLE IF NOT EXISTS order_items (
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    PRIMARY KEY (order_id, product_id),
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id)
);


-- Example order items
INSERT INTO order_items (order_id, product_id, quantity, price)
VALUES
(1, 2, 1, 1.80),  -- Order 1, Carrots
(1, 3, 1, 3.70),  -- Order 1, Parsley
(2, 1, 1, 3.50);  -- Order 2, Bananas
