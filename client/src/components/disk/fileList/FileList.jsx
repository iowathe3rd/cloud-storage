import React, {useEffect} from 'react';
import {useSelector} from "react-redux";
import File from "./file/File";
import {CSSTransition, TransitionGroup} from "react-transition-group";


const FileList = () => {
    const files = useSelector(state => state.file.files)

    return (files.length
            ?
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
                                    <input type="checkbox" className="checkbox"/>
                                </label>
                            </th>
                            <th>Имя</th>
                            <th>Дата</th>
                            <th>Размер</th>
                            <th></th>
                        </tr>
                        </thead>
                        <TransitionGroup component="tbody">
                        {
                            files.map(file =>
                                <CSSTransition
                                    key={file._id}
                                    timeout={500}
                                    classNames={'file'}
                                    exit={false}
                                >
                                    <File file={file}/>
                                </CSSTransition>
                            )
                        }
                        </TransitionGroup>
                    </table>
                </div>
            </div>
            :
            <div>
                 На данный момент у вас нет файлов
            </div>
    );
};

export default FileList;