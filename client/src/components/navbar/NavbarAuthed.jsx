import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getFiles, searchFiles} from "../../action/file";

const NavbarAuthed = () => {
    const dispatch = useDispatch();
    const [searchName, setSearchName] = useState('');
    const currentDir = useSelector(state=> state.file.currentDir)

    function searchHandler(e) {
        e.preventDefault()
        if(searchName.trim() !== ''){
            dispatch(searchFiles(searchName));
        }else{
            dispatch(getFiles(currentDir))
        }
    }


    return (
        <div className="navbar bg-base-200">
            <div className="navbar-start">
                <label htmlFor="my-drawer-2" className="btn btn-ghost drawer-button lg:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                         stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round"
                              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"/>
                    </svg>
                </label>
            </div>
            <div className="navbar-center">
            </div>
            <div className="navbar-end gap-4">
                <form onSubmit={e=>searchHandler(e)}>
                    <div className="form-control">
                        <div className="input-group">
                            <input type="text" placeholder="Название файла…" value={searchName} onChange={e => setSearchName(e.target.value)}
                                   className="input input-bordered max-w-xs"/>
                            <button type="submit" className="btn btn-square">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default NavbarAuthed;