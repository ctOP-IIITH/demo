import { getAccessToken, saveTokens, clearTokens } from './tokenService';

// authService.js
const authService = {
  isAuthenticated: getAccessToken() !== null,
  // eslint-disable-next-line no-unused-vars
  login: async (email, password) => {
    if (email === 'admin' && password === 'admin') {
      authService.isAuthenticated = true;
      saveTokens(true, true);
    }
  },
  logout: () => {
    authService.isAuthenticated = false;
    clearTokens();
  }
};

export default authService;
