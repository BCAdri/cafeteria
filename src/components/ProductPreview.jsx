import React, { useState, useEffect } from "react";
import { ProductPreviewCard } from "./ProductPreviewCard";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { useDispatch } from "react-redux";
import { addToCart,decrementProductAmount } from "../stores/cart/cartSlice";


export const ProductsPreview = () => {
    const [products, setProducts] = useState([]);
    const dispatch = useDispatch();

    const responsive = {
        superLargeDesktop: {
          // the naming can be any, depends on you.
          breakpoint: { max: 4000, min: 3000 },
          items: 5
        },
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 3
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 2
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1
        }
      };

    useEffect(() => {
        fetch('http://localhost:8000/api/products')
            .then(response => response.json())
            .then(data => setProducts(data?.data))
            .catch(e => console.log(e))
    }, [])

    const onAddProduct = (product) => {
        dispatch(addToCart(product))
    }
    const onRemoveProduct = (productId) => {
      dispatch(decrementProductAmount({_id: productId }));
    };

    return (
      <div className="container mx-auto pb-4 w-2/3 text-white bg-gray-800">
          {products && products.length > 0 ? (
              <Carousel responsive={responsive}>
                  {products.map((product, index) => (
                      <div className="w-full p-3" key={index}>
                          <ProductPreviewCard product={product} onAddProduct={onAddProduct} onRemoveProduct={onRemoveProduct} />
                      </div>
                  ))}
              </Carousel>
          ) : (
              <div className="text-center">No hay productos disponibles</div>
          )}
      </div>
  )
}