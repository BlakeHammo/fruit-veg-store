-- Create database
CREATE DATABASE IF NOT EXISTS click_collect_shop;
USE click_collect_shop;

-- Create products table
CREATE TABLE products (
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

-- Example data
INSERT INTO products (name, description, image_url, price, in_stock, stock_qty, category, unit)
VALUES
('Bananas', 'Fresh ripe bananas, perfect for smoothies and snacks.', '/images/bananas.jpg', 3.50, TRUE, 100, 'Fruit', 'kg'),
('Carrots', 'Crisp, sweet carrots ideal for salads or cooking.', '/images/carrots.jpg', 2.00, TRUE, 50, 'Vegetable', 'kg'),
('Parsley', 'Fresh parsley bunch, perfect for garnishing dishes.', '/images/parsley.jpg', 1.20, TRUE, 20, 'Herbs', 'bunch');
