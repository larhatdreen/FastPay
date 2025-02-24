import React from 'react'
import './BNF.css'
import { useNavigate } from 'react-router-dom'
import svg from '../../../Assets/svg/dataUnloading.svg'

export default function BNF() {
    const navigate = useNavigate()
  return (
    <button className='notFoundBtn' onClick={() => navigate('/')}>
        <img src={svg} alt="Иконка для кнопки возвращения на главную из 404" />
        <p>Вернуться</p>
    </button>
  )
}
