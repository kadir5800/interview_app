
const initialState = {
    authToken: null,
    userData: {},
  };
  
  const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_AUTH_TOKEN':
        return { ...state, authToken: action.payload };
      case 'SET_USER_DATA':
        return { ...state, userData: action.payload };
      default:
        return state;
    }
  };

  export default authReducer;