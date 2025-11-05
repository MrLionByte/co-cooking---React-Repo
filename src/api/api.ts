import axios from 'axios';
import { supabase } from '@/lib/supabase';
import { LocalStorageManager } from '@/services/storage';
import toast from 'react-hot-toast';

const API_BASE_URL = import.meta.env.VITE_SUPABASE_EDGE_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(async (config) => {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    if (session?.access_token) {
      config.headers.Authorization = `Bearer ${session.access_token}`;
      return config;
    }

    const guest = LocalStorageManager.get<{ guest_secret?: string, guest_id?: string }>('guest_user');
    if (guest?.guest_secret) {
      config.headers["Guest-Secret-Auth"] = `Bearer ${guest.guest_secret}`;
      config.headers["Guest-ID"] = guest.guest_id;
      config.headers.Authorization = 'Bearer Unauthenticated';
      return config;
    }
  } catch (error) {
    toast.error('Failed to authenticate. Please try again or clear your local storage.');
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const errorMessage =
      error.response?.data?.error ||
      error.response?.data?.message ||
      error.response?.data ||
      error.message ||
      'An unknown error occurred';
    return Promise.reject(new Error(errorMessage));
  }
);


export const getTokenBalance = async () => {
  const response = await api.get('/token-balance');
  return response.data;
};

export const extractRecipe = async (url: string) => {
  const response = await api.post('/recipe-extractor', { url });
  return response.data;
};

export const cookWithIngredients = async (
  isGuest: boolean,
  ingredients: string[],
  preferences: any,
  language: string
) => {
  let url = '/cook-with-what-i-have';
  if (isGuest) {
    url= "/guest-cook-with-what-i-have";
  }
  
  const response = await api.post(url, {
    ingredients,
    preferences,
    language,
  });
  return response;
};

export const planMeal = async (criteria: any) => {
  const response = await api.post('/plan-my-meal', criteria);
  return response.data;
};

export default api;
