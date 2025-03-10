import React, { useState, useEffect } from 'react'
import '../Pages.css'
import { fetchApi } from '../../API/api'
import { formattedDate } from '../../utils/formatingDate'

import Table from '../../Components/Table/Table'
import Row from '../../Components/Table/Row'
// import Button from '../../Components/Buttons/Button'
import Search from '../../Components/Search/Search'
import Filter from '../../Components/Filter/Filter'
import Loader from '../../Components/Loader/Loader'

import device from '../../Assets/row/device.svg'
import battery from '../../Assets/row/battery.svg'

export default function Devices() {
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
                    url: `/api/v1/dashboard/device`,
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
            header: 'Устройство',
            component: ({ data }) => (
                <Row
                    gap_out={20}
                    icon={device}
                    title={data.name}
                    text={data.token}
                />
            ),
        },
        {
            header: 'Статус',
            component: ({ data }) => (
                <Row
                    title={data.condition ? 'Активно' : data.battery !== 0 ? 'Не активно' : 'Не подключено'}
                    status={data.condition ? 'Активно' : data.battery !== 0 ? 'Не активно' : 'Не подключено'}
                />
            ),
        },
        {
            header: 'Последняя активность',
            component: ({ data }) => (
                <Row
                    title={data.date_update ? formattedDate(data.date_update) : 'Не установлено'}
                />
            )
        },
        {
            header: 'Реквизиты',
            component: ({ data }) => (
                <Row
                    title={data.requisites}
                />
            )
        },
        {
            header: 'Состояние',
            component: ({ data }) => (
                <Row
                    title={data.condition ? 'Онлайн' : 'Офлайн'}
                    text={data.battery ? 
                        <span style={{display: 'flex', gap: '5px'}}>
                            <img src={battery} alt="иконка батареи" />
                            <span>{data.battery}%</span>
                        </span>
                        : ''
                    }
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
                <Search className={'pagesSearch'} placeholder={'Поиск по номеру карты'} />
                <Filter filters={filters} onFilterClick={handleFilterClick} activeFilter={activeFilter} />

            </div>
            <div className="tableWithBtn" id='tableDevices'>
                <Table
                    title={'Устройства'}
                    columns={columns}
                    data={data?.results || []}
                    totalCount={data?.count || 0}
                    itemsPerPage={10}
                    onRowClick={true}
                    onEdit={true}
                    onStop={false}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    isLoading={loading}
                />
                <Loader isLoading={loading} targetId='tableDevices' />
            </div>
        </div>
    )
}
