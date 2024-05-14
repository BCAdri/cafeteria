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
    const [activeTab, setActiveTab] = useState('');
    const [activeTabIndex, setActiveTabIndex] = useState(0);
    
    useEffect(() => {
        dispatch(fetchProducts())
        dispatch(fetchCategories())
    }, [dispatch])

    const onAddProduct = (product) => {
        dispatch(addToCart(product))
    }

    const onTabSwitch = (newActiveTab) => {
        setActiveTab(newActiveTab);
        const index = categories.categories.findIndex(category => category.name === newActiveTab);
        if (index > -1) {
            setActiveTabIndex(index);
        } else {
            setActiveTabIndex(0);
        }
    }

    return (
        <div className="bg-white">
            {products.status !== 'fulfilled' ? (
                <div>loading...</div>
            ) : (
                <div className="menu-wrapper">
                    {products.products && products.products.length > 0 ? (
                        <>  
                           <Tabs
                            list={categories}
                            activeTab={activeTab}
                            onTabSwitch={onTabSwitch}
                            />
                            <div className="flex flex-row mx-3">
                                {products.products[activeTabIndex].products.map((product, index) => (
                                    <ProductDetailCard key={index} product={product} onAddProduct={onAddProduct}/>
                                ))}
                            </div>
                        </>
                    ) : (
                        <div>No hay productos disponibles</div>
                    )}
                </div>
            )}
        </div>
    );
}

export default Menu;