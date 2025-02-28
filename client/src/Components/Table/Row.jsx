import React from 'react'

export default function Row(
    user_name, 
    icon,
    title, 
    text, 
    flex_out, flex_in, 
    limit, 
    status, 
    user_status,
    device_status, 
    gap_out, gap_in,
    usdt, rub_title, rub
) {
  return (
    <div 
        className='rowContainer'
        style={{
            display: flex_out,
            gap: gap_out
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
        <img src={icon} alt="Иконка в компоненте строки" />
        }
        <div 
            className="rowText"
            style={{
                display: flex_in,
                gap: gap_in
            }}
        >
            <h4>{title} {usdt && 'USDT'}{rub_title && '₽'}</h4>
            {limit ?
            <progress value={limit.have} max={limit.max}/>
            :
            <p>{text} {rub && '₽'}</p>
            }
        </div>
    </div>
  )
}
