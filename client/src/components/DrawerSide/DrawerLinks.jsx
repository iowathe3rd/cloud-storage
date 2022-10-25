import React from 'react';
import Logo from "../../assets/logo.png";
import {setTheme} from "../../reducers/themeReducer";
import {useDispatch} from "react-redux";

const DrawerLinks = () => {
    return (
        <div>
            <ul className="menu overflow-y-auto w-full">
                <li>
                    <div className="flex items-center">
                        <a href="/">
                            <img src={Logo} alt="" className="h-10" />
                        </a>
                        Cloud storage
                    </div>
                </li>
                <li><button>Хранилище</button></li>


                <li><button></button></li>
            </ul>
        </div>
    );
};

export default DrawerLinks;