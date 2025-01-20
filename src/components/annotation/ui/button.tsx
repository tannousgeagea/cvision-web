import React from 'react';
import './button.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline';
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ variant = 'default', className, children, ...props }) => {
  return (
    <button
      className={`button ${variant} ${className || ''}`}
      {...props}
    >
      {children}
    </button>
  );
};

export { Button };
