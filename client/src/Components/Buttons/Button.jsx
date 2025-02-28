import React from 'react'
import './Button.css'
import Loader from '../Loader/Loader'

export default function Button({ type, children, style: propStyle, className, onClick, tb = 10, rl = 10, isLoading }) {
  // const [isLoading, setIsLoading] = useState(false);

  // const handleClick = async () => {
  //   if (onClick) {
  //     setIsLoading(true); 
  //     try {
  //       await onClick(); 
  //     } catch (err) {
  //       console.error('Ошибка:', err);
  //     } finally {
  //       setIsLoading(false); 
  //     }
  //   }
  // };

  const fullStyle = {
    ...propStyle,
    padding: `${tb}px ${rl}px`
  }
  return (
    <>
    <button
      id='button-target'
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
