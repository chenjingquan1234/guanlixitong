import Vue from 'vue'
import axios from 'axios'

var yuming = "https://api.hfbsoftware.com";

var HttpGet = (url, data, other)=>{
  data.token = sessionStorage.token;
  return new Promise((resolve, reject)=>{
    axios.get(yuming + url, data, {withCredentials: true})
    .then((success)=>{
      resolve(success)
    })
    .catch((error)=>{
      reject(error)
    })
  })
}

var HttpPost = (url, data, other)=>{
  data.token = sessionStorage.token;
  return new Promise((resolve, reject)=>{
    axios.post(yuming + url, data, {withCredentials: true})
    .then((success)=>{
      resolve(success)
    })
    .catch((error)=>{
      reject(error)
    })
  })
}

export default {
	yuming,
  HttpGet,
  HttpPost
}
