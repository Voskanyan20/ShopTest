import axios from "axios";
const BASE_URL = 'http://localhost:8080/';

const instance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

export default instance;