import axios from "axios";
import Cookies from "js-cookie";

const baseURL = "";
const authCookie = "access_token";
const setAuthToken = token => Cookies.set(authCookie, token);
const getAuthToken = () => Cookies.get(authCookie);
const removeAuthToken = () => Cookies.remove(authCookie);

const api = token =>
    axios.create({
        baseURL,
        timeout: 1000,
        headers: {
            [authCookie]: token
        }
    });

export default api;
export { baseURL, setAuthToken, getAuthToken, removeAuthToken };
