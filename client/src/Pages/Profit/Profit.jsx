import React, { useState, useEffect } from 'react'
import '../Pages.css'
// import { Link } from 'react-router-dom';
import { fetchApi } from '../../API/api';
import { formatNumber } from '../../utils/formatingDate';
import { formattedDate } from '../../utils/formatingDate';

import Table from '../../Components/Table/Table'
import Row from '../../Components/Table/Row'
// import Button from '../../Components/Buttons/Button'
import IconWrapper from '../../Components/IconWrapper/IconWrapper'
import Loader from '../../Components/Loader/Loader';

import waiting from '../../Assets/row/waiting.svg'
import accept from '../../Assets/row/accept.svg'
import cancel from '../../Assets/row/cancel.svg'
// import withdraw from '../../Assets/row/withdrawWhite.svg'
import message from '../../Assets/svg/messageQuestion.svg'
import card from '../../Assets/svg/cardAdd.svg'

import sber from '../../Assets/bank/sber.svg'
import c2c from '../../Assets/bank/c2c.svg'
import sbp from '../../Assets/bank/sbp.svg'
import tbank from '../../Assets/bank/tbank.svg'
import ecom from '../../Assets/bank/ecom.svg'
import qr from '../../Assets/bank/qr.svg'

export default function Profit({ windowWidth }) {
    const [currentPage, setCurrentPage] = useState(1);
    const [data, setData] = useState(null);
    const [loadingTable, setLoadingTable] = useState(false);
    const [loadingStat, setLoadingStat] = useState(false);
    // const [loadingBalance, setLoadingBalance] = useState(false);
    const [error, setError] = useState(null);
    const [showTooltip, setShowTooltip] = useState(false);
    const [statMerch, setStatMerch] = useState([])

    useEffect(() => {
        const fetchStatData = async () => {
            setLoadingStat(true);
            try {
                const result = await fetchApi({
                    url: `/api/v1/dashboard/conversion`,
                    // params: { page: currentPage },
                  });
                setStatMerch(result);
            } catch (error) {
                console.error('Ошибка при загрузке данных:', error);
                setError(error.message || 'Не удалось загрузить данные');
            } finally {
                setLoadingStat(false);
            }
        };
        fetchStatData();
    }, [])

    useEffect(() => {
        const fetchDynamicTransactionsData = async () => {
            setLoadingTable(true);
            try {
                const result = await fetchApi({
                    url: `/api/v1/dashboard/payment`,
                    params: { page: currentPage },
                  });
                setData(result);
            } catch (error) {
                console.error('Ошибка при загрузке данных:', error);
                setError(error.message || 'Не удалось загрузить данные');
            } finally {
                setLoadingTable(false);
            }
        };
        fetchDynamicTransactionsData();
    }, [currentPage]);

    const columns = [
        {
            header: 'Сделка',
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
                    title={formatNumber(data?.amount) + ' ' + data?.currency} 
                    text={(data?.amount_usdt).toFixed(2)} 
                    usdt={true} 
                />
            )
        },
        {
            header: 'Карта',
            component: ({ data }) => <Row title={data?.card ? (data.card?.phone_number ? data.card?.phone_number : data.card?.card_number) : 'Данные отсутствуют'} text={data.card?.bank} />, 
        },
    ];
    if (error) return <div>Ошибка: обратитесь в техподдержку {error}</div>;

    const handleImageClick = () => {
        setShowTooltip(true);
        setTimeout(() => {
            setShowTooltip(false);
        }, 3000);
    };

    const banksImg = {
        "SBP": sbp,
        "C2C": c2c,
        "SberPay": sber,
        "TPay": tbank,
        "Ecom": ecom,
        "NSPK": qr
    }

    return (
        localStorage.getItem('fp_type') === 'Merchant' ?
            <div className='page' style={{ flexDirection: windowWidth <= 1800 ? 'column' : 'row' }}>
                <div className='tableWithBtn' style={{height: (loadingTable || !data?.length < 1) ? 'auto' : 'fit-content', flex: '1'}} id='tableProfit'>
                    <Table
                        title={'Динамичные сделки'}
                        columns={columns}
                        data={data?.results || []}
                        totalCount={data?.count || 0}
                        itemsPerPage={10}
                        onRowClick={false}
                        onEdit={false}
                        onStop={false}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                        isLoading={loadingTable}
                    />
                    {/* <Loader isLoading={loadingTable} targetId='tableProfit' /> */}
                </div>
                <div className="merchantInfo">
                    <div className="merchantBalance" id='merchantBalance'>
                        <div className="merchantRow">
                            {showTooltip && (
                                <div className={`tooltip ${showTooltip ? 'tooltip-visible' : ''}`}>
                                    <p>Эскроу счет</p>
                                    <h3>{'0'} USDT</h3>
                                    <div className="triangle"></div>
                                    <div className="triangleGrey"></div>
                                </div>
                            )}
                            <h3>{'0.33'} USDT</h3>
                            <div className='nameRow'>
                                <p>Баланс депозита</p>
                                <IconWrapper height='23px' onClick={handleImageClick}>
                                    <img
                                        src={message}
                                        alt="Иконка баланса депозита"
                                        style={{ transform: 'translate(1px, 2px)' }}
                                    />
                                </IconWrapper>
                            </div>
                        </div>
                        <div className="space" style={{ height: windowWidth <= 470 ? '15px' : '30px' }}></div>
                        <div className="merchantRow">
                            <div className="cardAdd">
                                <img src={card} alt="Иконка карты с плюсом в прибыли" />
                                <h3>{1443}</h3>
                            </div>
                            <p>Колл-во сделок</p>
                        </div>
                        <div className="space" style={{ height: windowWidth <= 470 ? '10px' : '20px' }}></div>
                        <h4><span style={{ color: '#14CD36' }}>{999}</span> подтверждено / {333} в процессе / <span style={{ color: '#EB001B' }}>{111}</span> отклонено</h4>
                    </div>
                    {/* <Loader isLoading={loadingBalance} targetId='merchantBalance' /> */}
                    <div className='linkToStat' id='statProfit'>
                        <h2>Статистика</h2>
                        <div className="statisticsProfitPage">
                            <div className="statisticsProfitRow">
                                <p className='statTitle'>Метод</p>
                                <p className='statTitle'>Конверсия</p>
                            </div>
                            {Array.isArray(statMerch) ? (
                                statMerch.map((stat, index) => (
                                    <div className="statisticsProfitRow" key={index}>
                                        <div className="method">
                                            <img src={banksImg[stat.type]} alt="Иконка банка метода" />
                                            <p className="statTitle">{stat.type}</p>
                                        </div>
                                        <div className="statNumber">
                                            <p className="statTitle">{Math.floor((stat.successful_payments / stat.total_payments) * 100)}%</p>
                                            <p className="statProcent">{stat.successful_payments}/{stat.total_payments}</p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                'Данные отсутствуют'
                            )}
                        </div>
                    </div>
                    <Loader isLoading={loadingStat} targetId='statProfit' />
                </div>
            </div>
            :
            ''
    )
}
