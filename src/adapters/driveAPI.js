import download from 'downloadjs';
import API, { BASE_URL } from './API';
import { FILE_TYPES, LOCAL_STORAGE_KEYS, THROWABLE_STATUS_CODES } from '../constants';

const DRIVE_URL = BASE_URL + '/drive';
const FOLDER_URL = DRIVE_URL + '/folders';
const DOCUMENT_URL = DRIVE_URL + '/documents';

const getFolder = folder => {
  const route = folder.id ? (FOLDER_URL + `/${folder.id}`) : FOLDER_URL
  return API.ajax("GET", route);
}

const uploadFile = (file, progressCallback, completionCallback) => {
  const xhr = new XMLHttpRequest();
  xhr.open('POST', DOCUMENT_URL, true);
  xhr.setRequestHeader('Authorization', localStorage.token);
  xhr.responseType = 'json';
  xhr.upload.onprogress = event => computeUploadProgress(event, progressCallback);
  xhr.onload = () => completionCallback(xhr.response);
  xhr.send(file);
}

const computeUploadProgress = (event, callback) => {
  if (event.lengthComputable) {
    callback({loaded: event.loaded, total: event.total})
  }
}

const downloadFile = file => {
  const config = {
    headers: { 'Authorization': localStorage[LOCAL_STORAGE_KEYS.TOKEN] }
  }
  return fetch(DOCUMENT_URL + `/${file.id}`, config)
    .then(res => tryDownload(res, file));
}

const tryDownload = (response, file) => {
  if (THROWABLE_STATUS_CODES.includes(response.status)) {
    API.selectAndThrowServerError(response);
  } else {
    response.blob()
      .then(blob => download(blob, file.name, file.content_type))
  }
}

const deleteFile = file => {
  const routePrefix = file.type === "document" ? DOCUMENT_URL : FOLDER_URL;
  return API.ajax("DELETE", routePrefix + `/${file.id}`); 
}

const createFolder = (folderDetails, currentFolder) => {
  const payload = { folder: folderDetails, parent_folder_id: currentFolder.id }
  return API.ajax("POST", FOLDER_URL, payload);
}

const moveFile = (file, destinationFolder) => {
  const payload = { destination_folder_id: destinationFolder.id };
  if (file.type === FILE_TYPES.DOCUMENT) {
    return API.ajax('PATCH', DOCUMENT_URL + `/${file.id}`, payload);
  } else if (file.type === FILE_TYPES.FOLDER) {
    return API.ajax('PATCH', FOLDER_URL + `/${file.id}`, payload);
  } else {
    throw new Error("Unknown file type");
  }
   
}

const driveAPI = {
  getFolder,
  uploadFile,
  downloadFile,
  deleteFile,
  createFolder,
  moveFile
}

export default driveAPI;