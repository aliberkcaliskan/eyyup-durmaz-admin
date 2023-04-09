import axios from "axios";

const customAxios = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

const requestHandler = (request) => {
  const token = (localStorage.getItem("token") ?? "").replace(/"/gi, "");
  if (token) {
    request.headers.Authorization = `Bearer ${token}`;
  }
  return request;
};

const responseHandler = (response, history) => {
  return response;
};

const errorHandler = (error) => {
  if (error?.response?.status === 401) {
    // localStorage.removeItem("token");
    // window.location.href = `${process.env.REACT_APP_SITE_URL}${pageURL.login}`;
  }

  return Promise.reject(error);
};

customAxios.interceptors.request.use(
  (request) => requestHandler(request),
  (error) => errorHandler(error)
);

customAxios.interceptors.response.use(
  (response) => responseHandler(response),
  (error) => errorHandler(error)
);

export default customAxios;
