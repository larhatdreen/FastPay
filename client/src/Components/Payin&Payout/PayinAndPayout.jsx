import React from 'react';
import './PayinAndPayout.css';

const DataInfo = ({ type, data = {} }) => {
  const typeConfig = {
    all: {
      title: 'Всего сделок',
      render: () => (
        <>
          <div className="topData" style={{height: 'auto', gap: '20px', paddingBottom: '25px'}}>
            <p>{typeConfig.all.title}</p>
            <h3>{data.all || '0'}</h3>
          </div>
          <div className="botData" style={{gap: '16px'}}>
            <div className="botDataText">
              <p style={{lineHeight: '13px'}}>Завершены</p>
              <h3>{data.completed || '0'}</h3>
            </div>
            <div className="botDataText">
              <p style={{lineHeight: '13px'}}>В процессе</p>
              <h3>{data.inProgress || '0'}</h3>
            </div>
          </div>
        </>
      )
    },
    accept: {
      title: 'Подтвержденные',
      render: () => (
        <div className="topData">
          <p>{typeConfig.accept.title}</p>
          <div className="botData">
            <h3>{data.accept || '0'} ₽</h3>
            <p>{data.usdt || '0'} USDT</p>
          </div>
        </div>
      )
    },
    profit: {
      title: 'Прибыль',
      render: () => (
        <div className="topData">
          <p>{typeConfig.profit.title}</p>
          <h3>{data.profit || '0'} USDT</h3>
        </div>
      )
    },
    active_devices: {
      title: 'Активные устройства',
      render: () => (
        <div className="smallData">
          <p>{typeConfig.active_devices.title}</p>
          <h3>{data.activeDevices || '0'}</h3>
        </div>
      )
    },
    active_req: {
      title: 'Активные реквизиты',
      render: () => (
        <div className="smallData">
          <p>{typeConfig.active_req.title}</p>
          <h3>{data.activeReq || '0'}</h3>
        </div>
      )
    },
    time: {
      title: 'Среднее время обработки спора',
      render: () => (
        <div className="smallData">
          <p>{typeConfig.time.title}</p>
          <h3>{data.time || '00:00:00'}</h3>
        </div>
      )
    },
    sum: {
      title: 'Сумма отклоненных заявок',
      render: () => (
        <div className="smallData">
          <p>{typeConfig.sum.title}</p>
          <h3>{data.sum || '0'} USDT</h3>
        </div>
      )
    },
    conversion: {
      title: 'Конверсия выплат трейдера',
      render: () => (
        <div className="smallData">
          <p>{typeConfig.conversion.title}</p>
          <h3>{data.conversion || '0'}%</h3>
        </div>
      )
    }
  };

  const config = typeConfig[type] || {
    title: 'Неизвестный тип',
    render: () => (
      <div className="smallData">
        <p>Неизвестный тип</p>
        <h3>0</h3>
      </div>
    )
  };

  return <div className="dataContainer">{config.render()}</div>;
};

export default function PayinAndPayout({ name, data }) {
  return (
    <div className="ppContainer">
      <h1 className='ppTitle'>{name}</h1>
      <div className='dataCollection'>
        <div className="topDataCollection">
          <DataInfo type="all" data={data} />
          <DataInfo type="accept" data={data} />
          <DataInfo type="profit" data={data} />
        </div>
        <div className="botDataCollection">
          <div className="leftSideDataCollection">
            <DataInfo type={name === 'Payout' ? 'sum' : 'active_devices'} data={data} />
            {name === 'Payin' ? <DataInfo type='active_req' data={data} /> : null}
          </div>
          <DataInfo type={name === 'Payout' ? 'conversion' : 'time'} data={data} />
        </div>
      </div>
    </div>
  );
}