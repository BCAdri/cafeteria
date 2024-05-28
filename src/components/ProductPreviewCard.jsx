import { AddProduct } from "./AddProduct";
import { RemoveProduct } from "./RemoveProduct";

import simcafs from "../assets/img/cafeteria.png";

export const ProductPreviewCard = ({ product, onAddProduct, onRemoveProduct }) => {
    const addProduct = () => {
        onAddProduct(product)
    }
    const removeProduct = () =>{
        onRemoveProduct(product._id);
    }
    return (
        <div className="w-full p-4 m-2 rounded text-white bg-gradient-to-b from-slate-600 to-transparent text-center">
            {product.image ? (
                <img src={`data:image/png;base64,${product.image}`} alt={product.name} />
            ) : (
                <div>No image available</div>
            )}
            <h2 className="pb-2 text-lg">{product.name}</h2>
            <p className="mb-2 h-20 line-clamp-4">{product.description}</p>
            <div className="flex justify-between">
                <RemoveProduct onRemoveProduct={removeProduct} />
                <AddProduct onAddProduct={addProduct} />
            </div>

        </div>
    )
}