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
                _id: '$category.name',
                products: { $push: '$$ROOT'}
            }},
            { $project: { name: '$name', products: 1, _id: 0}}
        ])
        res.status(200).send({ data: products})
    } catch (err) {
        res.status(400).send({ error: err})
    }
});

router.post('/addProduct', async (req, res) => {
    try {
      const { name, description, price, categoryName, imageBase64  } = req.body;
  
      if (!name || !description || !price || !categoryName) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
      }
  
      let existingCategory = await Category.findOne({ name: categoryName });
      if (!existingCategory) {
        existingCategory = new Category({ name: categoryName });
        await existingCategory.save();
      }
  
      const newProduct = new Product({ 
        name, 
        description, 
        price, 
        category: {name: categoryName},
        image : imageBase64 
      });
        await newProduct.save();
  
      return res.status(201).json({ product: newProduct });
    } catch (error) {
      console.error('Error al añadir producto:', error);
      return res.status(500).json({ error: 'Error al añadir producto' });
    }
  });

router.delete('/deleteProduct/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndDelete(id);
        if (!product) {
            console.log('Producto no encontrado.');
            return res.status(404).json({ error: 'Producto no encontrado' });
        }
        console.log('Producto eliminado correctamente:', product);
        return res.status(200).json(product);
    } catch (error) {
        console.error('Error al eliminar producto:', error);
        return res.status(500).json({ error: 'Error al eliminar producto' });
    }
});

router.post('/addCategory', async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) {
            return res.status(400).json({ error: 'El nombre es obligatorio' });
        }

        const category = new Category({ name });
        await category.save();
        console.log('Categoría añadida correctamente:', category);
        return res.status(201).json(category);
    } catch (error) {
        console.error('Error al añadir categoría:', error);
        return res.status(500).json({ error: 'Error al añadir categoría' });
    }
});

router.delete('/deleteCategory/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const category = await Category.findByIdAndDelete(id);
        if (!category) {
            console.log('Categoría no encontrada.');
            return res.status(404).json({ error: 'Categoría no encontrada' });
        }
        console.log('Categoría eliminada correctamente:', category);
        return res.status(200).json(category);
    } catch (error) {
        console.error('Error al eliminar categoría:', error);
        return res.status(500).json({ error: 'Error al eliminar categoría' });
    }
});

module.exports = router;