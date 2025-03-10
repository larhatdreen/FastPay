import React, { useState } from 'react';
import './Table.css';

import edit from '../../Assets/svg/edit.svg';
import resume from '../../Assets/svg/resume.svg';
import pause from '../../Assets/svg/pause.svg';

const Table = ({
    title,
    columns,
    data = [],
    totalCount = 0,
    onRowClick,
    itemsPerPage = 5,
    onEdit,
    onStop,
    currentPage,
    setCurrentPage,
    isLoading,
    className
}) => {
    const [stopRequisite, setStopRequisite] = useState(false);

    const totalPages = Math.ceil(totalCount / itemsPerPage);

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const renderPagination = () => {
        const pageButtons = [];
        const pagesAround = 2;

        pageButtons.push(
            <button
                key={1}
                onClick={() => handlePageChange(1)}
                className={`paginationBtn ${currentPage === 1 ? 'active' : ''}`}
            >
                1
            </button>
        );

        let startPage = Math.max(2, currentPage - pagesAround);
        let endPage = Math.min(totalPages - 1, currentPage + pagesAround);

        if (startPage > 2) {
            pageButtons.push(<span key="ellipsis-start" className="ellipsis">...</span>);
        }

        for (let i = startPage; i <= endPage; i++) {
            pageButtons.push(
                <button
                    key={i}
                    onClick={() => handlePageChange(i)}
                    className={`paginationBtn ${currentPage === i ? 'active' : ''}`}
                >
                    {i}
                </button>
            );
        }

        if (endPage < totalPages - 1) {
            pageButtons.push(<span key="ellipsis-end" className="ellipsis">...</span>);
        }

        if (totalPages > 1) {
            pageButtons.push(
                <button
                    key={totalPages}
                    onClick={() => handlePageChange(totalPages)}
                    className={`paginationBtn ${currentPage === totalPages ? 'active' : ''}`}
                >
                    {totalPages}
                </button>
            );
        }

        return (
            <div className="pagination">
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="pageSwitch"
                >
                    Назад
                </button>
                <div className="pageNumbers">{pageButtons}</div>
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="pageSwitch"
                >
                    Вперед
                </button>
            </div>
        );
    };

    const handleRowClick = (row) => {
        console.log('Переход к:', row);
    };

    const handleEdit = (row) => {
        console.log('Редактирование:', row);
    };

    return (
        <div className={`universal-table ${className}`}>
            {!className && <h1>{title}</h1>}
            <div style={{overflow: 'auto', paddingBottom: '25px'}}>
            <table style={{ '--columns-count': columns.length }}>
                <thead>
                    <tr>
                        {columns.map((col, index) => (
                            <th key={index}>{col.header}</th>
                        ))}
                        {(onEdit || onStop) && <th></th>}
                    </tr>
                </thead>
                <tbody className="tableBody">
                    {data.length < 1 ? (
                        <tr>
                            <td colSpan={columns.length + (onEdit || onStop ? 1 : 0)}>
                                <div className="nullResult">{!isLoading && 'Данные отсутствуют'}</div>
                            </td>
                        </tr>
                    ) : (
                        data.map((row, rowIndex) => (
                            <tr
                                key={rowIndex}
                                onClick={() => onRowClick && handleRowClick(row)}
                                className={`row ${onRowClick ? 'clickable-row' : ''}`}
                            >
                                {columns.map((col, colIndex) => (
                                    <td key={colIndex}>{col.component({ data: row })}</td>
                                ))}
                                {(onEdit || onStop) && (
                                    <td className="actions">
                                        {onEdit && (
                                            <img
                                                src={edit}
                                                alt="Иконка редактирования данных"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleEdit(row);
                                                }}
                                            />
                                        )}
                                        {onStop && (
                                            <img
                                                src={stopRequisite ? pause : resume}
                                                alt="Иконка возобновления или паузы работы реквизитов"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setStopRequisite(!stopRequisite);
                                                }}
                                            />
                                        )}
                                    </td>
                                )}
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
            </div>
            {totalPages > 1 && renderPagination()}
        </div>
    );
};

export default Table;