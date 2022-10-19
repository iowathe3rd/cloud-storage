const CHANGE_THEME = "CHANGE_THEME"

const defaultState = {
    theme: 'dark'
}

export default function themeReducer(state = defaultState, action) {
    switch (action.type) {
        case CHANGE_THEME: return {...state, theme: action.payload}
        default:
            return state
    }
}

export const setTheme = (theme) => ({type: CHANGE_THEME, payload: theme})