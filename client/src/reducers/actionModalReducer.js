const SET_ACTION_MODAL_DISPLAY = "SET_ACTION_MODAL_DISPLAY";
const CLOSE_ACTION_MODAL = "CLOSE_ACTION_MODAL";
const SET_FILE = "SET_FILE";



const defaultState = {
    modalDisplay: '',
    file: {},
    userAgree: false
}

export default function actionModalReducer(state = defaultState, action) {
    switch (action.type) {
        case SET_ACTION_MODAL_DISPLAY: return {...state, modalDisplay: action.payload}
        case CLOSE_ACTION_MODAL: return {...state, modalDisplay: action.payload, fileName: action.payload, fileType: action.payload, fileId: action.payload}
        case SET_FILE: return {...state, file: action.payload, userAgree: action.payload.userAgree}
        default:
            return state
    }
}

export const setActionModalDisplay = (display) => ({type: SET_ACTION_MODAL_DISPLAY, payload: display})
export const setFile = (file) => ({type: SET_FILE, payload: file})
export const closeActionModal = () => ({type: CLOSE_ACTION_MODAL, payload: ''})