import axios from 'axios';
import { AsyncStorage } from 'react-native'
import Constants from "expo-constants";


/**
 * Request Wrapper with default success/error actions
 */

const Request = async function (options, isHeader = true) {

  let authHeader = null;
  if (isHeader) {
    authHeader = await AsyncStorage.getItem("Auth"); /// Add header
  }

  const client = axios.create({
    baseURL: `http://${Constants.manifest.debuggerHost.split(':').shift()}:3000/api`,
    headers: { 'Authorization': 'Bearer ' + authHeader }

  });

  const onSuccess = function (response) {

    console.debug('Request Successful!', `${response.config.method} ${response.config.baseURL} DONE!`);
    return response.data;
  }

  const onError = function (error) {
    //console.debug('Request Failed:', error.config);

    if (error.response) {
      // Request was made but server responded with something
      // other than 2xx
      // console.debug('Status:', error.response.status);
      // console.debug('Data:', error.response.data);
      // console.debug('Headers:', error.response.headers);

    } else {
      // Something else happened while setting up the request
      // triggered the error
      // console.debug('Error Message:', error.message);
    }

    return Promise.reject(error.response || error.message);
  }


  return client(options)
    .then(onSuccess)
    .catch(onError);
}

export default Request;