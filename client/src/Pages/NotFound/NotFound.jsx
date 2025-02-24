import React from 'react'
import './NotFound.css'
import BNF from '../../Components/Buttons/ButtonNotFound/BNF'

import logo from '../../Assets/svg/logo.svg'

export default function NotFound() {
  return (
    <div className='notFoundPage'>
        <img src={logo} alt="Логотип FastPay 404 Not Found" className='notFoundLogo'/>
        <h1>Страница не найдена!</h1>
        <p className='notFoundText'>Может вернемся пока не поздно?</p>
        <BNF />
    </div>
  )
}
