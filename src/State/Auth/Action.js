// authActions.js

import { 
  REGISTER_REQUEST, 
  REGISTER_SUCCESS, 
  REGISTER_FAILURE, 
  LOGIN_REQUEST, 
  LOGIN_SUCCESS, 
  LOGIN_FAILURE, 
  GET_USER_REQUEST, 
  GET_USER_SUCCESS, 
  GET_USER_FAILURE, 
  LOGOUT 
} from './ActionType'

// Base API URL (adjust based on your setup)
const API_BASE_URL = 'https://ecommercebackend-production-c7e5.up.railway.app/';

// Action: Register a new user
export const register = (formData) => async (dispatch) => {
  dispatch({ type: REGISTER_REQUEST });
  try {
    const response = await fetch(`${API_BASE_URL}users/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    if (!response.ok) throw new Error('Registration failed.');
    const data = await response.json();

    dispatch({ type: REGISTER_SUCCESS, payload: data });
    return true; // Registration was successful
  } catch (error) {
    dispatch({ type: REGISTER_FAILURE, payload: error.message });
    return false; // Registration failed
  }
};

// Action: Log in a user
export const login = (formData) => async (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });
  try {
    const response = await fetch(`${API_BASE_URL}auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    if (!response.ok) throw new Error('Login failed.');
    const data = await response.json();

    if (data.message) {
      localStorage.setItem('jwt', data.message); // Save token to localStorage
      dispatch({ type: LOGIN_SUCCESS, payload: data });
      return true; // Login was successful
    } else {
      throw new Error('Unexpected response format.');
    }
  } catch (error) {
    dispatch({ type: LOGIN_FAILURE, payload: error.message });
    return false; // Login failed
  }
};
// Action: Fetch the logged-in user's details
export const getUser = () => async (dispatch) => {
  dispatch({ type: GET_USER_REQUEST });
  try {
    const token = localStorage.getItem('jwt');
    if (!token) throw new Error('No token found.');

    const response = await fetch(`${API_BASE_URL}users/profile`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) throw new Error('Failed to fetch user details.');
    const data = await response.json();

    dispatch({ type: GET_USER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_USER_FAILURE, payload: error.message });
  }
};

// Action: Log out the user
export const logout = () => (dispatch) => {
  localStorage.removeItem('jwt'); // Remove token from localStorage
  dispatch({ type: LOGOUT });
};
