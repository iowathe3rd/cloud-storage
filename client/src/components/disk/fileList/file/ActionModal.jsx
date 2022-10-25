import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {closeActionModal} from "../../../../reducers/actionModalReducer";
import {downloadFile, deleteFile} from "../../../../action/file";


const ActionModal = () => {
    const dispatch = useDispatch();

    const [userAgreeDelete, setUserAgreeDelete] = useState(false);
    const actionModalStat = useSelector(state => state.actionModal.modalDisplay)

    const file = useSelector(state => state.actionModal.file);

    function closeActionModalHandler() {
        setUserAgreeDelete(false)
        dispatch(closeActionModal())
    }
    function downloadClickHandler(e) {
        e.stopPropagation();
        downloadFile(file).then(r => console.log(r))
    }
    function deleteClickHandler(e) {
        e.stopPropagation()
        dispatch(deleteFile(file))
    }

    return (
        <div>
            <div className={`modal ${actionModalStat} actionModal`}>
                <div className="modal-box relative p-0">
                    <div className="card">
                        <label className="btn btn-sm btn-circle absolute right-2 top-2"
                               onClick={() => closeActionModalHandler()}>✕</label>
                        <div className="card-body items-center text-center">
                            <h2 className="card-title">{file?.type !== 'dir' ? `Выберите действия для ${file?.name}` : `Вы хотите удалить ${file?.name}?`}</h2>
                            <p>Удаление невозможно отменить.</p>
                            <div className="card-actions justify-end">

                                <div className="form-control">
                                    <label className="label cursor-pointer space-x-1.5">
                                        <input type="checkbox" className="checkbox checkbox-primary " checked={userAgreeDelete}
                                               onChange={() => setUserAgreeDelete(!userAgreeDelete)}/>
                                        <span className="label-text">Я хочу удалить файл.</span>
                                    </label>
                                </div>

                                <button className={`btn btn-error ${userAgreeDelete ? '' : 'hidden'}`}
                                        onClick={(e) => deleteClickHandler(e)}>Удалить
                                </button>
                                {file?.type !== 'dir' && <button className="btn btn-primary"
                                                                onClick={(e) => downloadClickHandler(e)}>Скачать</button>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ActionModal;