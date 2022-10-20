import React, {useEffect} from 'react';
import {useSelector} from "react-redux";
import File from "./file/File";


const FileList = () => {
    const files = useSelector(state => state.file.files)
    useEffect(()=>{
        console.log("File list changed")
    },[files])
    return (
        <div className=''>
            <div className="fileList">
                <div className="fileList_header">
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="table-compact lg:table-normal table w-full ">
                    <thead>
                        <tr>
                            <th>
                                <label>
                                    <input type="checkbox" className="checkbox" />
                                </label>
                            </th>
                            <th>Имя</th>
                            <th>Дата</th>
                            <th>Размер</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {files.map(file => <File key={file._id} file={file}/>)}
                    </tbody>
                    <tfoot>
                    <tr>
                        <th></th>
                        <th>Имя</th>
                        <th>Дата</th>
                        <th>Размер</th>
                        <th></th>
                    </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    );
};

export default FileList;