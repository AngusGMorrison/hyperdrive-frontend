import API, { BASE_URL } from './API';

const DRIVE_URL = BASE_URL + '/drive'

const uploadFile = file => {
  const xhr = new XMLHttpRequest();
  xhr.open('POST', DRIVE_URL, true);
  xhr.setRequestHeader('Authorization', localStorage.token);
  xhr.responseType = 'json';
  xhr.onload = () => {
    this.response.json()
      .then(console.log);
  }
  xhr.send(file);
}