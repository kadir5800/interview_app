export const setAuthToken = (token) => ({
    type: 'SET_AUTH_TOKEN',
    payload: token,
  });
  
  export const setUserData = (userData) => ({
    type: 'SET_USER_DATA',
    payload: userData,
  });