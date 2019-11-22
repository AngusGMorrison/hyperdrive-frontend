import API, { BASE_URL } from './API';

const DRIVE_URL = BASE_URL + '/drive'

const uploadFile = file => {
  const xhr = new XMLHttpRequest();
  xhr.open('POST', DRIVE_URL, true);
  xhr.setRequestHeader('Authorization', localStorage.token);
  xhr.responseType = 'json';
  xhr.upload.onprogress = computeUploadProgress;
  xhr.onload = () => {
    console.log(xhr.response);
  }
  xhr.send(file);
}

const computeUploadProgress = event => {
  if (event.lengthComputable) {
    console.log(event.loaded + '/' + event.total);
  }
}

const driveAPI = {
  uploadFile
}

export default driveAPI;