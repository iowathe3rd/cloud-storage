import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getFiles, uploadFile} from "../../action/file";
import FileList from "./fileList/FileList";
import Popup from "./Popup";
import {setCurrentDir, setPopupDisplay} from "../../reducers/fileReducer";
import ActionModal from "./fileList/file/ActionModal";
import ErrorModal from "../../utils/ErrorModal";
import Uploader from "./uploader/Uploader";

const Disk = () => {
    const dispatch = useDispatch();
    const currentDir = useSelector(state => state.file.currentDir)
    const dirStack = useSelector(state => state.file.dirStack)
    const [dragEnter, setDragEnter] = useState(false)
    const [sort, setSort] = useState('Сортировка')
    useEffect(() => {
        dispatch(getFiles(currentDir, sort))
    }, [currentDir, sort])

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

    function dragEnterHandler(event) {
        event.preventDefault();
        event.stopPropagation();
        setDragEnter(true)
    }

    function dragOverHandler(event) {
        event.preventDefault();
        event.stopPropagation();
        setDragEnter(true)
    }

    function dropHandler(event) {
        event.preventDefault();
        event.stopPropagation();
        let files = [...event.dataTransfer.files]
        files.forEach(file => dispatch(uploadFile(file, currentDir)))
        setDragEnter(false)
    }

    return (
        <div className="p-4 mx-auto flex flex-col w-full gap-4" onDragEnter={dragEnterHandler}
             onDragOver={dragOverHandler}>

            <input multiple={true} onChange={(event) => fileUploadHandler(event)} type="file" id="diskInput"
                       className="hidden"/>

            <div className="navbar p-0 ">
                <div className="navbar-start gap-2 ">
                    <button className="btn btn-primary rounded-xl" onClick={() => backClickHandler()}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                             stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                  d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"/>
                        </svg>
                    </button>
                    <div className="dropdown dropdown-right ">
                        <label tabIndex={20} className="btn btn-primary rounded-xl">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                                 stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round"
                                      d="M12 10.5v6m3-3H9m4.06-7.19l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z"/>
                            </svg>
                        </label>
                        <ul tabIndex={20} className="dropdown-content menu p-2 shadow bg-base-200 rounded-box w-52">
                            <li><button onClick={() => popupHandler()}>Создать папку</button></li>
                            <li><label htmlFor="diskInput">Загрузить</label></li>
                        </ul>
                    </div>
                </div>
                <div className="navbar-end">
                    <select className="select w-full max-w-xs select-md select-bordered" value={sort}
                            onChange={(e) => setSort(e.target.value)}>
                        <option disabled>Сортировка</option>
                        <option value="type">По типу</option>
                        <option value="size">По размеру</option>
                        <option value="date">По дате</option>
                        <option value="name">По имени</option>
                    </select>
                </div>

            </div>
            {
                dragEnter &&
                <div
                    onDragEnter={dragEnterHandler} onDragOver={dragOverHandler} onDrop={dropHandler}
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
            <ActionModal/>
            <ErrorModal/>
            <Uploader/>
        </div>
    );
};

export default Disk;