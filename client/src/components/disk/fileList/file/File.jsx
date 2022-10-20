import React from 'react';
import {DocumentIcon, FileIcon} from "../../../../assets/Icons";
import {useDispatch, useSelector} from "react-redux";
import {pushToStack, setCurrentDir} from "../../../../reducers/fileReducer";
import {setActionModalDisplay, setFile} from "../../../../reducers/actionModalReducer";

const File = ({file}) => {
    const currentDir = useSelector(state => state.file.currentDir);
    const dispatch = useDispatch()

    function openDirHandler(event) {
        if (file.type === 'dir') {
            dispatch(pushToStack(currentDir))
            dispatch(setCurrentDir(file._id))
            event.stopPropagation()
        }
    }

    function actionModalHandler() {
        dispatch(setActionModalDisplay('modal-open'))
        dispatch(setFile(file))
    }

    return (
        <tr

            className="hover:active"
        >
            <th>
                <label>
                    <input type="checkbox" className="checkbox"/>
                </label>
            </th>
            <td onClick={openDirHandler}>
                <div className="flex gap-4">
                    <button className="flex ">
                        {file.type === "dir" ? <DocumentIcon/> : <FileIcon/>} {file.name}
                    </button>
                </div>
            </td>
            <td>{file.date.slice(0, 10)}</td>
            <td>{file.size}</td>
            <td className="">
                <button className="btn btn-outline btn-xs" onClick={()=>actionModalHandler()}>...</button>
            </td>
        </tr>
    );
};

export default File;