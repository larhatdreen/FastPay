import React, { useState } from 'react';
import './Login.css';
import { requestOfficeToken } from '../../API/api';
import Button from '../../Components/Buttons/Button';

export default function Login({ onLogin }) {
  const [secretKey, setSecretKey] = useState('');
  const [code, setCode] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true)
    setError(null);
    
    try {
      await requestOfficeToken({ secretKey, code, onLogin, setIsLoading });
    } catch (err) {
      console.log('Полная ошибка:', err.response);
      console.log('Данные ответа сервера:', err.response?.data);
      setError(err.response?.data?.detail || err.message || 'Ошибка при входе');
    }
  };

  return (
    <div className='loginPage'>
      <form className='loginForm' onSubmit={handleSubmit}>
        <input 
          type="text" 
          className='loginInput' 
          value={secretKey}
          onChange={(e) => setSecretKey(e.target.value)}
          placeholder='Секретный ключ'
          autoFocus
        />
        <input 
          type="text" 
          className='loginInput'
          value={code}
          onChange={(e) => setCode(e.target.value)} 
          placeholder='Код 2fa'
        />
        {error && <p className='error' style={{color: 'red'}}>{error}</p>}
        <Button type={'colored'} tb={10} rl={16} isLoading={isLoading}>
          <p style={{fontSize: '32px'}}>Войти</p>
        </Button>
      </form>
    </div>
  );
}