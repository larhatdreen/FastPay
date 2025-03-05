import React, { useState } from 'react';
import './Table.css';

import edit from '../../Assets/svg/edit.svg';
import resume from '../../Assets/svg/resume.svg';
import pause from '../../Assets/svg/pause.svg';

const Table = ({
    title,
    columns,
    data = [], // Data for the current page from the API
    totalCount = 0, // Total number of items across all pages
    onRowClick,
    itemsPerPage = 5, // Items per page (for calculating totalPages)
    onEdit,
    onStop,
    currentPage,
    setCurrentPage,
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
        const totalPagesToShow = 5;
        for (let i = 1; i <= Math.min(totalPagesToShow, totalPages); i++) {
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
        if (totalPages > totalPagesToShow + 1) {
            pageButtons.push(<span key="ellipsis" className="ellipsis">...</span>);
        }
        if (totalPages > totalPagesToShow) {
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
        <div className="universal-table">
            <h1>{title}</h1>
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
                    {data.map((row, rowIndex) => ( // Use data directly
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
                    ))}
                </tbody>
            </table>
            {totalPages > 1 && renderPagination()}
        </div>
    );
};

export default Table;