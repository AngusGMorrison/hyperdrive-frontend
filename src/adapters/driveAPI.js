import API, { BASE_URL } from './API';

const DRIVE_URL = BASE_URL + '/drive'

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

const driveAPI = {
  uploadFile
}

export default driveAPI;