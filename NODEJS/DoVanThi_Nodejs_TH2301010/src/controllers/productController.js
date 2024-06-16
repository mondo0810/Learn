const express = require('express');
const router = express.Router();
const Product = require('../models/productModel');

router.get('/', (req, res) => {
    Product.getAllProducts((err, results) => {
        if (err) throw err;
        res.render('product', { products: results });
    });
});

router.post('/', (req, res) => {
    Product.addProduct(req.body, (err, result) => {
        if (err) throw err;
        res.redirect('/products');
    });
});

router.post('/:id', (req, res) => {
    const productId = req.params.id;
    const updatedProduct = req.body;
    Product.updateProduct(productId, updatedProduct, (err, result) => {
        if (err) throw err;
        res.redirect('/products');
    });
});

router.get('/:id/edit', (req, res) => {
    const productId = req.params.id;
    Product.getProductById(productId, (err, product) => {
        if (err) throw err;
        if (!product) {
            return res.status(404).send('Product not found');
        }
        res.render('edit', { product });
    });
});

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    Product.deleteProduct(id, (err, result) => {
        if (err) throw err;
        res.json("Delete Product Successfully");
    });
});

router.get('/sort', (req, res) => {
    Product.getAllProductsSortedByStoreCode((err, results) => {
        if (err) throw err;
        res.render('product', { products: results });
    });
});

router.get('/add', (req, res) => {
    res.render('add');
});

module.exports = router;
