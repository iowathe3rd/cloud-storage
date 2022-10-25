import React from 'react';
import {useDispatch} from "react-redux";
import {removeUploadFile} from "../../../reducers/uploadReducer";

const UploadFile = ({file}) => {
    const dispatch = useDispatch();
    return (
        <div className="rounded-xl bg-base-100 px-4 py-2">
            <div className="flex justify-between">
                <span>{file.name}</span>
                <button className="btn btn-sm btn-circle btn-ghost btn-sm" onClick={()=>dispatch(removeUploadFile(file.id))}>✕</button>
            </div>
                <progress className="progress progress-primary w-56 bg-neutral " value={file.progress} max="100"></progress>
        </div>
    );
};

export default UploadFile;