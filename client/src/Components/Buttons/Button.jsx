import React from 'react'
import './Button.css'

export default function Button({ type, children, style: propStyle, onClick, tb = 10, rl = 10, }) {
    const fullStyle = {
        ...propStyle,
        padding: `${tb}px ${rl}px`
    }
  return (
    <button
        onClick={onClick}
        style={fullStyle}
        className={`standarts ${type === 'colored' ? 'colored' : type === 'white' ? 'white' : ''}`}
    >
        {children}
    </button>
  )
}
