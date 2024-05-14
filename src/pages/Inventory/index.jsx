import React, { useState, useEffect } from 'react';

function Inventory() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productCategory, setProductCategory] = useState('');
  const [categoryName, setCategoryName] = useState('');

  useEffect(() => {
    fetch('http://localhost:8000/api/categories')
      .then(response => response.json())
      .then(data => setCategories(data?.data || []))
      .catch(e => console.log(e));
  }, []);

  useEffect(() => {
    fetch('http://localhost:8000/api/products')
      .then(response => response.json())
      .then(data => setProducts(data?.data || []))
      .catch(e => console.log(e));
  }, []);

  const handleAddProduct = () => {
    if (!productName || !productDescription || !productPrice || !productCategory) {
      alert('Por favor, rellena todos los campos del producto');
      return;
    }
    fetch('http://localhost:8000/api/addProduct', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: productName, description: productDescription, price: '€'+productPrice, category: productCategory })
    })
      .then(response => response.json())
      .then(data => {
        setProducts([...products, data]);
        setProductName('');
        setProductDescription('');
        setProductPrice('');
        setProductCategory('');
      })
      .catch(e => console.log(e));
  };

  const handleDeleteProduct = (productId) => {
    fetch(`http://localhost:8000/api/deleteProduct/${productId}`, {
      method: 'DELETE'
    })
      .then(response => response.json())
      .then(() => {
        setProducts(products.filter(product => product._id !== productId));
      })
      .catch(e => console.log(e));
  };

  const handleAddCategory = () => {
    if (!categoryName) {
      alert('Por favor, rellena el nombre de la categoría');
      return;
    }
    fetch('http://localhost:8000/api/addCategory', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: categoryName })
    })
      .then(response => response.json())
      .then(data => {
        setCategories([...categories, data]);
        setCategoryName('');
      })
      .catch(e => console.log(e));
  };

  const handleDeleteCategory = (categoryId) => {
    fetch(`http://localhost:8000/api/deleteCategory/${categoryId}`, {
      method: 'DELETE'
    })
      .then(response => response.json())
      .then(() => {
        setCategories(categories.filter(category => category._id !== categoryId));
      })
      .catch(e => console.log(e));
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Productos</h2>
      <ul className="list-disc list-inside mb-4">
        {products.map(product => (
          <li key={product._id} className="flex justify-between items-center p-2 border rounded mb-2">
            {product.name} - {product.description} - ${product.price} - {product.category}
            <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={() => handleDeleteProduct(product._id)}>Eliminar</button>
          </li>
        ))}
      </ul>
      <div className="mb-4">
        <h3 className="text-xl font-semibold mb-2">Añadir Producto</h3>
        <input
          type="text"
          placeholder="Nombre"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          className="w-full p-2 border rounded mb-2"
        />
        <input
          type="text"
          placeholder="Descripción"
          value={productDescription}
          onChange={(e) => setProductDescription(e.target.value)}
          className="w-full p-2 border rounded mb-2"
        />
        <input
          type="number"
          placeholder="Precio"
          value={productPrice}
          onChange={(e) => setProductPrice(e.target.value)}
          className="w-full p-2 border rounded mb-2"
        />
        <input
          type="text"
          placeholder="Categoría"
          value={productCategory}
          onChange={(e) => setProductCategory(e.target.value)}
          className="w-full p-2 border rounded mb-2"
        />
        <button className="bg-green-500 text-white px-4 py-2 rounded w-full" onClick={handleAddProduct}>Añadir Producto</button>
      </div>

      <h2 className="text-2xl font-bold mb-4">Categorías</h2>
      <ul className="list-disc list-inside mb-4">
        {categories.map(category => (
          <li key={category._id} className="flex justify-between items-center p-2 border rounded mb-2">
            {category.name}
            <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={() => handleDeleteCategory(category._id)}>Eliminar</button>
          </li>
        ))}
      </ul>
      <div>
        <h3 className="text-xl font-semibold mb-2">Añadir Categoría</h3>
        <input
          type="text"
          placeholder="Nombre"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          className="w-full p-2 border rounded mb-2"
        />
        <button className="bg-green-500 text-white px-4 py-2 rounded w-full" onClick={handleAddCategory}>Añadir Categoría</button>
      </div>
    </div>
  );
}

export default Inventory;