import axios from "axios";

import { BASE_URL } from "../constants";
import { getAuthCookie, isAuthCookieSet, removeAuthCookie } from "./auth";
import { message } from "antd";


const baseURL = BASE_URL;

// const token = window.localStorage.getItem("token") || "";
// axios.defaults.timeout = 180000;

const clientApi = axios.create({
  baseURL: baseURL,
  headers: {
    // Authorization: "Bearer " + token,
    "Content-Type": "application/json; charset=utf-8",
    // "Access-Control-Allow-Origin": "*",
  },
  // proxy: {
  //   host: "95.216.32.38",
  // },
});

clientApi.interceptors.request.use(async function (config) {
  // Do something before request is sent
  // const headerToken = config.headers['Authorization']
  // if (!headerToken) {
  //   const token = await fetch('/api/session').then(res => res.json()).then(res => res.token)
  //   if (token) {
  //     config.headers['Authorization'] = `Bearer ${token}`;
  //   }
  // }



  if (isAuthCookieSet()) {
    const token = getAuthCookie()
    config.headers['Authorization'] = `Token ${token}`;
  }
  // if (isCsrfCookieSet()) {
  //   const csrfToken = getCsrfCookie()
  //   config.headers['X-CSRFToken'] = csrfToken;
  // }

  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

// Add a response interceptor
clientApi.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  return response;
}, async function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error

  const code = parseInt(error.response && error.response.status)





  if (code === 401) {
    // if (typeof window !== 'undefined') {
    //   await logoutUser()
    // }

    clientApi.defaults.headers.common['Authorization'] = ``;
    clientApi.defaults.headers.delete['Authorization'] = ``;
    const authCookie = getAuthCookie()
    if (authCookie) {
      message.error('Session expired. Please login again.')
      removeAuthCookie()
    }


    // } 
    // else if (error?.code && error?.code === 'ERR_NETWORK') {
    //   // ERR_NETWORK
    //   // window.location.replace('/network')

    //   message.error('No Network Connection Please check your network settings and try again. ',)


    //   clientApi.defaults.headers.common['Authorization'] = ``;
    //   clientApi.defaults.headers.delete['Authorization'] = ``;
    //   const authCookie = getAuthCookie()
    //   if (authCookie) {
    //     removeAuthCookie()
    //   }



  } else {
    //
  }





  return Promise.reject(error);
});

export default clientApi;

