import axios from 'axios';
import CryptoJS from 'crypto-js';

const api = axios.create({
  baseURL: '/', // Оставляем прокси
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Ошибка запроса:', error);
    return Promise.reject(error);
  }
);

export const requestOfficeToken = async ({ secretKey, code, onLogin, setIsLoading }) => {
  try {
    const timestamp = Math.floor(Date.now() / 1000); // Время в секундах
    const method = "PUT";
    const path = "/api/v1/dashboard/login";
    const data = `${timestamp}:${method}:${path}`; // Убедитесь, что строка данных совпадает с рабочим проектом
    const signature = CryptoJS.HmacSHA256(data, secretKey).toString(); // Измените на base64

    console.log('Request data:', {
      secretKey,
      code,
      timestamp,
      signature,
      path,
      method,
      dataToSign: data,
    });

    const response = await fetch(path, {
      method: method,
      body: JSON.stringify({code: code}),
      headers: {
          "FP-Authorization": signature,
          "FP-Timestamp": timestamp.toString(),
          'Content-Type': 'application/json',
      },
  });

    if (response.status === 202) {
      const data = await response.json();
      localStorage.setItem('fp_secretKey', secretKey);
      localStorage.setItem('fp_token', data.token);
      localStorage.setItem('fp_type', data.type);
      onLogin();
      console.log('получилось')
    } else {
      throw new Error('Неверный ключ или код');
    }
  } catch (err) {
    console.error('Ошибка при запросе:', err);
    throw err;
  } finally {
    setIsLoading(false)
  }
};

export default api;