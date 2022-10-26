import React from 'react';
import {logout} from "../../reducers/userReducer";
import {useDispatch} from "react-redux";
import {setTheme} from "../../reducers/themeReducer";

const DrawerBottom = () => {
    const dispatch = useDispatch();
    return (
        <div className="w-full px-4">
            <div className="">
                <label className="swap swap-rotate btn btn-ghost">
                    <input type="checkbox" onClick={() => dispatch(setTheme())}/>
                    <div className="swap-on flex items-center gap-2">
                        <svg className=" fill-current w-10 h-10" viewBox="0 0 24 24">
                            <path
                                d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z"/>
                        </svg>
                        Светлая тема
                    </div>
                    <div className="swap-off flex items-center gap-2">
                        <svg className=" fill-current w-10 h-10" viewBox="0 0 24 24">
                            <path
                                d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z"/>
                        </svg>
                        Темная тема
                    </div>
                </label>
            </div>
            <div className="divider"></div>
            <div className="flex items-center gap-4 h-16">
                <div className="avatar">
                    <div className="w-10 rounded-full ring ring-neutral ring-offset-base-100 ring-offset-2">
                        <img alt={'iowathe3rd'} src="https://placeimg.com/192/192/people" />
                    </div>
                </div>
                <div className="flex flex-col h-full justify-evenly">
                    <span className="font-light">Бауржан Беглеров</span>
                    <span className="font-extralight text-sm">Student</span>
                </div>
            </div>
            <div className="btn btn-ghost btn-block justify-start px-4" onClick={() => dispatch(logout())}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                </svg>
                &nbsp;
                Выйти
            </div>
        </div>
    );
};

export default DrawerBottom;