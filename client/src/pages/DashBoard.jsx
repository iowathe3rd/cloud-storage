import React from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import Disk from "../components/disk/Disk";
import DrawerSide from "../components/DrawerSide/DrawerSide";
import NavbarAuthed from "../components/navbar/NavbarAuthed";
import Popup from "../components/disk/Popup";
import ActionModal from "../components/disk/fileList/file/ActionModal";
import ErrorModal from "../utils/ErrorModal";


const DashBoard = () => {
    return (
        <>
            <div className="drawer drawer-mobile">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle"/>
                <div className="drawer-content flex flex-col ">
                    <NavbarAuthed/>
                    <Routes>
                        <Route path="/" element={<Disk/>}/>
                        <Route
                            path="*"
                            element={<Navigate to="/" replace/>}
                        />
                    </Routes>
                    <Popup/>
                    <ActionModal/>
                    <ErrorModal/>
                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                    <DrawerSide/>
                </div>
            </div>
        </>
    );
};

export default DashBoard;