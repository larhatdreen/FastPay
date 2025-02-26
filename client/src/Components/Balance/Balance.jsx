import React, { useState, useEffect } from 'react';
import './Balance.css';

import IconWrapper from '../IconWrapper/IconWrapper';

import message from '../../Assets/svg/messageQuestion.svg'

const Balance = () => {
    const [currentTime, setCurrentTime] = useState(new Date());
    const [showTooltip, setShowTooltip] = useState(false);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const handleImageClick = () => {
        setShowTooltip(true);
        setTimeout(() => {
            setShowTooltip(false);
        }, 3000);
    };

    return (
        <div className="balanceContainer">
            <div className="balanceRow">
                <h2>{'1'} USDT = {'100,53'} ₽</h2>
                <p>
                    {currentTime.toLocaleString('ru-RU', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit',
                    })}
                </p>
            </div>
            <div className="balanceRow">
                <h2>{'33'} USDT</h2>
                <div className="balanceDeposite">
                    {showTooltip && (
                        <div className={`tooltip ${showTooltip ? 'tooltip-visible' : ''}`}>
                            <p>Эскроу счет</p>
                            <h3>{'0'} USDT</h3>
                            <div className="triangle"></div>
                            <div className="triangleGrey"></div>
                        </div>
                    )}
                    <p>Баланс депозита</p>
                    <IconWrapper height='23px'>
                        <img
                            src={message}
                            alt="Иконка баланса депозита"
                            style={{ transform: 'translate(1px, 2px)', cursor: 'pointer' }}
                            onClick={handleImageClick}
                        />
                    </IconWrapper>
                </div>
            </div>
            <div className="balanceRow">
                <h2>{'1'} USDT</h2>
                <p>Баланс вывода</p>
            </div>
            <div className="balanceRow">
                <h2>{'1'} ₽</h2>
                <p>Payout</p>
            </div>
        </div>
    );
};

export default Balance;