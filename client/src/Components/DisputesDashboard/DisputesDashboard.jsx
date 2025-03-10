import React, { useState, useEffect } from 'react'
import { fetchApi } from '../../API/api'
import './DisputesDashboard.css'

import Loader from '../Loader/Loader'
import Filter from '../Filter/Filter'
import Table from '../Table/Table'
import Row from '../Table/Row'

export default function DisputesDashboard() {
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
              header: 'Сделка',
              component: ({ data }) => (
                  <Row
                      title={''}
                  />
              ),
          },
          {
              header: 'Сумма',
              component: ({ data }) => <Row />,
          },
          {
              header: 'Карта',
              component: ({ data }) => <Row />, 
          },
      ];

  const handleFilterClick = (filter) => {
    setActiveFilter(filter);
    console.log(`Выбран фильтр: ${filter}`);
  };
  return (
    <div className='disputesDashboard'>
      <h1 className='titleDisputes'>Споры</h1>
      <Filter filters={filters} onFilterClick={handleFilterClick} activeFilter={activeFilter} />
      <div className="tableSmall" style={{flex: (loading || !data?.length < 1) ? '0' : '1'}} id='tableDisputeSmall'>
            <Table
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
                className={'smallDispute'}
            />
            <Loader isLoading={loading} targetId='tableDisputeSmall' />
            </div>
    </div>
  )
}
