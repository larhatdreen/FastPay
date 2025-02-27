import React, { useEffect } from 'react'
import './NotFound.css'
import { useNavigate } from 'react-router-dom'

import Button from '../../Components/Buttons/Button'

import not_found from '../../Assets/svg/404.svg'

export default function NotFound({ setShowHeader }) {
  const navigate = useNavigate()

  useEffect(() => {
    setShowHeader(false)
    return () => {
      setShowHeader(true)
    }
  }, [setShowHeader])
  return (
    <div className='notFoundPage'>
        <div className="notFoundContainer">
          <img src={not_found} alt="Логотип FastPay 404 Not Found" className='notFoundSvg'/>
          <div className="notFoundMainText">
            <h1>Упс! Страница не найдена</h1>
            <p className='notFoundText'>К сожалению, запрашиваемая вами страница не существует. Возможно, она была удалена, перемещена или вы ввели неверный адрес.</p>
          </div>
          <Button type={'colored'} rl={16} onClick={() => navigate('/dashboard')}>
            <p style={{fontSize: '1.5vw'}}>На главную страницу</p>
          </Button>
        </div>
    </div>
  )
}
