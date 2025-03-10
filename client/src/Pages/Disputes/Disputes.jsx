import React, { useState, useEffect } from 'react'
import '../Pages.css'
import { fetchApi } from '../../API/api'
import { formattedDate } from '../../utils/formatingDate'
import { formatNumber } from '../../utils/formatingDate'

import Table from '../../Components/Table/Table'
import Row from '../../Components/Table/Row'
// import Button from '../../Components/Buttons/Button'
// import Search from '../../Components/Search/Search'
import Filter from '../../Components/Filter/Filter'
// import Loader from '../../Components/Loader/Loader'

// import calendar from '../../Assets/svg/calendarGrey.svg'
import waiting from '../../Assets/row/waiting.svg'
import accept from '../../Assets/row/cardPlus.svg'
import cancel from '../../Assets/row/cardRemove.svg'

export default function Disputes({ windowWidth }) {
    const filters = ["Все", "Открытый спор", "Спор принят", "Спор отклонен"];
    const [activeFilter, setActiveFilter] = useState("Все");
    const [currentPage, setCurrentPage] = useState(1);
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchDisputeData = async () => {
            setLoading(true);
            try {
                const result = await fetchApi({
                    url: `/api/v1/dashboard/dispute`,
                    params: { page: currentPage, filter: activeFilter}
                });
                setData(result);
            } catch (error) {
                console.error('Ошибка при загрузке данных:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchDisputeData();
    }, [currentPage, activeFilter]);

    const columns = [
        {
            header: 'Статус спора',
            component: ({ data }) => (
                <Row
                    flex_out={'flex'}
                    gap_out={15}
                    icon={!data.condition ? waiting : data.reason === null ? accept : cancel}
                    title={!data.condition ? 'Открытый спор' : data.reason === null ? 'Спор принят' : 'Спор отклонен'}
                    text={formattedDate(data.create)}
                />
            ),
        },
        {
            header: 'Сумма',
            component: ({ data }) => ( 
                <Row 
                    usdt={true}
                    title={data?.payment?.amount ? formatNumber(data.payment.amount) + ' ' + data.payment.currency : 'N/A'}
                    text={(data?.payment?.amount_usdt).toFixed(2) ?? 'N/A'}
                />
            ),
        },
        {
            header: 'Карта',
            component: ({ data }) => (
                <Row 
                    title={data.card.phone_number ? data.card.phone_number : data.card.payment_number} 
                    text={data.card.bank}
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

    const handleFilterClick = (filter) => {
        setActiveFilter(filter);
        console.log(`Выбран фильтр: ${filter}`);
    };

    return (
        <div className='page'>
            <div className="buttonsContainer">
                {/* <Search className={'pagesSearch'} placeholder={'Поиск по номеру карты'} /> */}
                <Filter filters={filters} onFilterClick={handleFilterClick} activeFilter={activeFilter} />
                {/* <Button type={'white'} style={{ width: 'fit-content' }} className={'forPages'} rl={16}>
                    <img src={calendar} alt="Иконка календаря в финансах" />
                    <p>Выберите даты</p>
                </Button> */}
            </div>
            <div className="tableWithBtn" id='tableDispute'>
                <Table
                    title={'Споры'}
                    columns={columns}
                    data={data?.results || []}
                    totalCount={data?.count || 0}
                    onRowClick={localStorage.getItem('fp_type') === 'Merchant' ? false : true}
                    onEdit={false}
                    onStop={false}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    isLoading={loading}
                />
                {/* <Loader isLoading={loading} targetId='tableDispute' /> */}
            </div>
        </div>
    )
}
