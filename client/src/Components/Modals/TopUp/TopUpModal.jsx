import React, { useState } from 'react'
import './TopUpModal.css'
import { QRCodeSVG } from "qrcode.react";

import Button from '../../Buttons/Button';

import copy from '../../../Assets/svg/copy.svg'
import topUp from '../../../Assets/svg/topUpWhite.svg'
import close from '../../../Assets/svg/closeCircle.svg'

export default function TopUpModal({ onClose }) {
    const [showCopy, setShowCopy] = useState(false)
    const [isClicked, setIsClicked] = useState(false);
    const wallet_address = 'TCNiNL66duACHpZtZPpooW1wfavWNBXzxx'

    const handleShowCopy = () => {
        setShowCopy(true)
        setTimeout(() => {
            setShowCopy(false)
        }, 3000)
    }
  return (
    <div className='topUpOverlay' onClick={onClose}>
        {showCopy && 
            <div className='copyNotification'>
                <p>Вы успешно скопировали адрес кошелька!</p>
            </div>
        }
        <div className="topUpModal" onClick={(e) => e.stopPropagation()}>
            <div className="topUpTitle">
                <h1>Пополнение баланса</h1>
                <p>Переведите нужную сумму в USDT на указанный кошелек или отсканируйте QR-код</p>
            </div>
            <div className="wallet">
                <p className='topUpText'>Кошелек для пополнения</p>
                <div className="valueContainer">
                    <p className='valueText'>{wallet_address}</p>
                    <div 
                        className={`copyIconWrapper ${isClicked ? 'clicked' : ''}`}
                        onMouseDown={() => setIsClicked(true)} 
                        onMouseUp={() => setTimeout(() => setIsClicked(false), 50)}
                    >
                        <img 
                            src={copy} 
                            style={{cursor: 'pointer',position: 'relative', zIndex: 2}}
                            alt="Иконка копирования кошелька" 
                            onClick={() => {
                                const text = document.querySelector(".valueText").textContent;
                                navigator.clipboard.writeText(text);
                                handleShowCopy()
                            }} 
                        />
                    </div>
                </div>
            </div>
            <div className="sumForTopUp">
                <p className='topUpText'>Сумма для пополнения (обязательно указывайте центы – это идентификатор трейдера, как в примере)</p>
                <div className="valueContainer">
                    <p className="valueText">1000.401</p>
                </div>
            </div>
            <div className="sumForTopUp" style={{alignItems: 'center'}}>
                <p className="topUpText" style={{width: '100%'}}>QR-код для пополнения</p>
                <div className="qrContainer">
                    <QRCodeSVG value={wallet_address} size={128} />
                </div>
            </div>
            <p className='topUpTextWarning'>Данный адрес предназначен только для переводов Tether в сети TRC20. При пополнении депозита с некорректным идентификатором площадка не несет финансовой ответственности за депозит. Настоятельно рекомендуем внимательно проверять идентификатор перед отправкой депозита на площадку</p>
            <div className="topUpButtons">
                <Button type={'colored'} onClick={onClose}>
                    <img src={topUp} alt="Иконка подтверждения пополнения" />
                    <p>Пополнить</p>
                </Button>
                <Button type={'white'} onClick={onClose}>
                    <img src={close} alt="Иконка отмены пополнения" />
                    <p>Отмена</p>
                </Button>
            </div>
        </div>
    </div>
  )
}
 