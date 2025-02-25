import axios from 'axios';

const api = axios.create({
  baseURL: 'https://localhost:3000', 
  timeout: 10000, // Таймаут
  headers: {
    'Content-Type': 'application/json',
  },
});

// Перехватчик для обработки ошибок
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Ошибка запроса:', error);
    return Promise.reject(error);
  }
);

// Функции для запросов
export const getUserData = () => api.get('/users');
export const postTransaction = (data) => api.post('/transactions', data);
export const loginUser = () => api.post('/login');

export default api;