import React from 'react'

const Button = ({
    children,
    onClick,
    variant = 'primary',
    size = 'medium',
    className = '',
    disabled = false
}) => {

    const baseStyles = 'font-semibold rounded-lg transition-all duration-300 shadow-lg'
    const variants = {
        primary: 'bg-amber-500 text-white hover:bg-amber-600 hover:shadow-amber-500/20',
        secondary: 'bg-purple-500 text-white hover:bg-purple-600 hover:shadow-purple-500/20',
        outline: 'border-2 border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-white'
    }
     const sizes = {
        small: 'px-4 py-2 text-sm',
        medium: 'px-6 py-3 text-base',
        large: 'px-8 py-4 text-lg'
    }

  return (
    <button onClick={onClick}
    disabled={disabled}
    className={`${baseStyles}
        ${variants[variant]}
                ${sizes[size]}
                ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
                ${className}`}>
                {children}
    </button>
  )
}

export default Button