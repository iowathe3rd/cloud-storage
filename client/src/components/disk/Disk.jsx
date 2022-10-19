import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {createDir, getFiles} from "../../action/file";
import FileList from "./fileList/FileList";
import Popup from "./Popup";
import {setCurrentDir, setPopupDisplay} from "../../reducers/fileReducer";
import BreadCrumbs from "../../utils/BreadCrumbs";

const Disk = () => {
    const dispatch = useDispatch();
    const currentDir = useSelector(state => state.file.currentDir)
    const dirStack = useSelector(state => state.file.dirStack )
    useEffect(()=>{
        dispatch(getFiles(currentDir))
    }, [currentDir])

    function popupHandler() {
        dispatch(setPopupDisplay('modal-open'))
    }

    function backClickHandler() {
        const backDirId = dirStack.pop();
        dispatch(setCurrentDir(backDirId))
    }

    return (
        <div className="p-4 mx-auto flex flex-col gap-4">
            <div className="flex justify-between">
                <button className="btn btn-primary" onClick={()=> backClickHandler()}>Назад</button>
                <button className="btn btn-primary" onClick={() => popupHandler()}>Создать папку</button>
            </div>
            <Popup/>
            <FileList/>
        </div>
    );
};

export default Disk;