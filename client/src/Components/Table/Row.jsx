import React from 'react';

export default function Row({
    user_name = false, 
    icon,
    title, 
    text, 
    flex_out, 
    flex_in, 
    limit, 
    status, 
    user_status,
    device_status, 
    gap_out, 
    gap_in,
    usdt, 
    rub_title, 
    rub
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
        icon && <img src={icon} alt="Иконка в компоненте строки" />
        }
        <div 
            className="rowText"
            style={{
                display: flex_in,
                gap: gap_in
            }}
        >
            <h4>{title === 'deposit' ? 'Пополнение' : title === 'withdrow' ? 'Вывод прибыли' : title} {usdt && 'USDT'}{rub_title && '₽'}</h4>
            {limit ?
            <progress value={limit.have} max={limit.max}/>
            :
            <p>{text} {rub && '₽'}</p>
            }
        </div>
    </div>
  );
}