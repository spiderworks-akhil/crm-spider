import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import axios from 'axios';
import {BrowserRouter} from "react-router-dom";
import { AuthContextProvider} from './Components/Auth/Auth'

axios.defaults.baseURL = 'https://works.spiderworks.co.in/crm-admin/api/';


axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
axios.interceptors.response.use(function (response) {
    // Do something with response data

    if(response.data.error){
        if(response.data.error === 1001){
            localStorage.clear();
            window.location.replace(process.env.PUBLIC_URL);
        }
    }

    console.log("Response : ",response.data.error)
    return response;
}, function (error) {
    // Do something with response error
    return Promise.reject(error);
});

ReactDOM.render(
    <BrowserRouter>
        <React.StrictMode>
           <AuthContextProvider>
              <App />
           </AuthContextProvider>
        </React.StrictMode>
    </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

reportWebVitals();