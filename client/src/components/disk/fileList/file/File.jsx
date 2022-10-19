import React, {useEffect, useState} from 'react';
import {DocumentIcon, FileIcon} from "../../../../assets/Icons";
import {useDispatch, useSelector} from "react-redux";
import {pushToStack, setCurrentDir, setFileName} from "../../../../reducers/fileReducer";

const File = ({file}) => {
    const [isShown, setIsShown] = useState(false);
    const currentDir = useSelector(state => state.file.currentDir)
    const dispatch = useDispatch()

    function openDirHandler() {
        dispatch(pushToStack(currentDir))
        dispatch(setCurrentDir(file._id))
        dispatch(setFileName(file.name))
    }
    const fileName = useSelector(state => state.file.fileName)
    return (
        <tr
            onClick={file.type === 'dir' ? () => openDirHandler() : ''}
            className="hover:active hover:cursor-pointer"
        >
            <th className="flex gap-4" >{file.type === "dir" ? <DocumentIcon/> : <FileIcon/>}{file.name}</th>
            <td>{file.date.slice(0, 10)}</td>
            <td>{file.size}</td>
        </tr>
    );
};

export default File;