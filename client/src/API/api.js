// api.js
import axios from 'axios';
import CryptoJS from 'crypto-js';

// Функция для генерации заголовков авторизации
export const AuthHeader = async () => {
    try {
        const token = localStorage.getItem('fp_token');
        const secretKey = localStorage.getItem('fp_secretKey');
        const type = localStorage.getItem('fp_type');

        const timestamp = Math.floor(Date.now() / 1000).toString();
        const dataToAuth = `${token}${timestamp}${type}`;
        const auth = CryptoJS.HmacSHA256(dataToAuth, secretKey).toString(CryptoJS.enc.Hex);

        return {
            auth,
            timestamp,
            token,
            type,
        };
    } catch (error) {
        console.error('Ошибка при генерации заголовка авторизации:', error);
        throw error;
    }
};

// Запрос токена офиса с перенаправлением на /dashboard
export const requestOfficeToken = async ({ secretKey, code, onLogin, setIsLoading, navigate }) => {
    setIsLoading(true);
    try {
        const timestamp = Math.floor(Date.now() / 1000);
        const method = "PUT";
        const path = "/api/v1/dashboard/login";
        const data = `${timestamp}:${method}:${path}`;
        const signature = CryptoJS.HmacSHA256(data, secretKey).toString();

        console.log('Request data:', {
            secretKey,
            code,
            timestamp,
            signature,
            path,
            method,
            dataToSign: data,
        });

        const response = await axios({
            url: path,
            method: method,
            data: { code },
            headers: {
                "FP-Authorization": signature,
                "FP-Timestamp": timestamp.toString(),
                'Content-Type': 'application/json',
            },
        });

        if (response.status === 202) {
            const { token, type } = response.data;
            localStorage.setItem('fp_secretKey', secretKey);
            localStorage.setItem('fp_token', token);
            localStorage.setItem('fp_type', type);
            onLogin();
            console.log('Успешный вход');
            return response.data;
        } else {
            throw new Error('Неверный ключ или код');
        }
    } catch (error) {
        console.error('Ошибка при запросе:', error);
        throw error;
    } finally {
        setIsLoading(false);
        navigate('/dashboard'); // Перенаправление на /dashboard
    }
};

// Получение данных о платежах
export const financeData = async ({ page = 1 } = {}) => {
    // setIsLoading(true);
    const { auth, timestamp, token, type } = await AuthHeader();
    try {
        const url = `/api/v1/dashboard/finance?page=${page}`;

        const response = await axios.get(url, {
            headers: {
                "FP-Authorization": auth,
                "FP-Timestamp": timestamp,
                "FP-Token": token,
                "FP-Type": type,
            },
        });

        console.log(response.data);
        return response.data;

    } catch (error) {
        console.error('Ошибка:', error);
        throw error;
    } finally {
        // setIsLoading(false);
    }
};

// Добавление устройства
export const handleAddDevice = async ({ setIsLoading, nameDevice }) => {
    setIsLoading(true);
    try {
        const { auth, timestamp, token, type } = await AuthHeader();

        const response = await axios.post(
            '/api/v1/dashboard/device',
            { name: nameDevice }, // Тело запроса напрямую, без JSON.stringify
            {
                headers: {
                    "FP-Authorization": auth,
                    "FP-Timestamp": timestamp,
                    "FP-Token": token,
                    "FP-Type": type,
                    'Content-Type': 'application/json',
                },
            }
        );

        const data = response.data;
        console.log(data);
        return data;

    } catch (error) {
        console.error('Ошибка:', error);
        throw error;
    } finally {
        setIsLoading(false);
    }
};

// Получение данных о спорах
export const disputeData = async ({ setIsLoading, page = 1 } = {}) => {
    setIsLoading(true);
    try {
        const { auth, timestamp, token, type } = await AuthHeader();
        let url = `/api/v1/dashboard/dispute?page=${page}`;
        // Раскомментируйте и настройте фильтры при необходимости
        // if (filterStatus) {
        //     url += `&status=${filterStatus}`;
        // }
        // if (searchData) {
        //     url += `&card=${searchData}`;
        // }

        const response = await axios.get(url, {
            headers: {
                "FP-Authorization": auth,
                "FP-Timestamp": timestamp,
                "FP-Token": token,
                "FP-Type": type,
            },
        });

        const data = response.data;
        console.log(data);
        return data;

    } catch (error) {
        console.error('Ошибка:', error);
        throw error;
    } finally {
        setIsLoading(false);
    }
};