import { getAccessToken } from './tokenService';

// authService.js
const authService = {
  isAuthenticated: getAccessToken() !== null,
  // eslint-disable-next-line no-unused-vars
  login: async (email, password) => {
    if (email === 'admin' && password === 'admin') {
      authService.isAuthenticated = true;
    }
  },
  logout: () => {
    authService.isAuthenticated = false;
  }
};

export default authService;
