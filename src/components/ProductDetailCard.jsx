import Button from "./elements/button";
import simcafs from "../assets/img/cafeteria.png";

const ProductDetailCard = ({ product, onAddProduct }) => {
  return (
    <div className="p-2 m-2 rounded-lg bg-slate-50">
      <div className="flex flex-col items-center justify-between">
        <h2 className="text-xl">{product.name}</h2>
        <p className="text-lg text-gray-500">{product.description}</p>
        <div className="flex items-center justify-between">
          <div className="text-lg text-black">${product.price}</div>
        </div>
      </div>
      <div className="w-full flex items-center justify-center mt-2 mb-1">
        {product.image ? (
          <img src={`data:image/png;base64,${product.image}`} className="w-32 h-32 rounded-xl object-cover" alt={product.name} />
        ) : (
          <img src={`${simcafs}`} className="w-32 h-32 rounded-xl object-cover" alt="" />
        )}
      </div>
      <div className="w-full flex items-center justify-center">
        <Button variant="dark" size="small" onClick={() => onAddProduct(product)}>Add to Cart</Button>
      </div>
    </div>
  );
};

export default ProductDetailCard;