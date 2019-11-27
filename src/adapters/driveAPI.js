import download from 'downloadjs';
import API, { BASE_URL } from './API';
import { LOCAL_STORAGE_KEYS, THROWABLE_STATUS_CODES } from '../constants';

const DRIVE_URL = BASE_URL + '/drive';

const getFilesInFolder = () => {
  return API.ajax("GET", DRIVE_URL);
}

const uploadFile = (file, progressCallback, completionCallback) => {
  const xhr = new XMLHttpRequest();
  xhr.open('POST', DRIVE_URL, true);
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
  return fetch(DRIVE_URL + `/${file.id}`, config)
    .then(res => tryDownload(res, file));
}

const tryDownload = (response, file) => {
  if (THROWABLE_STATUS_CODES.includes(response.status)) {
    API.selectAndThrowServerError(response);
  } else {
    response.blob()
      .then(blob => download(blob, file.filename, file.content_type))
  }
}

const deleteFile = file => {
  return API.ajax("DELETE", DRIVE_URL + `/${file.id}`);
}

const driveAPI = {
  getFilesInFolder,
  uploadFile,
  downloadFile,
  deleteFile
}

export default driveAPI;