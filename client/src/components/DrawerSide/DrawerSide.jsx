import React from 'react';
import DrawerLinks from "./DrawerLinks";
import DrawerBottom from "./DrawerBottom";


const DrawerSide = () => {
    return (
        <div className="bg-base-200 w-60 shadow-xl flex flex-col py-5 justify-between">
            <DrawerLinks/>
            <DrawerBottom/>
        </div>
    );
};

export default DrawerSide;