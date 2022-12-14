import axios from 'axios'
import {addFile, deleteFileAction, setFiles} from "../reducers/fileReducer";
import {addUploadFile, changeUploadFile, showUploader} from "../reducers/uploadReducer";
import {hideLoader, showLoader} from "../reducers/appReducer";
import {API_URL} from "../config"

export function getFiles(dirId, sort) {
    return async dispatch => {
        try {
            dispatch(showLoader())
            let url = `${API_URL}api/files`;
            if(dirId){
                url = `${API_URL}api/files?parent=${dirId}`;
            }else if(sort){
                url = `${API_URL}api/files?sort=${sort}`;
            }else if(dirId && sort){
                url = `${API_URL}api/files?parent=${dirId}&sort=${sort}`;
            }
            const response = await axios.get(url, {
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
            })
            dispatch(setFiles(response.data))
        } catch (e) {
            // toggleAlert({display: true, status: 'error', message: `Ошибка! ${e.response.data.message}`})
        }finally {
            dispatch(hideLoader())
        }
    }
}

export function createDir(dirId, name) {
    return async dispatch => {
        try {
            const response = await axios.post(`${API_URL}api/files`, {
                name,
                parent: dirId,
                type: 'dir'
            }, {
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
            })
            dispatch(addFile(response.data))
            // toggleAlert({display: true, status: 'success', message: `Создана папка ${name}`})
        } catch (e) {
            console.log(e)
            // toggleAlert({display: true, status: 'error', message: `Файл или папка уже существуют`})
        }
    }
}

export function uploadFile(file, dirId) {
    return async dispatch => {
        try {
            const formData = new FormData()
            formData.append('file', file)
            if (dirId) {
                formData.append('parent', dirId)
            }
            const uploadFile = {
                name: file.name,
                progress: 0,
                id: Date.now()
            }
            dispatch(showUploader())
            dispatch(addUploadFile(uploadFile))
            const response = await axios.post(`${API_URL}api/files/upload`, formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                },
                onUploadProgress: progressEvent => {
                    const totalLength = progressEvent.total;
                    console.log('total', totalLength)
                    if (totalLength) {
                         uploadFile.progress = Math.round((progressEvent.loaded * 100) / totalLength)
                        dispatch(changeUploadFile(uploadFile))
                    }
                }
            });
            dispatch(addFile(response.data))
            // toggleAlert({display: true, status: 'success', message: 'Файл загружен'})
        } catch (e) {
            console.log(e)
            // toggleAlert({display: true, status: 'error', message: `Ошибка! ${e.response.data.message}`})
        }
    }
}

export async function downloadFile(file){
    const response = await fetch(`${API_URL}api/files/download?id=${file._id}`,{
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    } )
    if(response.status === 200){
        const blob = await response.blob();
        let downloadUrl;
        downloadUrl = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.download = file.name;
        document.body.appendChild(link);
        link.click();
        link.remove();
    }
}

export function deleteFile(file) {
    return async dispatch => {
        try {
            await axios.delete(`${API_URL}api/files/?id=${file._id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            await dispatch(deleteFileAction(file._id))
            // toggleAlert({display: true, status: 'success', message: `Удалене папка ${file.name}`})
        } catch (e) {
            console.log(e)
            // toggleAlert({display: true, status: 'error', message: `Ошибка! ${e}`})
        }
    }
}
export function searchFiles(search) {
    return async dispatch => {
        try {
            const response = await axios.get(`${API_URL}api/files/search?search=${search}`,{
                headers:{
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            dispatch(setFiles(response.data))
            dispatch(hideLoader())
        } catch (e) {
            console.log(e)
        }
    }
}