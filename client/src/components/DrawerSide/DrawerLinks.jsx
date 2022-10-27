import React from 'react';
import Logo from "../../assets/logo.png";
import {NavLink} from "react-router-dom";

const DrawerLinks = () => {
    return (
        <div>
            <ul className="menu overflow-y-auto p-4 w-full">
                <li>
                    <div className="flex items-center">
                        <a href="/">
                            <img src={Logo} alt="" className="h-10" />
                        </a>
                        Cloud storage
                    </div>
                </li>
                <li><NavLink to="/disk">Хранилище</NavLink></li>
            </ul>
        </div>
    );
};

export default DrawerLinks;