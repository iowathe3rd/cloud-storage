import React, {useState} from 'react';
import Input from "../../utils/input/Input";
import {useDispatch, useSelector} from "react-redux";
import {setPopupDisplay} from "../../reducers/fileReducer";
import {createDir} from "../../action/file";

const Popup = () => {
    const initDirState = '';
    const [dirName, setDirname] = useState('');
    const popupDisplay = useSelector(state => state.file.popupDisplay)
    const currentDir = useSelector(state => state.file.currentDir)
    const dispatch = useDispatch()

    const clearState = () =>{
        setDirname(initDirState)
    }

    function createHandler() {
        dispatch(createDir(currentDir, dirName))
        clearState();
        dispatch(setPopupDisplay(''))
    }

    return (
        <div className={`modal ${popupDisplay}`}>
            <div className="modal-box p-0">
                <div className="card bg-base-200">
                    <div className="card-body items-center text-center gap-3">
                        <h2 className="card-title">Введите имя папки</h2>
                        <p>Для отмены нажмите отмена</p>
                        <Input type="text" placeholder="Имя папки"
                               onChange={(e) => setDirname(e.target.value)} value={dirName}/>
                        <div className="card-actions gap-10 justify-end">
                            <label className="btn btn-error modal-button" onClick={()=> dispatch(setPopupDisplay(''))}>Отмена</label>
                            <button className="btn btn-primary" onClick={()=>createHandler()}>Создать</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Popup;