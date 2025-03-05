import React, { useEffect, useState } from 'react';
import '../Pages.css';
import { Link } from 'react-router-dom';
import { financeData } from '../../API/api';

import Table from '../../Components/Table/Table';
import Row from '../../Components/Table/Row';
import Button from '../../Components/Buttons/Button';

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
        const fetchFinanceData = async () => {
            setLoading(true);
            try {
                const result = await financeData({ page: currentPage, setIsLoading: setLoading });
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

    const formattedDate = (date) => new Date(date).toLocaleString('ru-RU', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric'
      });

    const columns = [
        {
            header: 'Транзакция',
            component: ({ data }) => (
                <Row 
                    flex_out={'flex'} 
                    gap_out={15}
                    icon={data.type === 'deposit' ? topUp : withdraw} 
                    title={data.type} 
                    text={formattedDate(data.date)} 
                />
            ),
        },
        {
            header: 'Сумма',
            component: ({ data }) => <Row title={data.amount} />,
        },
        {
            header: 'Статус',
            component: ({ data }) => <Row title="Завершен" />, // Предполагаем статичный статус
        },
        {
            header: 'Адрес',
            component: ({ data }) => <Link style={{color: 'black', textDecoration: 'none'}} to={`https://tronscan.org/#/transaction/${data.tx_id}`}>
                                        <Row flex_out='flex-reverse' gap_out={17} icon={transfer} title='Trancfer' />
                                    </Link>,
        },
    ];

    if (loading) return <div>Загрузка...</div>;
    if (error) return <div>Ошибка: {error}</div>;

    return (
        <div className="page">
            <Button type={'white'} style={{ width: 'fit-content' }} className={'forPages'} rl={16}>
                <img src={calendar} alt="Иконка календаря в финансах" />
                <p>Выберите даты</p>
            </Button>
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
            />
        </div>
    );
}