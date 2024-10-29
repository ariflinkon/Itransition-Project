import axios from 'axios';
import { useAuth } from '../components/Auth/AuthContext';

const API_URL = "http://localhost:5000/api/auth/";

function parseJwt(token) {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
  } catch (e) {
    return null;
  }
}

const authService = {
    isAuthenticated() {
      const token = localStorage.getItem('token');
      return !!token;
    },

    authenticate(cb) {
      this.isAuthenticated = true;
      setTimeout(cb, 100); // fake async
    },

    signout(cb) {
      this.isAuthenticated = false;
      setTimeout(cb, 100);
    },

    login(email, password) {
      return axios
        .post(API_URL + "login", { email, password })
        .then(response => {
          if (response.data.accessToken) {
            localStorage.setItem("token", response.data.accessToken);
            const { login } = useAuth();
            login(response.data.accessToken);
          }
          return response.data;
        })
        .catch(error => {
          console.error("Login error:", error);
          throw error;
        });
    },

    getCurrentUser() {
      const token = localStorage.getItem('token');
      return token ? parseJwt(token) : null;
    },
};

export default authService;