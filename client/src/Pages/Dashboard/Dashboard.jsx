import React, { useState } from 'react'
import './Dashboard.css'

import Button from '../../Components/Buttons/Button'
import CalendarModal from '../../Components/Modals/Calendar/CalendarModal'
import TopUpModal from '../../Components/Modals/TopUp/TopUpModal'
import WithdrawModal from '../../Components/Modals/Withdraw/WithdrawModal'
import PayinAndPayout from '../../Components/Payin&Payout/PayinAndPayout'
import Balance from '../../Components/Balance/Balance'
import DisputesDashboard from '../../Components/DisputesDashboard/DisputesDashboard'

import topUp from '../../Assets/svg/topUp.svg'
import withdraw from '../../Assets/svg/withdraw.svg'
import calendar from '../../Assets/svg/calendar.svg'

export default function Dashboard({ windowWidth }) {
  // Модальное окно календаря
  const [showCalendar, setShowCalendar] = useState(false);
  const [date, setDate] = useState('Все время')

  const handleCalendarApply = (range) => {
    if (!range?.start) return;

    const today = new Date().toLocaleDateString('ru-RU');
    const startDate = range.start.toLocaleDateString('ru-RU');
    const startEpoch = range.start.getTime();
    const epoch1970 = new Date(1970, 0, 1).getTime();

    if (startEpoch === epoch1970 && range.end?.toLocaleDateString('ru-RU') === today) {
      setDate('Все время');
    } else if (!range.end || startDate === range.end.toLocaleDateString('ru-RU')) {
      setDate(startDate === today ? 'Сегодня' : startDate);
    } else {
      setDate(`${startDate} - ${range.end.toLocaleDateString('ru-RU')}`);
    }
  };

  const handleCalendarClick = () => {
    setShowCalendar(!showCalendar);
  };
  // Модальное окно пополнения баланса
  const [showTopUp, setShowTopUp] = useState(false)

  const handleTopUpClick = () => {
    setShowTopUp(!showTopUp);
  };

  // Модальное окно вывода стредств
  const [showWithdraw, setShowWithdraw] = useState(false)

  const handleWithdrawClick = () => {
    setShowWithdraw(!showWithdraw);
  }

  return (
    <div className='dashboard'>
      {showCalendar && <CalendarModal onClose={handleCalendarClick} onApply={handleCalendarApply} />}
      {showTopUp && <TopUpModal windowWidth={windowWidth} onClose={handleTopUpClick} />}
      {showWithdraw && <WithdrawModal windowWidth={windowWidth} onClose={handleWithdrawClick} />}
      <div className="leftSideDashboard">
        <div className="buttonsDashboard">
          <div className="buttonsCollective">
            <Button
              type={'white'}
              style={{ width: `${windowWidth <= 650 ? '100%' : 'auto'}` }}
              rl={16}
              onClick={handleTopUpClick}
            >
              <img src={topUp} alt="Иконка пополнения" />
              <p style={{ color: '#2B2B2A', fontWeight: '400' }}>Пополнить</p>
            </Button>
            <Button
              type={'white'}
              style={{ width: `${windowWidth <= 650 ? '100%' : 'auto'}` }}
              rl={16}
              onClick={handleWithdrawClick}
            >
              <img src={withdraw} alt="Иконка Вывода" />
              <p style={{ color: '#2B2B2A', fontWeight: '400' }}>Вывести</p>
            </Button>
          </div>
          <Button
            type={'white'}
            style={{ width: `${windowWidth <= 650 ? '100%' : 'auto'}` }}
            className={showCalendar && 'coloredBorder'}
            tb={showCalendar ? 9 : 10}
            rl={showCalendar ? 15 : 16}
            onClick={handleCalendarClick}
          >
            <img src={calendar} alt="Иконка календаря" />
            <p style={{ color: '#2B2B2A', fontWeight: showCalendar ? '700' : '400' }}>{date}</p>
          </Button>
        </div>
        <div className="payInOut">
          <PayinAndPayout name={'Payin'} data={''} />
          <PayinAndPayout name={'Payout'} data={''} />
        </div>
      </div>
      <div className="rightSideDashboard">
        <Balance />
        <DisputesDashboard />
      </div>
    </div>
  )
}
