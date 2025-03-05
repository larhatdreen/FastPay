import React, { useState, useEffect, useRef } from 'react';
import './Profile.css';
import { useNavigate } from 'react-router-dom';

import Button from '../../Components/Buttons/Button';
import IconWrapper from '../../Components/IconWrapper/IconWrapper';
import Search from '../../Components/Search/Search';


import arrow from '../../Assets/svg/arrowChange.svg';
import logOut from '../../Assets/svg/logOut.svg';

export default function Profile({ data = true, windowWidth, setIsAuthenticated }) {
    const [open, setOpen] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const [time, setTime] = useState('(+3:00 UTC) Moscow');
    const [selectedTimeZone, setSelectedTimeZone] = useState('Europe/Moscow');
    const timeZonesRef = useRef(null);
    const navigate = useNavigate();

    // Список часовых поясов с городами и смещением UTC
    const timeZones = [
        { zone: 'Europe/Kaliningrad', city: 'Kaliningrad', offset: '+2:00 UTC' },
        { zone: 'Europe/Moscow', city: 'Moscow', offset: '+3:00 UTC' },
        { zone: 'Europe/Samara', city: 'Samara', offset: '+4:00 UTC' },
        { zone: 'Asia/Yekaterinburg', city: 'Yekaterinburg', offset: '+5:00 UTC' },
        { zone: 'Asia/Omsk', city: 'Omsk', offset: '+6:00 UTC' },
        { zone: 'Asia/Krasnoyarsk', city: 'Krasnoyarsk', offset: '+7:00 UTC' },
        { zone: 'Asia/Irkutsk', city: 'Irkutsk', offset: '+8:00 UTC' },
        { zone: 'Asia/Yakutsk', city: 'Yakutsk', offset: '+9:00 UTC' },
        { zone: 'Asia/Vladivostok', city: 'Vladivostok', offset: '+10:00 UTC' },
        { zone: 'Asia/Magadan', city: 'Magadan', offset: '+11:00 UTC' },
        { zone: 'Asia/Kamchatka', city: 'Petropavlovsk-Kamchatsky', offset: '+12:00 UTC' },
        { zone: 'America/New_York', city: 'New York', offset: '-5:00 UTC' },
        { zone: 'Asia/Tokyo', city: 'Tokyo', offset: '+9:00 UTC' },
        { zone: 'Australia/Sydney', city: 'Sydney', offset: '+10:00 UTC' },
        { zone: 'Europe/London', city: 'London', offset: '+0:00 UTC' },
    ];

    // Функция для получения текущего времени в часовом поясе
    const getCurrentTime = (timeZone) => {
        const options = {
            timeZone: timeZone,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false,
        };
        return new Intl.DateTimeFormat('ru-RU', options).format(new Date());
    };

    // Обработчик для кнопки-чекбокса
    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
        if (!isChecked) {
            const localTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
            setSelectedTimeZone(localTimeZone);
            setTime(getCurrentTime(localTimeZone));
        } else {
            setTime('(+3:00 UTC) Moscow');
            setSelectedTimeZone('Europe/Moscow');
        }
    };

    // Обработчик для выбора часового пояса
    const handleTimeZoneClick = (zone, offset, city) => {
        setSelectedTimeZone(zone);
        if (!isChecked) {
            setTime(`(${offset}) ${city}`);
        }
    };

    // Автообновление времени
    useEffect(() => {
        if (isChecked) {
            const interval = setInterval(() => {
                setTime(getCurrentTime(selectedTimeZone));
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [isChecked, selectedTimeZone]);

    // Закрытие timeZones при клике вне
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (open && timeZonesRef.current && !timeZonesRef.current.contains(event.target)) {
                setOpen(false); // Закрываем, если клик вне timeZones
            }
        };

        // Добавляем слушатель на document
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            // Убираем слушатель при размонтировании
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [open]);

    const handleLogOut = () => {
        localStorage.removeItem('fp_secretKey');
        localStorage.removeItem('fp_token');
        localStorage.removeItem('fp_type');
        setIsAuthenticated(false)
        navigate('/login') 
    }

    return (
        <div className='progilePage'>
            <div className="infoContainer">
                <div className="mainInfo">
                    <h1>Профиль</h1>
                    <div className="profileContainers">
                        <div className="ID">
                            <h2>ID:</h2>
                            <span>{'52353252352353253252353534532523'}</span>
                        </div>
                        <div className="rate">
                            <h2>RATE:</h2>
                            <div className="rateOut rateFlex" style={{ border: 'none', padding: '0' }}>
                                <div className="rateIn rateInFlex">
                                    <p>Базовый процент:</p>
                                    <span>{'base_procent'}</span>
                                </div>
                                <div className="rateIn">
                                    <p>PayIn:</p>
                                    <div className='payFlex'><span>{'payin_host'}</span> <span>{'value%'}</span></div>
                                </div>
                                <div className="rateIn">
                                    <p>PayOut:</p>
                                    <div className='payFlex'><span>{'payout_transfer'}</span> <span>{'value%'}</span></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="optionInfo">
                    <div className="rateOut">
                        <h2>Created at:</h2>
                        <h3>{'time_created_user'}</h3>
                    </div>
                    <div className="rateOut">
                        <h2>Telegram chat ID:</h2>
                        <h3>{'tg_user_id'}</h3>
                    </div>
                    <div className="rateOut" style={{ border: 'none', paddingBottom: windowWidth <= 680 ? 0 : '' }}>
                        <h2>Время</h2>
                        <div className="timeChrono">
                            <h3>{time}</h3>
                            
                            <IconWrapper onClick={() => setOpen(!open)}>
                                <img src={arrow} alt="Иконка для изменения часового пояса" />
                            </IconWrapper>
                            <div
                                className='timeZones'
                                ref={timeZonesRef}
                                style={{ opacity: open ? 1 : 0, pointerEvents: open ? 'auto' : 'none' }}
                            >
                                <Search />
                                <div className="timeZoneList">
                                    {timeZones.map(({ zone, city, offset }) => (
                                        <div
                                            key={zone}
                                            className={`timeZoneItem ${selectedTimeZone === zone ? 'selected' : ''}`}
                                            onClick={() => handleTimeZoneClick(zone, offset, city)}
                                        >
                                            ({offset}) {city}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="localTime">
                        <button
                            className="checkbox"
                            style={{
                                background: isChecked ? 'linear-gradient(222.4deg, #FF7700 6.42%, #E10CFF 93.77%)' : '',
                                border: isChecked ? 'none' : ''
                            }}
                            onClick={handleCheckboxChange}
                        >
                            {isChecked && (
                                <svg xmlns="http://www.w3.org/2000/svg" width={17} height={17} viewBox="0 0 24 24">
                                    <path fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M20 7L10 17l-5-5" />
                                </svg>
                            )}
                        </button>
                        <p>Установить локальное время</p>
                    </div>
                </div>
            </div>
            <Button type={'white'} style={{ width: 'fit-content' }} onClick={handleLogOut}>
                <img src={logOut} alt="Иконка выхода из профиля" />
                <p>Выйти из профиля</p>
            </Button>
        </div>
    );
}