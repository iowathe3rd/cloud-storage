import React, {useEffect} from 'react';
import {useSelector} from "react-redux";
import Alert from "./alert/Alert";
const Toast = () => {
    const alerts = useSelector(state => state.alert.alerts)
    useEffect(()=>{
    },[alerts])

    return (
        <div className="toast toast-top toast-end max-w-md  items-end">
            {alerts.map(alert=> <Alert alert={alert} key={alert.id}/>)}
        </div>
    );
};

export default Toast;