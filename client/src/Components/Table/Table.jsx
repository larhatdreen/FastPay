import React, { useState } from 'react';
import './Table.css';

import edit from '../../Assets/svg/edit.svg'
import resume from '../../Assets/svg/resume.svg'
import pause from '../../Assets/svg/pause.svg'

const Table = ({
  title, // Заголовок таблицы
  columns, // Массив { header, component }
  data, // Массив объектов данных строк
  onRowClick, // Функция для обработки навигации по строке
  itemsPerPage = 5, // Количество элементов на странице по умолчанию
  onEdit, // Функция для перехода на страницу редактирования
  onStop, // Функция для действия остановки
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [stopRequisite, setStopRequisite] = useState(false)

  // Расчет пагинации
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = data.slice(startIndex, endIndex);

  // Обработка смены страницы
  const handlePageChange = (page) => {
    setCurrentPage(page);
    // Здесь можно инициировать загрузку данных для новой страницы, если нужно
  };

  // Отрисовка кнопок пагинации
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
    // Добавляем многоточие, если страниц больше 6
    if (totalPages > totalPagesToShow + 1) {
      pageButtons.push(<span key="ellipsis" className='ellipsis'>...</span>);
    }
    // Показываем последнюю страницу, если она отличается от 5-й
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
          className='pageSwitch'
        >
          Назад
        </button>
        <div className="pageNumbers">
          {pageButtons}
        </div>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className='pageSwitch'
        >
          Вперед
        </button>
      </div>
    );
  };

  const handleRowClick = (row) => {
    console.log('Переход к:', row);
    // Логика навигации
  };
  const handleEdit = (row) => {
    console.log('Редактирование:', row);
    // Логика перехода на страницу редактирования
  };

  // const handleStop = (row) => {
  //   console.log('Остановлено:', row);
  //   // Логика остановки
  // };

  return (
    <div className="universal-table">
      <h1>{title}</h1>
      <table>
        <thead>
          <tr>
            {columns.map((col, index) => (
              <th key={index}>{col.header}</th>
            ))}
            {(onEdit || onStop) && <th></th>}
          </tr>
        </thead>
        <tbody className='tableBody'>
          {paginatedData.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              onClick={() => onRowClick && handleRowClick(row)}
              className="row clickable-row"
            >
              {columns.map((col, colIndex) => (
                <td key={colIndex}>
                  {col.component({ data: row[col.header.toLowerCase()] })}
                </td>
              ))}
              {(onEdit || onStop) && (
                <td className="actions">
                  {onEdit && (
                    <img
                      src={edit}
                      alt='Иконка редактирования данных'
                      onClick={(e) => {
                        e.stopPropagation(); // Предотвращаем срабатывание клика по строке
                        handleEdit(row);
                      }}
                    />
                  )}
                  {onStop && (
                    <img
                      src={stopRequisite ? pause : resume}
                      alt='Иконка возобновления или паузы работы реквизитов'
                      onClick={(e) => {
                        e.stopPropagation();
                        setStopRequisite(!stopRequisite)
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