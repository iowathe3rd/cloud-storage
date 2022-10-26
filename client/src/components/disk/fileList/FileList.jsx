import React from 'react';
import {useSelector} from "react-redux";
import File from "./file/File";
import {CSSTransition, TransitionGroup} from "react-transition-group";


const FileList = () => {
    const files = useSelector(state => state.file.files)
    const fileView = useSelector(state => state.file.view)

    if (files.length === 0) {
        return (
            <div className="mockup-window  bg-base-300">
                <div className="flex justify-center px-4 py-16 bg-base-200">Файлы не найдены(</div>
            </div>
        )
    }
    if (fileView === 'table') {
        return (
            <div className=''>
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
        )

    }
    if (fileView === 'plate') {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 auto-rows-max gap-4 justify-items-center items-start justify-center content-center	">
                {
                    files.map((file, index )=> (<File file={file} key={index}/>))
                }
            </div>
        )
    }
};

export default FileList;