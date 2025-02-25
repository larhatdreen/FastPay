import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './CalendarModal.css';
import Button from '../../Buttons/Button';
import left from '../../../Assets/svg/switchMonthLeft.svg';
import right from '../../../Assets/svg/switchMonthRight.svg';

const CalendarModal = ({ onClose, onApply }) => {
    const [firstMonth, setFirstMonth] = useState(new Date());
    const [secondMonth, setSecondMonth] = useState(new Date(firstMonth.getFullYear(), firstMonth.getMonth() + 1));
    const [selectedRange, setSelectedRange] = useState(null);
    const [hoveredDay, setHoveredDay] = useState(null);

    // Функция для получения дней в месяце
    const getDaysInMonth = (date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        return new Date(year, month + 1, 0).getDate();
    };

    // Функция для получения первого дня месяца (0 = Понедельник, 6 = Воскресенье)
    const getFirstDayOfMonth = (date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        return new Date(year, month, 1).getDay() === 0 ? 6 : new Date(year, month, 1).getDay() - 1;
    };

    // Генерация дней для месяца
    const generateDays = (date) => {
        const daysInMonth = getDaysInMonth(date);
        const firstDay = getFirstDayOfMonth(date);
        const days = [];
        for (let i = 0; i < firstDay; i++) {
            days.push(null); // Пустые ячейки для начала месяца
        }
        for (let i = 1; i <= daysInMonth; i++) {
            days.push(new Date(date.getFullYear(), date.getMonth(), i));
        }
        return days;
    };

    // Переключение месяцев (с ограничениями)
    const switchMonth = (direction, monthSetter, otherMonth) => {
        monthSetter((prev) => {
            const newDate = new Date(prev);
            newDate.setMonth(prev.getMonth() + direction);

            // Ограничение для первого месяца (не больше второго)
            if (monthSetter === setFirstMonth) {
                if (newDate > secondMonth) {
                    return prev; // Не даём превысить второй месяц
                }
            }
            // Ограничение для второго месяца (не меньше первого)
            if (monthSetter === setSecondMonth) {
                if (newDate < firstMonth) {
                    return prev; // Не даём опуститься ниже первого месяца
                }
            }
            return newDate;
        });
    };

    // Обработчик выбора даты (для диапазона из двух дней)
    const handleDayClick = (day) => {
        if (!day) return; // Пропускаем пустые ячейки
        if (!selectedRange) {
            setSelectedRange({ start: day, end: null }); // Начинаем диапазон
        } else if (!selectedRange.end) {
            // Если уже выбрано начало, выбираем конец
            const start = selectedRange.start;
            const end = day;
            if (end < start) {
                setSelectedRange({ start: end, end: start }); // Если конец раньше начала, меняем местами
            } else {
                setSelectedRange({ start, end });
                // Автоматически применяем соответствующий кейс, если выбрана одна дата или диапазон
                const now = new Date();
                const isToday = start.toDateString() === now.toDateString() && !end;
                const isThisWeek = start >= new Date(now.setDate(now.getDate() - now.getDay() + (now.getDay() === 0 ? -6 : 1))) &&
                    (end ? end <= new Date(now.setDate(now.getDate() - now.getDay() + 7)) : true);
                // const isThisMonth = start.getMonth() === now.getMonth() && start.getFullYear() === now.getFullYear() &&
                //                    (end ? end.getMonth() === now.getMonth() && end.getFullYear() === now.getFullYear() : true);
                // const isThisYear = start.getFullYear() === now.getFullYear() &&
                //                   (end ? end.getFullYear() === now.getFullYear() : true);

                if (isToday) handleQuickSelect('today');
                else if (isThisWeek) handleQuickSelect('thisWeek');
                // else if (isThisMonth) handleQuickSelect('thisMonth');
                // else if (isThisYear) handleQuickSelect('thisYear');
            }
        } else {
            // Сбрасываем выбор и начинаем заново
            setSelectedRange({ start: day, end: null });
        }
    };

    // Обработчик наведения мыши на день (для стилизации диапазона)
    const handleDayHover = (day) => {
        if (selectedRange && !selectedRange.end && selectedRange.start && day) {
            setHoveredDay(day);
        }
    };

    // Быстрый выбор диапазонов
    const handleQuickSelect = (rangeType) => {
        const now = new Date();
        let start, end;
        switch (rangeType) {
            case 'today':
                start = new Date(now.setHours(0, 0, 0, 0));
                end = new Date(now.setHours(23, 59, 59, 999));
                break;
            case 'thisWeek':
                const startOfWeek = new Date(now);
                startOfWeek.setDate(now.getDate() - now.getDay() + (now.getDay() === 0 ? -6 : 1));
                startOfWeek.setHours(0, 0, 0, 0);
                const endOfWeek = new Date(startOfWeek);
                endOfWeek.setDate(startOfWeek.getDate() + 6);
                endOfWeek.setHours(23, 59, 59, 999);
                start = startOfWeek;
                end = endOfWeek;
                break;
            case 'thisMonth':
                start = new Date(now.getFullYear(), now.getMonth(), 1);
                start.setHours(0, 0, 0, 0);
                end = new Date(now.getFullYear(), now.getMonth() + 1, 0);
                end.setHours(23, 59, 59, 999);
                break;
            case 'thisYear':
                start = new Date(now.getFullYear(), 0, 1);
                start.setHours(0, 0, 0, 0);
                end = new Date(now.getFullYear(), 11, 31);
                end.setHours(23, 59, 59, 999);
                break;
            case 'allTime':
                start = new Date(1970, 0, 1);
                end = new Date();
                break;
            default:
                return;
        }
        setSelectedRange({ start, end });
    };

    // Применение выбранных дат
    const handleApply = () => {
        if (selectedRange) {
            console.log('Применены даты:', selectedRange);
            onApply(selectedRange)
        }
        onClose();
    };

    // Форматирование даты для отображения
    const formatDate = (date) => date ? date.toLocaleDateString('ru-RU') : '';

    // Проверка, выбран ли день
    const isDaySelected = (day) => {
        if (!day || !selectedRange) return false;
        return (selectedRange.start && day.toDateString() === selectedRange.start.toDateString()) ||
            (selectedRange.end && day.toDateString() === selectedRange.end.toDateString());
    };

    // Проверка, входит ли день в диапазон (включая временный диапазон с наведением)
    const isDayInRange = (day) => {
        if (!day || !selectedRange || !selectedRange.start) return false;
        const start = selectedRange.start;
        const end = selectedRange.end || hoveredDay;
        if (!end) return false;
        if (!day) return false; // Исключаем пустые дни из диапазона
        if (day.toDateString() === start.toDateString()) return 'firstDay';
        if (day.toDateString() === end.toDateString()) return 'lastDay';
        return day >= start && day <= end ? 'range' : false;
    };

    return ReactDOM.createPortal(
        <div className="calendar-modal-overlay" onClick={onClose}>
            <div className="calendar-modal" onClick={(e) => e.stopPropagation()}>
                <div className="calendar-header">
                    <button className="range-button" onClick={() => handleQuickSelect('today')}>Сегодня</button>
                    <button className="range-button" onClick={() => handleQuickSelect('thisWeek')}>Эта неделя</button>
                    <button className="range-button" onClick={() => handleQuickSelect('thisMonth')}>Этот месяц</button>
                    <button className="range-button" onClick={() => handleQuickSelect('thisYear')}>Этот год</button>
                    <button className="range-button" onClick={() => handleQuickSelect('allTime')}>Все время</button>
                </div>
                <div className="calendar-body">
                    <div className="month">
                        <div className="changeMonth">
                            <img src={left} alt="Кнопка переключения месяца назад" className="switchMonthBtn" onClick={() => switchMonth(-1, setFirstMonth, secondMonth)} />
                            <h3>{firstMonth.toLocaleString('ru-RU', { month: 'long', year: 'numeric' })}</h3>
                            <img src={right} alt="Кнопка переключения месяца вперед" className="switchMonthBtn" onClick={() => switchMonth(1, setFirstMonth, secondMonth)} />
                        </div>
                        <div className="days-grid">
                            {['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'].map((day, index) => (
                                <p key={index}>{day}</p>
                            ))}
                            {generateDays(firstMonth).map((day, index) => {
                                const rangeClass = isDayInRange(day);
                                return (
                                    <div
                                        key={index}
                                        className={`day ${day && isDaySelected(day) ? 'selected' : ''} ${rangeClass === 'firstDay' ? 'firstDay' : ''} ${rangeClass === 'lastDay' ? 'lastDay' : ''} ${rangeClass === 'range' ? 'range' : ''} ${!day ? 'empty' : ''}`}
                                        onClick={() => day && handleDayClick(day)}
                                        onMouseEnter={() => day && handleDayHover(day)}
                                        onMouseLeave={() => setHoveredDay(null)}
                                    >
                                        {day ? day.getDate() : ''}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <div className="separator"></div>
                    <div className="month">
                        <div className="changeMonth">
                            <img src={left} alt="Кнопка переключения месяца назад" className="switchMonthBtn" onClick={() => switchMonth(-1, setSecondMonth, firstMonth)} />
                            <h3>{secondMonth.toLocaleString('ru-RU', { month: 'long', year: 'numeric' })}</h3>
                            <img src={right} alt="Кнопка переключения месяца вперед" className="switchMonthBtn" onClick={() => switchMonth(1, setSecondMonth, firstMonth)} />
                        </div>
                        <div className="days-grid">
                            {['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'].map((day, index) => (
                                <p key={index}>{day}</p>
                            ))}
                            {generateDays(secondMonth).map((day, index) => {
                                const rangeClass = isDayInRange(day);
                                return (
                                    <div
                                        key={index}
                                        className={`day ${day && isDaySelected(day) ? 'selected' : ''} ${rangeClass === 'firstDay' ? 'firstDay' : ''} ${rangeClass === 'lastDay' ? 'lastDay' : ''} ${rangeClass === 'range' ? 'range' : ''} ${!day ? 'empty' : ''}`}
                                        onClick={() => day && handleDayClick(day)}
                                        onMouseEnter={() => day && handleDayHover(day)}
                                        onMouseLeave={() => setHoveredDay(null)}
                                    >
                                        {day ? day.getDate() : ''}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
                <div className="calendar-footer">
                    <div className="leftSideCalendarFooter">
                        <div className="selectedDate">{formatDate(selectedRange?.start) || 'Не выбрано'}</div>
                        <p>-</p>
                        <div className="selectedDate">{formatDate(selectedRange?.end) || 'Не выбрано'}</div>
                    </div>
                    <div className="rightSideCalendarFooter">
                        <Button type={'colored'} onClick={handleApply} style={{ width: '100%' }}>
                            <p>Применить</p>
                        </Button>
                        <Button type={'white'} onClick={onClose} style={{ width: '100%' }}>
                            <p>Отмена</p>
                        </Button>
                    </div>
                </div>
            </div>
        </div>,
        document.body
    );
};

export default CalendarModal;