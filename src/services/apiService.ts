import axios, { AxiosError } from 'axios';
import { Projects } from '../types/types';
import data from './projects.json'

// Create Axios instance with baseURL configuration
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || '/api/v1/phrase', // Use environment variable or proxy 
  timeout: 10000,
});

// Function for handle with request errors
const handleRequestError = (error: AxiosError) => {
  console.error('Request error', error);
  throw error;
};

// Function to get projects list
export const getProjectsList = async (): Promise<Projects[]> => {
  try {
    //const response = await api.get<Projects[]>('/projects');
    // return response.data;
    const response = data
    return response;
  } catch (error) {
    handleRequestError(error as AxiosError);
    return [];
  }
};
