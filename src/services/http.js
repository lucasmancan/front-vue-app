import axios from 'axios';


const client = axios.create({
  baseURL: 'http://localhost:3000/',
  timeout: 8000,
  headers: {'Authorization':localStorage.getItem('user-token'), 'Content-type': 'application/json', 'Accept': 'application/json'}
});

client.interceptors.response.use((response) => {
    return response.data;
  },(error) => {
    // if (error.response.status === 401) {     
    //   const requestConfig = error.config;
    //   return axios(requestConfig);
    // }
    return error.response;
  });

  client.interceptors.request.use((request) => {
    console.log(localStorage.getItem('user-token'));
    request.headers.Authorization = localStorage.getItem('user-token');
    return request;
  });
 
export default client; 