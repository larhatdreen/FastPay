import React from 'react'
import './Profile.css'

import arrow from '../../Assets/svg/arrowChange.svg'

export default function Profile({ data = true }) {
  return (
    <div className='progilePage'>
        <div className="mainInfo">
            <h1>Профиль</h1>
            <div className="profileContainers">
                <div className="ID">
                    <h2>ID:</h2>
                    <span>{'user_id'}</span>
                </div>
                <div className="rate">
                    <h2>RATE:</h2>
                    <div className="rateOut">
                        <div className="rateIn">
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
            { data && 
            <div className="rateOut">
                <h2>Telegram chat ID:</h2>
                <h3>{'tg_user_id'}</h3>
            </div>
            }
            <div className="rateOut">
                <h2>Время</h2>
                <div className="timeChrono">
                    <h3>{'time'}</h3>
                    <img 
                        src={arrow} 
                        alt="Иконка для изменения часового пояса" 
                        onMouseEnter={(e) => e.target.style.transform = 'rotate(180deg)'}
                        onMouseLeave={(e) => e.target.style.transform = 'none'}
                    />
                </div>
            </div>
            
        </div>
    </div>
  )
}
