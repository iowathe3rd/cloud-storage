import React, {useEffect} from "react";
import "./index.css";
import Navbar from "./components/navbar/Navbar";
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import Registration from "./components/authorization/Registration";
import Login from "./components/authorization/Login";
import {useDispatch, useSelector} from "react-redux";
import {auth} from "./action/user";
import Disk from "./components/disk/Disk";
import DashBoard from "./pages/DashBoard";

function App() {
    const isAuth = useSelector((state) => state.user.isAuth);
    const theme = useSelector((state) => state.theme.theme)
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(auth());
    }, []);
    return (
        <BrowserRouter>
            <div className="App" data-theme={theme}>
                <Navbar/>
                <div>
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
                            <Route path="/" element={<DashBoard/>}/>
                            <Route
                                path="*"
                                element={<Navigate to="/" replace/>}
                            />
                        </Routes>
                    )}
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
