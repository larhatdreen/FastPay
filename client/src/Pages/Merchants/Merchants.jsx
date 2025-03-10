import React from 'react'
import '../Pages.css'

import Table from '../../Components/Table/Table'
import Row from '../../Components/Table/Row'
import Button from '../../Components/Buttons/Button'

import calendar from '../../Assets/svg/calendarGrey.svg'

export default function Merchants() {
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
            <Button type={'white'} style={{width: 'fit-content'}} className={'forPages'} rl={16}>
                <img src={calendar} alt="Иконка календаря в финансах" />
                <p>Выберите даты</p>
            </Button>
            <Table
                title={'Мерчанты'}
                columns={columns}
                data={data}
                onRowClick={true}
                onEdit={true}
                onStop={true}
            />
        </div>
    )
}
