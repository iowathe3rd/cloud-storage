import {addAlert} from "../../reducers/AlertReducer";
import {store} from "../../reducers";

export const appendAlert = (alertData) =>{
    const alerts = (store.getState().alert.alerts)
    const alertAppend = {
        ...alertData,
        id: alerts.length
    }
    store.dispatch(addAlert(alertAppend))
}

