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

    console.log(products)
    useEffect(() => {
        dispatch(fetchProducts())
        dispatch(fetchCategories())
    }, [dispatch])

    const onAddProduct = (product) => {
        dispatch(addToCart(product))
    }

    useEffect(() => {
        if (categories.status === 'fulfilled' && categories.categories.length > 0) {
            setActiveTab(categories.categories[0].name);
            setActiveTabIndex(0);
        }
    }, [categories]);

       const onTabSwitch = (newActiveTab) => {
        setActiveTab(newActiveTab);
        if (categories.status === 'fulfilled') {
            const index = categories.categories.findIndex(category => category.name === newActiveTab);
            if (index > -1) {
                setActiveTabIndex(index);
            } else {
                setActiveTabIndex(0);
            }
        }
    }

    return (
        <div className="bg-white p-4">
            {products.status !== 'fulfilled' || categories.status !== 'fulfilled' ? (
                <div>Loading...</div>
            ) : (
                <div className="menu-wrapper">
                    {products.products && products.products.length > 0 ? (
                        <>  
                            <Tabs
                                list={categories}
                                activeTab={activeTab}
                                onTabSwitch={onTabSwitch}
                            />
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
                                {products.products[activeTabIndex].products.map((product, index) => (
                                        <ProductDetailCard key={index} product={product} onAddProduct={onAddProduct}/>
                                ))}
                            </div>
                        </>
                    ) : (
                        <div>There are no products available</div>
                    )}
                </div>
            )}
        </div>
    );
}


export default Menu;