import React, { useState } from 'react';
import './TopUpModal.css';
import { QRCodeSVG } from "qrcode.react";

import Button from '../../Buttons/Button';
import Notification from '../../Notification/Notification';
import IconWrapper from '../../IconWrapper/IconWrapper'

import copy from '../../../Assets/svg/copy.svg';
import topUp from '../../../Assets/svg/topUpWhite.svg';
import close from '../../../Assets/svg/closeCircle.svg';

export default function TopUpModal({ onClose, windowWidth }) {
    const [showCopy, setShowCopy] = useState(false);
    const [noticeText, setNoticeText] = useState('')
    const wallet_address = 'TCNiNL66duACHpZtZPpooW1wfavWNBXzxx';

    const handleShowCopy = () => {
        setShowCopy(true);
    };

    const handleCloseNotification = () => {
        setShowCopy(false);
    };

    const copyToClipboard = async (text) => {
        try {
            if (navigator.clipboard && navigator.clipboard.writeText) {
                await navigator.clipboard.writeText(text);
            } else {
                const textarea = document.createElement('textarea');
                textarea.value = text;
                document.body.appendChild(textarea);
                textarea.select();
                document.execCommand('copy');
                document.body.removeChild(textarea);
            }
            setNoticeText('Вы успешно скопировали адрес кошелька!')
            handleShowCopy();
        } catch (err) {
            console.error('Ошибка копирования:', err);
            setNoticeText('Не удалось скопировать текст.\nПожалуйста, скопируйте вручную.')
            handleShowCopy();
        }
    };

    return (
        <div className="topUpOverlay" onClick={onClose}>
            {showCopy && (
                <Notification onClose={handleCloseNotification}>
                    <p>{noticeText}</p>
                </Notification>
            )}
            <div className="topUpModal" onClick={(e) => e.stopPropagation()}>
                <div className="topUpTitle">
                    <h1>Пополнение баланса</h1>
                    <p>Переведите нужную сумму в USDT на указанный кошелек или отсканируйте QR-код</p>
                </div>
                <div className="wallet">
                    <p className="topUpText">Кошелек для пополнения</p>
                    <div className="valueContainer">
                        <p className="valueText">{wallet_address}</p>
                        <IconWrapper>
                            <img
                                src={copy}
                                style={{ cursor: 'pointer', position: 'relative', zIndex: 2 }}
                                alt="Иконка копирования кошелька"
                                onClick={() => copyToClipboard(wallet_address)}
                            />
                        </IconWrapper>
                    </div>
                </div>
                <div className="sumForTopUp">
                    <p className="topUpText">Сумма для пополнения (обязательно указывайте центы – это идентификатор трейдера, как в примере)</p>
                    <div className="valueContainer">
                        <p className="valueText">1000.401</p>
                    </div>
                </div>
                <div className="sumForTopUp" style={{ alignItems: 'center' }}>
                    <p className="topUpText" style={{ width: '100%' }}>QR-код для пополнения</p>
                    <div className="qrContainer">
                        <QRCodeSVG value={wallet_address} size={128} />
                    </div>
                </div>
                <p className="topUpTextWarning">Данный адрес предназначен только для переводов Tether в сети TRC20. При пополнении депозита с некорректным идентификатором площадка не несет финансовой ответственности за депозит. Настоятельно рекомендуем внимательно проверять идентификатор перед отправкой депозита на площадку</p>
                <div className="topUpButtons">
                    <Button type="colored" onClick={onClose} rl={windowWidth <= 370 ? 12 : 16} tb={windowWidth <= 370 ? 6 : windowWidth <= 780 ? 8 : 10} >
                        <img src={topUp} alt="Иконка подтверждения пополнения" />
                        <p>Пополнить</p>
                    </Button>
                    <Button type="white" onClick={onClose} rl={windowWidth <= 370 ? 12 : 16} tb={windowWidth <= 370 ? 6 : windowWidth <= 780 ? 8 : 10}>
                        <img src={close} alt="Иконка отмены пополнения" />
                        <p>Отмена</p>
                    </Button>
                </div>
            </div>
        </div>
    );
}