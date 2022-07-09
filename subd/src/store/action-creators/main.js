import axios from "axios";
const DATA_lIMIT = 10;

export const fetchData = (key) => {
    return async (dispatch) => {
        try {
            const response = await axios.get(`http://localhost:5000/api/${key}/`);
            console.log(response.data);
            dispatch(changeShownColumns(response.data.columns));
            dispatch(changeDatasource(response.data.dataSource));

        } catch (e) {
            console.log('Не прошел запрос');
        }
    }
}

export const createData = (rs, key) => {
    return async (dispatch) => {
        try {
            const statusCode = await axios.post(`http://localhost:5000/api/${key}/`, {
                ...rs
            });
            console.info(statusCode);
            dispatch(fetchData(key));
        } catch (e) {
            console.log('Не смог создать данные')
        }
    }
}

export const updateData = (rs, key) => {
    return async (dispatch) => {
        try {
            const statusCode = await axios.put(`http://localhost:5000/api/${key}/`, {
                ...rs
            });
            console.info(statusCode);
            dispatch(fetchData(key));
        } catch (e) {
            console.log('Не смог обновить данные')
        }
    }
}

export const deleteRecordById = (keyName, rs) => {
    return async (dispatch) => {
        try {
            const {key: _, ...data} = rs;
            const statusCode = await axios.delete(`http://localhost:5000/api/${keyName}/`, {
                data
            });
            console.info(statusCode);
            dispatch(fetchData(keyName));
        } catch (e) {
            console.log('Не прошла операция удаления');
        }
    }
}

export function changePrivilege(newPrivilege) {
    return {type: 'CHANGE_PRIVILEGE', payload: newPrivilege};
}

export function changeCategory(newCategory) {
    return {type: 'CHANGE_CATEGORY', payload: newCategory};
}

export function changeShownColumns(newColumns) {
    return {type: 'CHANGE_SHOWN_COLUMNS', payload: newColumns};
}

export function changeDatasource(newDatasource) {
    return {type: 'CHANGE_DATA_SOURCE', payload: newDatasource};
}

