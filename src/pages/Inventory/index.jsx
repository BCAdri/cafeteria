import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addProductAsync, deleteProductAsync, addCategoryAsync, deleteCategoryAsync } from './redux/inventorySlice';

function Inventory() {
  const [productName, setProductName] = useState('');
  const [categoryName, setCategoryName] = useState('');

  const products = useSelector(state => state.inventory.products);
  const categories = useSelector(state => state.inventory.categories);
  const dispatch = useDispatch();

  const handleAddProduct = () => {
    dispatch(addProductAsync({ name: productName }));
    setProductName('');
  };

  const handleDeleteProduct = (productId) => {
    dispatch(deleteProductAsync(productId));
  };

  const handleAddCategory = () => {
    dispatch(addCategoryAsync({ name: categoryName }));
    setCategoryName('');
  };

  const handleDeleteCategory = (categoryId) => {
    dispatch(deleteCategoryAsync(categoryId));
  };

  return (
    <div>
      <h2>Productos</h2>
      <ul>
        {products.map(product => (
          <li key={product.id}>
            {product.name}
            <button onClick={() => handleDeleteProduct(product.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
      <input
        type="text"
        value={productName}
        onChange={(e) => setProductName(e.target.value)}
      />
      <button onClick={handleAddProduct}>Añadir Producto</button>

      <h2>Categorías</h2>
      <ul>
        {categories.map(category => (
          <li key={category.id}>
            {category.name}
            <button onClick={() => handleDeleteCategory(category.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
      <input
        type="text"
        value={categoryName}
        onChange={(e) => setCategoryName(e.target.value)}
      />
      <button onClick={handleAddCategory}>Añadir Categoría</button>
    </div>
  );
}

export default Inventory;