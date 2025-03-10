import React from 'react';
import './Row.css'
export default function Row({
    user_name = false,
    icon,
    title,
    text,
    flex_out,
    flex_in,
    limit,
    limit_have,
    limit_max,
    status,
    user_status,
    device_status,
    gap_out,
    gap_in,
    currency,
    usdt,
    conversion
}) {
    return (
        <div
            className='rowContainer'
            style={{
                display: 'flex',
                gap: gap_out,
                flexDirection: flex_out === 'flex-reverse' ? 'row-reverse' : '',
                justifyContent: flex_out === 'flex-reverse' ? 'flex-end' : ''
            }}
        >
            {user_name ?
                <div className="userStatus">
                    <div className="clue">
                        {user_status === 'stop' ?
                            'Приостановлен'
                            : user_status === 'block' ?
                                'Заблокирован'
                                :
                                'Активно'
                        }
                    </div>
                </div>
                :
                icon && <div className="forRowIcon"><img src={icon} alt="Иконка в компоненте строки" /></div>
            }
            <div
                className="rowText"
                style={{
                    display: flex_in,
                    gap: gap_in,
                    width: limit ? '90%' : conversion ? '40%' : ''
                }}
            >
                <h4
                    style={{
                        width: limit ? '40%' : conversion ? '30%' : '',
                        color: status
                            ? (status === 'Активно' ? '#14CD36' : status === 'Не активно' ? '#A0A0A0' : '#EB001B')
                            : ''
                    }}
                >
                    {title} {currency}
                </h4>
                {limit ?
                    <progress className='progress' value={limit_have} max={limit_max} />
                    :
                    <p>{text} {usdt && 'USDT'}</p>
                }
            </div>
        </div>
    );
}