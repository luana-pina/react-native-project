import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const instance = axios.create({
  baseURL: "http://192.168.0.21:3333",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

instance.interceptors.request.use(
  async (config) => {
    const isToken = await AsyncStorage.getItem("token");

    if (isToken) {
      config.headers!.Authorization = "Bearer " + isToken;
    }

    return config;
  },
  (err) => {
    let error;
    if (err.response) {
      error = err.response.data;
    } else if (err.request) {
      error = err.request;
    } else {
      error = err.message;
    }
    return Promise.reject(error);
  }
);
instance.interceptors.response.use(
  async (response) => {
    return response;
  },
  (err) => {
    let error;
    if (err.response) {
      error = err.response.data;
    } else if (err.request) {
      error = {
        requestId: err.request._requestId,
        response: err.request._response,
      };
    } else {
      error = err.message;
    }
    return Promise.reject(error);
  }
);

export default instance;
