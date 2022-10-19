import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getFiles, uploadFile} from "../../action/file";
import FileList from "./fileList/FileList";
import Popup from "./Popup";
import {setCurrentDir, setPopupDisplay} from "../../reducers/fileReducer";

const Disk = () => {
    const dispatch = useDispatch();
    const currentDir = useSelector(state => state.file.currentDir)
    const dirStack = useSelector(state => state.file.dirStack)
    const [dragEnter, setDragEnter] = useState(false)
    useEffect(() => {
        dispatch(getFiles(currentDir))
    }, [currentDir])

    function popupHandler() {
        dispatch(setPopupDisplay('modal-open'))
    }

    function backClickHandler() {
        const backDirId = dirStack.pop();
        dispatch(setCurrentDir(backDirId))
    }

    function fileUploadHandler(event) {
        const files = [...event.target.files]
        files.forEach(file => dispatch(uploadFile(file, currentDir)))
    }

    function dragEnterHandler(event){
        event.preventDefault();
        event.stopPropagation();
        setDragEnter(true)
    }

    function dragOverHandler(event){
        event.preventDefault();
        event.stopPropagation();
        setDragEnter(true)
    }

    function dropHandler(event) {
        event.preventDefault();
        event.stopPropagation();
        let files = [...event.dataTransfer.files]
        files.forEach(file => dispatch(uploadFile(file, currentDir)))
        console.log(files)

        setDragEnter(false)
    }

    return (
        <div className="p-4 mx-auto flex flex-col w-full gap-4" onDragEnter={dragEnterHandler}  onDragOver={dragOverHandler}>
            <div className="flex justify-between">
                <button className="btn btn-primary " onClick={() => backClickHandler()}>Назад</button>
                <button className="btn btn-primary " onClick={() => popupHandler()}>Создать папку</button>
                <div className="">
                    <label htmlFor="diskInput" className="btn btn-primary">Загрузить</label>
                    <input multiple={true} onChange={(event) => fileUploadHandler(event)} type="file" id="diskInput"
                           className="hidden"/>
                </div>
            </div>
            {
                dragEnter &&
                    <div
                        onDragEnter={dragEnterHandler}  onDragOver={dragOverHandler} onDrop={dropHandler}
                        className="bg-base-100 w-full h-60 outline-2 outline-dashed rounded-xl outline-offset-1 text-xl flex flex-col justify-center items-center">
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                                 stroke="currentColor" className="w-10 h-10">
                                <path strokeLinecap="round" strokeLinejoin="round"
                                      d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m6.75 12l-3-3m0 0l-3 3m3-3v6m-1.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"/>
                            </svg>
                        </div>
                        <span>Перебросьте файл <span className="text-blue-500">сюда!</span></span>
                    </div>
            }
            <FileList/>
            <Popup/>
        </div>
    );
};

export default Disk;