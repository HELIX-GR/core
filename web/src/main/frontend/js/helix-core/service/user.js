import * as actions from './api/fetch-actions';

const api = {

  getProfile: (token) => {
    return actions.get('/action/user/profile', token);
  },

  login: (username, password, token) => {
    const loginForm = new FormData();
    loginForm.append('username', username);
    loginForm.append('password', password);

    return actions.submit('/login', token, loginForm);
  },

  logout: (token) => {
    return actions.submit('/logout', token, null);
  },
};

export default api;
