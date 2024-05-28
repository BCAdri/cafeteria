import Button from "./elements/button";
import simcafs from "../assets/img/cafeteria.png";

const ProductDetailCard = ({ product, onAddProduct, onRemoveProduct }) => {
  return (
    <div className="p-2 m-2 rounded-lg bg-white shadow-md">
      <div className="flex flex-col items-center justify-between">
        <h2 className="text-xl font-semibold">{product.name}</h2>
        <p className="text-base text-gray-600 mb-4">{product.description}</p>
        <div className="flex items-center justify-between w-full">
          <div className="text-lg text-black font-semibold">${product.price}</div>
        </div>
      </div>
      <div className="w-full flex items-center justify-center mt-2 mb-1">
        {product.image ? (
          <img src={`data:image/png;base64,${product.image}`} className="w-32 h-32 rounded-lg object-cover" alt={product.name} />
        ) : (
          <img src={`${simcafs}`} className="w-32 h-32 rounded-lg object-cover" alt="" />
        )}
      </div>
      <div className="w-full flex items-center justify-center space-x-4 mt-2">
        <button className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-sm" onClick={() => onRemoveProduct(product._id)}>Eliminar</button>
        <button className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-sm" onClick={() => onAddProduct(product)}>Añadir</button>
      </div>
    </div>
  );
};

export default ProductDetailCard;