import React from 'react'
import './Button.css'
import Loader from '../Loader/Loader'

export default function Button({ type, children, style: propStyle, className, onClick, tb = 10, rl = 10, isLoading, disabled }) {

  const fullStyle = {
    ...propStyle,
    padding: `${tb}px ${rl}px`
  }
  return (
    <>
    <button
      disabled={disabled}
      id='button-target'
      type='button'
      onClick={onClick}
      style={fullStyle}
      className={`standarts ${type === 'colored' ? 'colored' : type === 'white' ? 'white' : ''} ${className}`}
    >
      {children}
    </button>
    <Loader isLoading={isLoading} targetId="button-target" />
    </>
  )
}
