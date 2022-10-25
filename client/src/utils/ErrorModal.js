import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {showErrorModal} from "../reducers/fileReducer";

const ErrorModal = () => {
    const dispatch = useDispatch();
    const err = useSelector(state => state.file.error)
    const modalStatus = useSelector(state => state.file.errorModal)

    function closeErrorHandler() {
        dispatch(showErrorModal(''))
    }

    return (
        <div>
            <div className={`modal ${modalStatus}`}>
                <div className="modal-box relative">
                        <label htmlFor="my-modal-3" className="btn btn-sm btn-circle absolute right-2 top-2" onClick={closeErrorHandler}>✕</label>
                    <h3 className="text-lg font-bold">{err}</h3>
                    <p className="py-4">You've been selected for a chance to get one year of subscription to use Wikipedia for free!</p>
                </div>
            </div>
        </div>
    );
};

export default ErrorModal;