import React from 'react'
import ReactDOM from 'react-dom'
import './Loader.css'

export default function Loader({ isLoading, targetId, overlayColor = 'rgba(255, 255, 255, 0.86)', spinnerSize = '40px' }) {
    if (!isLoading) return null;

    // Находим целевой элемент по ID
    const targetElement = document.getElementById(targetId);
    if (!targetElement) return null; // Если элемент не найден, ничего не рендерим

    // Получаем размеры и позицию целевого элемента
    const { top, left, width, height } = targetElement.getBoundingClientRect();

    // Используем порталы для рендеринга поверх целевого элемента
    return ReactDOM.createPortal(
        <div
            className="loader-overlay"
            style={{
                position: 'absolute',
                top: `${top}px`,
                left: `${left}px`,
                width: `${width}px`,
                height: `${height}px`,
                backgroundColor: overlayColor,
                zIndex: 1000, // Убедимся, что оверлей поверх всего
            }}
        >
            <div
                className="loader-spinner"
                style={{
                    width: spinnerSize,
                    height: spinnerSize,
                }}
            />
        </div>,
        document.body // Рендерим в body для правильного позиционирования
    );
};
