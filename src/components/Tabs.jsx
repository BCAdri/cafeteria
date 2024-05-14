import { useState } from "react";
import { TabItem } from "./TabItem";

export const Tabs = ({ list, activeTab, onTabSwitch }) => {
    let active = activeTab === '' ? list.categories[0]._id : activeTab; // Asumo que activeTab debe ser comparado con _id
    const categories = Array.isArray(list.categories) ? list.categories : [];

    return (
        <div className="sticky z-1900 bg-white">
            <div className="container mx-auto flex align-center py-2 border-b-gray-400 border-b-1">
                {categories.map((category, index) => {
                    return (
                        <TabItem 
                            title={category.name}
                            key={category._id}
                            index={index}
                            active={active === category.name}
                            setActive={onTabSwitch}
                        />
                    )
                })}
            </div>
        </div>
    )
}