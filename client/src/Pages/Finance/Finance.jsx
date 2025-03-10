import React, { useEffect, useState } from 'react';
import '../Pages.css';
import { Link } from 'react-router-dom';
import { fetchApi } from '../../API/api';
import { formattedDate } from '../../utils/formatingDate'

import Table from '../../Components/Table/Table';
import Row from '../../Components/Table/Row';
import Button from '../../Components/Buttons/Button';
import Loader from '../../Components/Loader/Loader';

import withdraw from '../../Assets/svg/withdrawGrey.svg'
import topUp from '../../Assets/svg/topUpGrey.svg'
import calendar from '../../Assets/svg/calendarGrey.svg';
import transfer from '../../Assets/svg/transfer.svg'

export default function Finance() {
    const [currentPage, setCurrentPage] = useState(1);
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        console.log('useEffect triggered, currentPage:', currentPage);
        const fetchFinanceData = async () => {
            setLoading(true);
            try {
                const result = await fetchApi({
                    url: `/api/v1/dashboard/finance`,
                    params: { page: currentPage },
                });
                setData(result);
            } catch (error) {
                console.error('Ошибка при загрузке данных:', error);
                setError(error.message || 'Не удалось загрузить данные');
            } finally {
                setLoading(false);
            }
        };
        fetchFinanceData();
    }, [currentPage]);

    const columns = [
        {
            header: 'Транзакция',
            component: ({ data }) => (
                <Row
                    flex_out={'flex'}
                    gap_out={15}
                    icon={data.type === 'deposit' ? topUp : withdraw}
                    title={data.type === 'deposit' ? 'Пополнение' : 'Вывод прибыли'}
                    text={formattedDate(data.date)}
                />
            ),
        },
        {
            header: 'Сумма',
            component: ({ data }) => <Row title={data.amount + ' ' + 'USDT'} />,
        },
        {
            header: 'Статус',
            component: ({ data }) => <Row title="Завершен" />, // Статичный статус
        },
        {
            header: 'Адрес',
            component: ({ data }) => <Link style={{ color: 'black', textDecoration: 'none' }} to={`https://tronscan.org/#/transaction/${data.tx_id}`}>
                <Row flex_out='flex-reverse' gap_out={17} icon={transfer} title='Trancfer' />
            </Link>,
        },
    ];

    if (error) return <div>Ошибка: {error}<br />Обратитесь в техподдержку</div>;

    return (
        <div className="page">
            <Button type={'white'} style={{ width: 'fit-content' }} className={'forPages'} rl={16}>
                <img src={calendar} alt="Иконка календаря в финансах" />
                <p>Выберите даты</p>
            </Button>
            <div className='tableWithBtn' id="financeTable">
                <Table
                    title={'Финансы'}
                    columns={columns}
                    data={data?.results || []}
                    totalCount={data?.count || 0}
                    itemsPerPage={10}
                    onRowClick={false}
                    onEdit={false}
                    onStop={false}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    isLoading={loading}
                />
            </div>
            <Loader isLoading={loading} targetId='financeTable' />
        </div>
    );
}