import axios from "axios";

const baseUrl = "https://ayc-be.onrender.com/";
// const baseUrl = "http://127.0.0.1:8000/";

const makeRequest = async (method, url, reqBody, params) => {
  let config = {
    headers: {},
    params: params || {},
  };

  if (reqBody instanceof FormData) {
    config.headers['Content-Type'] = 'multipart/form-data';
  } else if (reqBody instanceof URLSearchParams) {
    config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
  } else {
    config.headers['Content-Type'] = 'application/json';
  }

  try {
    const response = await axios({
      method,
      url: baseUrl + url,
      data: reqBody,
      headers: config.headers,
      params: config.params,
    });

    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

export default makeRequest;
