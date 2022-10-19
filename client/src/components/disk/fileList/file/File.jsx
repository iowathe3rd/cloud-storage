import React from 'react';
import {DocumentIcon, FileIcon} from "../../../../assets/Icons";
import {useDispatch, useSelector} from "react-redux";
import {pushToStack, setCurrentDir} from "../../../../reducers/fileReducer";

const File = ({file}) => {
    const currentDir = useSelector(state => state.file.currentDir)
    const dispatch = useDispatch()

    function openDirHandler() {
        if (file.type === 'dir') {
            dispatch(pushToStack(currentDir))
            dispatch(setCurrentDir(file._id))
        }
    }

    return (
        <tr
            onClick={openDirHandler}
            className="hover:active hover:cursor-pointer"
        >
            <th className="flex gap-4">{file.type === "dir" ? <DocumentIcon/> : <FileIcon/>}{file.name}</th>
            <td>{file.date.slice(0, 10)}</td>
            <td>{file.size}</td>
        </tr>
    );
};

export default File;