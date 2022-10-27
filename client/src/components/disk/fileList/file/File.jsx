import React from 'react';
import getIcon, {DocumentIcon, FileIcon} from "../../../../assets/Icons";
import {useDispatch, useSelector} from "react-redux";
import {pushToStack, setCurrentDir} from "../../../../reducers/fileReducer";
import {setActionModalDisplay, setFile} from "../../../../reducers/actionModalReducer";
import sizeFormat from "../../../../utils/sizeFormat";

const File = ({file}) => {
    const dispatch = useDispatch()
    const currentDir = useSelector(state => state.file.currentDir);

    function openDirHandler(event) {
        if (file.type === 'dir') {
            dispatch(pushToStack(currentDir))
            dispatch(setCurrentDir(file._id))
            event.stopPropagation()
        }
    }

    function actionModalHandler(event) {
        dispatch(setActionModalDisplay('modal-open'));
        dispatch(setFile(file));
        event.stopPropagation();
    }

    const fileView = useSelector(state => state.file.view)

    if (fileView === 'table') {
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
                <td>{sizeFormat(file.size)}</td>
                <td className="">
                    <button className="btn btn-outline btn-xs" onClick={() => actionModalHandler()}>...</button>
                </td>
            </tr>
        );
    } else if (fileView === 'plate') {
        return (
            <div className="card w-full bg-base-200 h-56" onClick={openDirHandler}>
                <button className="btn btn-ghost btn-circle btn-sm top-2 right-2 absolute " onClick={(event) => actionModalHandler(event)}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                         stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round"
                              d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"/>
                    </svg>
                </button>
                <div className="card-body p-4 text-center overflow-hidden items-center flex flex-col justify-between">
                    <div className="w-32 h-32">{getIcon(file.type, 20)}</div>
                    <span className="truncate w-full">{file.name}</span>
                </div>
            </div>
        )
    }
};

export default File;