import React, { useState } from 'react';
import './WithdrawModal.css';

import Button from '../../Buttons/Button';

import withdraw from '../../../Assets/svg/withdrawWhite.svg';
import close from '../../../Assets/svg/closeCircle.svg';
import ellipse from '../../../Assets/svg/ellipseColor.svg'
import ellipseGrey from '../../../Assets/svg/ellipseGrey.svg'
import usdt from '../../../Assets/svg/usdt.svg'

export default function WithdrawModal({ onClose, windowWidth }) {
    const [select, setSelect] = useState(1)
    const [sum, setSum] = useState(1)
    const [isChecked, setIsChecked] = useState(false)
    const [wallet, setWallet] = useState('')

    const selectChangeClick = (selected) => {
        setSelect(selected)
        setSum(selected)
    }

    return (
        <div className="withdrawOverlay" onClick={onClose}>
            <div className="withdrawModal" onClick={(e) => e.stopPropagation()}>
                <div className="withdrawTitle">
                    <h1>Вывод средств</h1>
                    <p>Перевод средств с баланса прибыли</p>
                </div>
                <div className="withdrawWallet">
                    <p className="withdrawText">Баланс прибыли</p>
                    <h4>{(0.853).toFixed(3)} USDT</h4>
                </div>
                <div className="sumForwithdraw">
                    <button className={`selectWD ${select === 1 ? 'active' : ''}`} onClick={() => selectChangeClick(1)}>
                        <p style={{color: select === 1 ? '#2B2B2A' : ''}}>На баланс депозита</p>
                        <img src={select === 1 ? ellipse : ellipseGrey} alt="Эллипс для селекта" />
                    </button>
                    <button className={`selectWD ${select === 500 ? 'active' : ''}`} onClick={() => selectChangeClick(500)}>
                        <p style={{color: select === 500 ? '#2B2B2A' : ''}}>В USDT TRC20</p>
                        <img src={select === 500 ? ellipse : ellipseGrey} alt="Эллипс для селекта" />
                    </button>
                </div>
                {select === 500 &&
                    <div className="sumForwithdraw">
                        <p className="withdrawText">Кошелек для пополнения</p>
                        <div className="inputWD inputWallet">
                            <input 
                                type="text" 
                                placeholder="Адрес кошелька"
                                value={wallet}
                                onChange={(e) => setWallet(e.target.value)}
                                maxLength={40}
                                autoFocus 
                            />
                        </div>
                    </div>
                }
                <div className="sumForwithdraw">
                    <p className="withdrawText">Сумма</p>
                    <div className="inputWD">
                        <input 
                            type="number" 
                            placeholder={sum ? sum : (select === 1 ? 1 : 500)}
                            value={sum}
                            onChange={(e) => {
                                const value = e.target.value;
                                const numValue = value === '' ? '' : Number(value); // Преобразуем в число или оставляем пустым
                                if (value === '' || (numValue >= 1 && numValue <= 1000)) {
                                    setSum(value); // Обновляем только если в пределах диапазона
                                }
                            }}
                            maxLength={15}
                            min="1"
                            max='1000'
                            autoFocus 
                        />
                        <div className='usdtContainer'>
                            <img src={usdt} alt="иконка usdt" />
                            USDT
                        </div>
                    </div>
                    <p className="warning">Не менее {select === 1 ? 1 : 500} USDT и не более баланса прибыли. Только целое число</p>
                </div>
                {select === 500 && <p className="withdrawTextWarning">Вывод средств возможен только на кошелек в сети TRC20</p>}
                <div className="dataCorrect" onClick={() => setIsChecked(!isChecked)}>
                        <button
                            className="checkbox"
                            style={{
                                background: isChecked ? 'linear-gradient(222.4deg, #FF7700 6.42%, #E10CFF 93.77%)' : '',
                                border: isChecked ? 'none' : ''
                            }}
                        >
                            {isChecked && (
                                <svg xmlns="http://www.w3.org/2000/svg" width={17} height={17} viewBox="0 0 24 24">
                                    <path fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M20 7L10 17l-5-5" />
                                </svg>
                            )}
                        </button>
                        <p>Данные введены корректно</p>
                    </div>
                <div className="withdrawButtons">
                    <Button type={isChecked ? 'colored' : ''} disabled={!isChecked} onClick={onClose} rl={windowWidth <= 370 ? 12 : 16} tb={windowWidth <= 370 ? 6 : windowWidth <= 780 ? 8 : 10} >
                        <img src={withdraw} alt="Иконка подтверждения вывода" />
                        <p>Пополнить</p>
                    </Button>
                    <Button type="white" onClick={onClose} rl={windowWidth <= 370 ? 12 : 16} tb={windowWidth <= 370 ? 6 : windowWidth <= 780 ? 8 : 10}>
                        <img src={close} alt="Иконка отмены вывода" />
                        <p>Отмена</p>
                    </Button>
                </div>
            </div>
        </div>
    );
}