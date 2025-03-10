import React, { useState, useEffect } from 'react'
import '../Pages.css'
import { fetchApi } from '../../API/api'
import { formatNumber } from '../../utils/formatingDate'

import Table from '../../Components/Table/Table'
import Row from '../../Components/Table/Row'
import Button from '../../Components/Buttons/Button'
import Loader from '../../Components/Loader/Loader'
import Search from '../../Components/Search/Search'
import Filter from '../../Components/Filter/Filter'


export default function Details() {
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
                    url: `/api/v1/dashboard/requisite`,
                    params: { page: currentPage },
                });
                setData(result);
            } catch (error) {
                console.error('Ошибка при загрузке данных:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchDisputeData();
    }, [currentPage]);

    const columns = [
            {
                header: 'Пользователь',
                component: ({ data }) => (
                    <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                        <div style={{
                                width: '7px', 
                                height: '7px', 
                                borderRadius: '100px', 
                                background: data.condition ? '#14CD36' : '#EB001B'
                            }}
                        > 
                        </div>
                        <Row
                            title={data.full_name}
                        />
                    </div>
                ),
            },
            {
                header: 'Банк',
                component: ({ data }) => ( 
                    <Row 
                        gap_out={6}
                        icon={data?.bank_logo}
                        title={data?.bank}
                    />
                ),
            },
            {
                header: 'Суточный лимит',
                component: ({ data }) => (
                    <Row 
                        title={
                            data?.day_volume !== undefined && data?.day_limit !== undefined 
                                ? `${formatNumber(data.day_volume)} / ${formatNumber(data.day_limit)}` 
                                : 'N/A'
                        }
                        limit={true}
                        limit_have={data.day_volume}
                        limit_max={data.day_limit}
                        flex_in={'flex'}
                        gap_in={15}
                    />
                )
            },
            {
                header: 'Конверсия',
                component: ({ data }) => (
                    <Row 
                        title={Math.floor((data.approve_deals / data.deals) * 100)+'%'}
                        text={data.approve_deals + '/' + data.deals}
                        flex_in={'flex'}
                        gap_in={10}
                        conversion={true}
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
                <Search className={'pagesSearch'} placeholder={'Поиск'} />
                <Filter filters={filters} onFilterClick={handleFilterClick} activeFilter={activeFilter} />
            </div>
            <div className="tableDetails" id='tableDetails'>
                <Table
                    title={'Реквизиты'}
                    columns={columns}
                    data={data?.results || []}
                    totalCount={data?.count || 0}
                    itemsPerPage={10}
                    onRowClick={true}
                    onEdit={false}
                    onStop={false}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    isLoading={loading}
                />
                <Loader isLoading={loading} targetId='tableDetails' />
            </div>
        </div>
    )
}
