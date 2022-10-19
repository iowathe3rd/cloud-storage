import React from 'react';
import {useSelector} from "react-redux";
import File from "./file/File";


const FileList = () => {
    const files = useSelector(state => state.file.files)

    return (
        <div className='container'>
            <div className="fileList">
                <div className="fileList_header">
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="table w-full table-fixed	">
                    <thead>
                    <tr>
                        <th>Название</th>
                        <th>Дата</th>
                        <th>Размер</th>
                    </tr>
                    </thead>
                    <tbody>
                        {files.map(file => <File key={file._id} file={file}/>)}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default FileList;