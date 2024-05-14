const express = require('express')

const router = express.Router()
const { Product, Category } = require('../models/productModel');

router.get('/products', async (req, res) => {
    try {
        const products = await Product.find()
        res.status(200).send({ data: products})
    } catch (err) {
        res.status(400).send({ error: err})
    }
})

router.get('/categories', async (req, res) => {
    try {
        const categories = await Category.find()
        res.status(200).send({ data: categories})
    } catch (err) {
        res.status(400).send({ error: err})
    }
})

router.get('/products-by-categories', async(req, res) => {
    try {
        const products = await Product.aggregate([
            { $match: {}},
            { $group: {
                _id: '$category',
                products: { $push: '$$ROOT'}
            }},
            { $project: { name: '$_id', products: 1, _id: 0}}
        ])
        res.status(200).send({ data: products})
    } catch (err) {
        res.status(400).send({ error: err})
    }
})

router.get('/addProducts', async(req, res) => {
    try {
        const product = new Product({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            category: req.body.category
        });
        await product.save();
        console.log('Producto añadido correctamente:', product);
        return product;
    } catch (error) {
        console.error('Error al añadir producto:', error);
        throw error;
    }
})


router.get('/deleteProducts', async(req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.body.productId);
        if (!product) {
            console.log('Producto no encontrado.');
            return;
        }
        console.log('Producto eliminado correctamente:', product);
        return product;
    } catch (error) {
        console.error('Error al eliminar producto:', error);
        throw error;
    }
})


router.get('/addCategory', async(req, res) => {
    try {
        const category = new Category({
            name: req.body.name
        });
        await category.save();
        console.log('Categoría añadida correctamente:', category);
        return category;
    } catch (error) {
        console.error('Error al añadir categoría:', error);
        throw error;
    }
})


router.get('/deleteCategory', async(req, res) => {
    try {
        const category = await Category.findByIdAndDelete(req.body.categoryId);
        if (!category) {
            console.log('Categoría no encontrada.');
            return;
        }
        console.log('Categoría eliminada correctamente:', category);
        return category;
    } catch (error) {
        console.error('Error al eliminar categoría:', error);
        throw error;
    }
})


module.exports = router