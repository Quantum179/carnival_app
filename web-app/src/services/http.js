import axios from 'axios'

const $http = axios.create({
  baseURL: 'http://localhost:5000/api/v1',
  timeout: 5000,
  headers: {
    'Accept-Version': 1,
    Accept: 'application/json',
    'Content-Type': 'application/json; charset=utf-8',
  },
});

export default $http
