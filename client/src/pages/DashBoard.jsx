import React from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import Registration from "../components/authorization/Registration";
import Login from "../components/authorization/Login";
import Disk from "../components/disk/Disk";
import {useSelector} from "react-redux";

const DashBoard = () => {
    const isAuth = useSelector((state) => state.user.isAuth);
    return (
        <div>
            <div className="drawer drawer-mobile">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col ">
                    {!isAuth ? (
                        <Routes>
                            <Route path="/registration" element={<Registration/>}/>
                            <Route path="/login" element={<Login/>}/>
                            <Route
                                path="*"
                                element={<Navigate to="/login" replace/>}
                            />
                        </Routes>
                    ) : (
                        <Routes>
                            <Route path="/" element={<Disk/>}/>
                            <Route
                                path="*"
                                element={<Navigate to="/" replace/>}
                            />
                        </Routes>
                    )}
                    {/*<label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>*/}

                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                    <ul className="menu p-4 overflow-y-auto w-72 bg-base-200 text-base-content">
                        {/*//Sidebar content here */}
                        <li><a>Sidebar Item 1</a></li>
                        <li><a>Sidebar Item 2</a></li>
                    </ul>

                </div>
            </div>
        </div>
    );
};

export default DashBoard;