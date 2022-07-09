const CHANGE_PRIVILEGE = 'CHANGE_PRIVILEGE';
const CHANGE_CATEGORY = 'CHANGE_CATEGORY';
const CHANGE_SHOWN_COLUMNS = 'CHANGE_SHOWN_COLUMNS';
const CHANGE_DATA_SOURCE = 'CHANGE_DATA_SOURCE';

const initialState = {
    privilege: false,
    columns: [],
    datasource: [],
    category: '',
};

export const mainReducer = (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_PRIVILEGE:
            return {...state, privilege: action.payload}
        case CHANGE_CATEGORY:
            return {...state, category: action.payload}
        case CHANGE_SHOWN_COLUMNS:
            return {...state, columns: action.payload}
        case CHANGE_DATA_SOURCE:
            return {...state, datasource: action.payload}
        default:
            return state
    }
}