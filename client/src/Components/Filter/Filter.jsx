import React from 'react';
import './Filter.css';
import { useLocation } from 'react-router-dom'

export default function Filter({ filters, onFilterClick, activeFilter }) {
    const location = useLocation()
    return (
        <div className="filterContainer">
            {filters.map((filter, index) => (
                <div className="filterBtnContainer" key={index} style={{width: location.pathname === '/dashboard' ? '25%' : ''}}> 
                    {index !== 0 && <div key={`${index}-space`} className="spacer"></div>} 
                    <button
                        onClick={() => onFilterClick(filter)}
                        className={activeFilter === filter ? 'active' : ''}
                        style={{fontSize: location.pathname === '/dashboard' ? '14px' : '', width: location.pathname === '/dashboard' ? '100%' : ''}}
                    >
                        {filter}
                    </button>
                </div>
            ))}
        </div>
    );
}