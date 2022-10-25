import React from 'react';
import UploadFile from "./UploadFile";
import {useDispatch, useSelector} from "react-redux";
import {hideUploader} from "../../../reducers/uploadReducer";

const Uploader = () => {
    const files = useSelector(state=> state.upload.files)
    const isVisible = useSelector(state => state.upload.isVisible)
    const dispatch = useDispatch();

    return ( isVisible &&
        <div className="card w-96 bg-base-300 shadow-xl fixed bottom-4 max-h-72 min-h-56 right-4">
            <div className="card-body p-3 overflow-y-auto">
                <div className="card-title justify-between">
                    <span>Загрузки</span>
                    <button className="btn btn-sm btn-circle" onClick={()=> dispatch(hideUploader())}>✕</button>
                </div>
                <div className="flex flex-col gap-4 overflow-y-scroll">
                    {files.map(file => <UploadFile key={file.id} file={file}/>)}
                </div>
            </div>
        </div>
    );
};

export default Uploader;