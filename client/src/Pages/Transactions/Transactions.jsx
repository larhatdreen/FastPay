import React, { useState, useRef, useEffect } from 'react'
import '../Pages.css'
import { fetchApi } from '../../API/api'
import { formattedDate } from '../../utils/formatingDate'

import Table from '../../Components/Table/Table'
import Row from '../../Components/Table/Row'
import CalendarModal from '../../Components/Modals/Calendar/CalendarModal'
import Button from '../../Components/Buttons/Button'
import Search from '../../Components/Search/Search'
import Loader from '../../Components/Loader/Loader'

import calendar from '../../Assets/svg/calendarGrey.svg'
import arrow from '../../Assets/svg/arrowChange.svg'
import waiting from '../../Assets/row/waiting.svg'
import accept from '../../Assets/row/cardPlus.svg'
import cancel from '../../Assets/row/cardRemove.svg'

export default function Transactions() {
    const [tranState, setTranState] = useState('Все')
    const [showTranStates, setShowTranStates] = useState(true)
    const [sumFirst, setSumFirst] = useState(null)
    const [sumSecond, setSumSecond] = useState(null)
    const [showCalendar, setShowCalendar] = useState(false);
    const [date, setDate] = useState('Все время')
    const [currentPage, setCurrentPage] = useState(1);
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);

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

    useEffect(() => {
        const fetchDisputeData = async () => {
            setLoading(true);
            try {
                const result = await fetchApi({
                    url: `/api/v1/dashboard/payment`,
                    params: { page: currentPage },
                });
                setData(result);
            } catch (error) {
                console.error('Ошибка при загрузке данных:', error);
                // setError(error.message || 'Не удалось загрузить данные');
            } finally {
                setLoading(false);
            }
        };
        fetchDisputeData();
    }, [currentPage]);

    const columns = [
        {
            header: 'Статус спора',
            component: ({ data }) => (
                <Row
                    flex_out={'flex'}
                    gap_out={15}
                    icon={data.status === 'CL' ? cancel : data.status === 'AC' ? accept : waiting}
                    title={data.status === 'CL' ? 'Сделка отклонена' : data.status === 'AC' ? 'Сделка завершена' : 'Создана новая сделка'}
                    text={formattedDate(data.create)}
                />
            ),
        },
        {
            header: 'Сумма',
            component: ({ data }) => (
                <Row
                    usdt={true}
                    currency={data.currency}
                    title={data?.amount ?? 'N/A'}
                    text={data?.amount_usdt ?? 'N/A'}
                />
            ),
        },
        {
            header: 'Карта',
            component: ({ data }) => (
                <Row
                    title={data.card.phone_number ? data.card.phone_number : data.card.card_number}
                    text={`${data.card.bank}${data?.type ? ` - ${data.type}` : ''}`}
                />
            )
        },
        {
            header: 'Устройство',
            component: ({ data }) => (
                <Row
                    title={data.device.name}
                    text={data.device.token}
                />
            )
        },
    ];

    return (
        <div className='page'>
            {showCalendar && <CalendarModal onClose={handleCalendarClick} onApply={handleCalendarApply} />}
            <div className="buttonsContainer">
                <Search className='pagesSearch' />
                <Button
                    type={'white'}
                    style={{ width: 'auto' }}
                    tb={showCalendar ? 9 : 10}
                    rl={showCalendar ? 15 : 16}
                    onClick={() => setShowTranStates(!showTranStates)}
                >
                    <img src={arrow} alt="Иконка вывода модалки" style={{ transform: 'rotate(180deg)' }} />
                    <span style={{ color: '#2B2B2A', fontWeight: showCalendar ? '700' : '400' }}>{tranState}</span>
                    <div className='btnModal'>
                        {/* <span>Все</span>
                        <span>Сделка завершена</span> */}
                    </div>
                </Button>
                <Button
                    type={'white'}
                    style={{ width: 'auto' }}
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
                    style={{ width: 'auto' }}
                    tb={showCalendar ? 9 : 10}
                    rl={showCalendar ? 15 : 16}
                    onClick={handleCalendarClick}
                >
                    <img src={calendar} alt="Иконка календаря" />
                    <span style={{ color: '#2B2B2A', fontWeight: showCalendar ? '700' : '400' }}>{date}</span>
                </Button>
            </div>
            <div className="tableTransactions" id='tableTran'>
                <Table
                    title={'Сделки'}
                    columns={columns}
                    data={data?.results || []}
                    totalCount={data?.count || 0}
                    itemsPerPage={10}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    isLoading={loading}
                    onRowClick={true}
                    onEdit={false}
                    onStop={false}
                />
                <Loader isLoading={loading} targetId='tableTran' />
            </div>
        </div>
    )
}
