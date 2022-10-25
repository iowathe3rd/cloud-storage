import React from 'react';
import {useDispatch} from "react-redux";
import {setTheme} from "../../reducers/themeReducer";
import {setPopupDisplay} from "../../reducers/fileReducer";

const NavbarAuthed = () => {
    const dispatch = useDispatch();

    return (
        <div className="navbar rounded-xl bg-base-200">
            <div className="navbar-start">
                <label htmlFor="my-drawer-2" className="btn btn-ghost drawer-button lg:hidden"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
                </label>
            </div>
            <div className="navbar-center">
            </div>
            <div className="navbar-end gap-4">
                <div className="form-control">
                    <div className="input-group max-w-xs">
                        <input type="text" placeholder="Search…" className="input input-bordered max-w-xs"/>
                        <button className="btn btn-square">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
                                 stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                            </svg>
                        </button>
                    </div>
                </div>
                <div className="flex-none">
                </div>
            </div>
        </div>
    );
};

export default NavbarAuthed;