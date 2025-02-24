import React from 'react'
import './Login.css'
import Button from '../../Components/Buttons/Button'

export default function Login() {
  return (
    <div className='loginPage'>
        <form action="" className='loginForm'>
            <input type="text" className='loginInput' placeholder='Секретный ключ'/>
            <input type="text" className='loginInput' placeholder='Код 2fa'/>
            <Button type={'colored'} tb={10} rl={16}>
                <p style={{fontSize: '32px'}}>Войти</p>
            </Button>
        </form>
    </div>
  )
}
