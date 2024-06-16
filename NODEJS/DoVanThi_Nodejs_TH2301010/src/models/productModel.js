const db = require('../db');

const Product = {
    getAllProducts: (callback) => {
        const sql = 'SELECT * FROM Product';
        db.query(sql, callback);
    },

    addProduct: (newProduct, callback) => {
        const { ProductCode, ProductName, ProductDate, ProductOriginPrice, Quantity, ProductStoreCode } = newProduct;
        const sql = 'INSERT INTO Product (ProductCode, ProductName, ProductDate, ProductOriginPrice, Quantity, ProductStoreCode) VALUES (?, ?, ?, ?, ?, ?)';
        db.query(sql, [ProductCode, ProductName, ProductDate, ProductOriginPrice, Quantity, ProductStoreCode], callback);
    },

    getProductById: (productId, callback) => {
        const sql = 'SELECT * FROM Product WHERE id = ?';
        db.query(sql, [productId], (err, result) => {
            if (err) return callback(err);
            if (result.length === 0) return callback(null, null);
            callback(null, result[0]);
        });
    },

    updateProduct: (productId, updatedProduct, callback) => {
        const { ProductCode, ProductName, ProductDate, ProductOriginPrice, Quantity, ProductStoreCode } = updatedProduct;
        const sql = 'UPDATE Product SET ProductCode = ?, ProductName = ?, ProductDate = ?, ProductOriginPrice = ?, Quantity = ?, ProductStoreCode = ? WHERE id = ?';
        db.query(sql, [ProductCode, ProductName, ProductDate, ProductOriginPrice, Quantity, ProductStoreCode, productId], callback);
    },

    deleteProduct: (productId, callback) => {
        const sql = 'DELETE FROM Product WHERE id = ?';
        db.query(sql, [productId], callback);
    },

    getAllProductsSortedByStoreCode: (callback) => {
        const sql = 'SELECT * FROM Product ORDER BY ProductStoreCode DESC';
        db.query(sql, callback);
    }
};

module.exports = Product;
