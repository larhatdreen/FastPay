import React, { useState, useRef } from 'react'
import '../Pages.css'

import Table from '../../Components/Table/Table'
import Row from '../../Components/Table/Row'
import CalendarModal from '../../Components/Modals/Calendar/CalendarModal'
import Button from '../../Components/Buttons/Button'
import Search from '../../Components/Search/Search'

import calendar from '../../Assets/svg/calendarGrey.svg'
import arrow from '../../Assets/svg/arrowChange.svg'

export default function Transactions() {
    const [tranState, setTranState] = useState('Все')
    const [showTranStates, setShowTranStates] = useState(true)
    const [sumFirst, setSumFirst] = useState(null)
    const [sumSecond, setSumSecond] = useState(null)
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

    const data = [
        { транзакция: 'Фетинин Никита Геннадьевич', сумма: '533', статус: 5, адрес: '58% 22/38' },
        { пользователь: 'Фетинин Никита Геннадьевич', сумма: '533', статус: 5, адрес: '58% 22/38' },
        { пользователь: 'Фетинин Никита Геннадьевич', сумма: '533', статус: 5, адрес: '58% 22/38' },
        { пользователь: 'Фетинин Никита Геннадьевич', сумма: '533', статус: 5, адрес: '58% 22/38' },
        { пользователь: 'Фетинин Никита Геннадьевич', сумма: '533', статус: 5, адрес: '58% 22/38' },
        { пользователь: 'Фетинин Никита Геннадьевич', сумма: '533', статус: 5, адрес: '58% 22/38' },
        { пользователь: 'Фетинин Никита Геннадьевич', сумма: '533', статус: 5, адрес: '58% 22/38' },
        { пользователь: 'Фетинин Никита Геннадьевич', сумма: '533', статус: 5, адрес: '58% 22/38' },
        { пользователь: 'Фетинин Никита Геннадьевич', сумма: '533', статус: 5, адрес: '58% 22/38' },
        { пользователь: 'Фетинин Никита Геннадьевич', сумма: '533', статус: 5, адрес: '58% 22/38' },
        { пользователь: 'Фетинин Никита Геннадьевич', сумма: '533', статус: 5, адрес: '58% 22/38' },
        { пользователь: 'Фетинин Никита Геннадьевич', сумма: '533', статус: 5, адрес: '58% 22/38' },
        { пользователь: 'Фетинин Никита Геннадьевич', сумма: '533', статус: 5, адрес: '58% 22/38' },
        { пользователь: 'Фетинин Никита Геннадьевич', сумма: '533', статус: 5, адрес: '58% 22/38' },
        { пользователь: 'Фетинин Никита Геннадьевич', сумма: '533', статус: 5, адрес: '58% 22/38' },
        { пользователь: 'Фетинин Никита Геннадьевич', сумма: '533', статус: 5, адрес: '58% 22/38' },
        { пользователь: 'Фетинин Никита Геннадьевич', сумма: '533', статус: 5, адрес: '58% 22/38' },
        { пользователь: 'Фетинин Никита Геннадьевич', сумма: '533', статус: 5, адрес: '58% 22/38' },
        { пользователь: 'Фетинин Никита Геннадьевич', сумма: '533', статус: 5, адрес: '58% 22/38' },
        { пользователь: 'Фетинин Никита Геннадьевич', сумма: '533', статус: 5, адрес: '58% 22/38' },
        { пользователь: 'Фетинин Никита Геннадьевич', сумма: '533', статус: 5, адрес: '58% 22/38' },
        { пользователь: 'Фетинин Никита Геннадьевич', сумма: '533', статус: 5, адрес: '58% 22/38' },
        { пользователь: 'Фетинин Никита Геннадьевич', сумма: '533', статус: 5, адрес: '58% 22/38' },
        { пользователь: 'Фетинин Никита Геннадьевич', сумма: '533', статус: 5, адрес: '58% 22/38' },
        { пользователь: 'Фетинин Никита Геннадьевич', сумма: '533', статус: 5, адрес: '58% 22/38' },
        // Дополнительные данные...
    ];

    const columns = [
        { header: 'Транзакция', component: ({ data }) => <Row title={data} usdt={true} /> },
        { header: 'сумма', component: ({ data }) => <span>{data}</span> },
        { header: 'Суточный лимит', component: ({ data }) => <progress value={data} max="100000" /> },
        { header: 'адрес', component: ({ data }) => <span>{data}</span> },
    ];

    return (
        <div className='page'>
            {showCalendar && <CalendarModal onClose={handleCalendarClick} onApply={handleCalendarApply} />}
            <div className="buttonsContainer">
                <Search className='pagesSearch' />
                <Button
                    type={'white'}
                    style={{width: 'auto'}}
                    tb={showCalendar ? 9 : 10}
                    rl={showCalendar ? 15 : 16}
                    onClick={() => setShowTranStates(!showTranStates)}
                >
                    <img src={arrow} alt="Иконка вывода модалки" style={{transform: 'rotate(180deg)'}} />
                    <span style={{ color: '#2B2B2A', fontWeight: showCalendar ? '700' : '400' }}>{tranState}</span>
                    <div className='btnModal'>
                        {/* <span>Все</span>
                        <span>Сделка завершена</span> */}
                    </div>
                </Button>
                <Button
                    type={'white'}
                    style={{width: 'auto'}}
                    tb={showCalendar ? 9 : 10}
                    rl={showCalendar ? 15 : 16}
                    onClick={handleCalendarClick}
                >
                    <img src={arrow} alt="Иконка вывода модалки" />
                    <span style={{ color: '#2B2B2A', fontWeight: showCalendar ? '700' : '400' }}>
                        {sumFirst ? `${sumFirst},₽` : 'Сумма,₽'}
                    </span>
                </Button>
                <Button
                    type={'white'}
                    style={{width: 'auto'}}
                    tb={showCalendar ? 9 : 10}
                    rl={showCalendar ? 15 : 16}
                    onClick={handleCalendarClick}
                >
                    <img src={calendar} alt="Иконка календаря" />
                    <span style={{ color: '#2B2B2A', fontWeight: showCalendar ? '700' : '400' }}>{date}</span>
                </Button>
            </div>
            <Table
                title={'Сделки'}
                columns={columns}
                data={data}
                onRowClick={true}
                onEdit={true}
                onStop={true}
            />
        </div>
    )
}
