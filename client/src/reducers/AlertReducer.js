const ADD_ALERT = 'ADD_ALERT';
const CLOSE_ALERT = 'CLOSE_ALERT';
const CLOSE_ALL = 'CLOSE_ALL';


const defaultState = {
    alerts: [],
}

export default function alertReducer(state = defaultState, action) {
    switch (action.type) {
        case ADD_ALERT:
            return {...state, alerts: [...state.alerts, action.payload]}
        case CLOSE_ALERT:
            return {...state, alerts: [...state.alerts.filter(alert => alert.id !== action.payload)]}
        case CLOSE_ALL:
            return {...state, alerts: []}
        default:
            return state
    }
}

export const addAlert = (alert) => ({type: ADD_ALERT, payload: alert})
export const closeAlert = (id) => ({type: ADD_ALERT, payload: id})
export const closeAll = (alert) => ({type: ADD_ALERT, payload: alert})