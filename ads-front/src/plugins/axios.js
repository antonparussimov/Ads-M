import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://5000',
  proxy: {
    host: '127.0.0.1',
    port: 8080,
  },
});

export default {
  install: (app) => {
    app.config.globalProperties.$axios = axiosInstance;
  }
};