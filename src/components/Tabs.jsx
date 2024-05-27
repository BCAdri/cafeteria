import { TabItem } from "./TabItem";

export const Tabs = ({ list, activeTab, onTabSwitch }) => {
    const categories = Array.isArray(list.categories) ? list.categories : [];

    return (
        <div className="sticky z-1900 bg-white">
            <div className="container mx-auto flex align-center py-2 border-b-gray-400 border-b-1">
                {categories.map((category, index) => {
                    return (
                        <TabItem 
                            title={category.name}
                            key={category._id}
                            active={activeTab === category.name}
                            setActive={() => onTabSwitch(category.name)}
                        />
                    );
                })}
            </div>
        </div>
    );
};
