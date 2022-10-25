const CHANGE_THEME = "CHANGE_THEME"

const defaultState = {
    theme: 'dark'
}

export default function themeReducer(state = defaultState, action) {
    switch (action.type) {
        case CHANGE_THEME: return {...state, theme: (state.theme === 'light' ? 'dark' : 'light')}
        default:
            return state
    }
}

export const setTheme = () => ({type: CHANGE_THEME})
