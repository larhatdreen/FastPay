import React, { useState } from 'react'
import './Search.css'

import search from '../../Assets/svg/search.svg'

export default function Search({ className }) {
    const [searchValue, setSearchValue] = useState('')
  return (
    <div 
        className={`searchContainer ${className}`}
    >
        <img src={search} alt="Иконка лупы в поиске" />
        <input 
            type="text"
            placeholder='Поиск'
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
        />
    </div>
  )
}
