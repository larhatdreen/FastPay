import React, { useEffect, useState } from 'react'
import './NotFound.css'
import { useNavigate } from 'react-router-dom'

import Button from '../../Components/Buttons/Button'

import not_found from '../../Assets/svg/404.svg'

export default function NotFound({ windowWidth, setShowHeader }) {
  const [pSize, setPSize] = useState('32px')
  const navigate = useNavigate()

  useEffect(() => {
    setShowHeader(false)
    return () => {
      setShowHeader(true)
    }
  }, [setShowHeader])

  useEffect(() => {
    switch (true) {
        case windowWidth <= 1200:
            setPSize('24px');
            break;
        default:
            setPSize('32px');
            break;
    }
}, [windowWidth]);
  return (
    <div className='notFoundPage'>
        <div className="notFoundContainer">
          <img src={not_found} alt="Логотип FastPay 404 Not Found" className='notFoundSvg'/>
          <div className="notFoundMainText">
            <h1>Упс! Страница не найдена</h1>
            <p className='notFoundText'>К сожалению, запрашиваемая вами страница не существует. Возможно, она была удалена, перемещена или вы ввели неверный адрес.</p>
          </div>
          <Button type={'colored'} rl={16} onClick={() => navigate('/dashboard')}>
            <p style={{fontSize: pSize}}>На главную страницу</p>
          </Button>
        </div>
    </div>
  )
}
