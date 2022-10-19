import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getFiles} from "../../action/file";
import FileList from "./fileList/FileList";

const Disk = () => {
    const dispatch = useDispatch();
    const currentDir = useSelector(state => state.file.currentDir)
    useEffect(()=>{
        dispatch(getFiles(currentDir))
    }, [currentDir])
    return (
        <div className="">
            <FileList/>
        </div>
    );
};

export default Disk;