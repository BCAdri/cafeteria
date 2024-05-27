import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, selectAllProducts } from "../../stores/menu/productsSlice";
import ProductDetailCard from "../../components/ProductDetailCard";
import { Tabs } from "../../components/Tabs";
import { addToCart } from "../../stores/cart/cartSlice";
import { fetchCategories, selectAllCategories } from "../../stores/menu/categoriesSlice";

const Menu = () => {
    const dispatch = useDispatch();
    const products = useSelector(selectAllProducts);
    const categories = useSelector(selectAllCategories);
    const [activeTabName, setActiveTabName] = useState('');

    useEffect(() => {
        dispatch(fetchProducts());
        dispatch(fetchCategories());
    }, [dispatch]);

    const onAddProduct = (product) => {
        dispatch(addToCart(product));
    };

    useEffect(() => {
        if (categories.status === 'fulfilled' && categories.categories.length > 0) {
            setActiveTabName(categories.categories[0].name);
        }
    }, [categories]);

    const onTabSwitch = (newActiveTabName) => {
        setActiveTabName(newActiveTabName);
    };

    const filteredProducts = products.products.flatMap(group => 
        group.products.filter(product => product.category.name === activeTabName)
    );
    return (
        <div className="bg-white p-4">
            {products.status !== 'fulfilled' || categories.status !== 'fulfilled' ? (
                <div className="text-center">Loading...</div>
            ) : (
                <>
                    <Tabs
                        list={categories}
                        activeTab={activeTabName}
                        onTabSwitch={onTabSwitch}
                    />
                    <div className="menu-wrapper">
                        {filteredProducts.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
                                {filteredProducts.map((product) => (
                                    <ProductDetailCard key={product._id} product={product} onAddProduct={onAddProduct} />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center">No products available for this category</div>
                        )}
                    </div>
                </>
            )}
        </div>
    );
};

export default Menu;
