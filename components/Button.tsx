import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  icon, 
  className = '',
  ...props 
}) => {
  const baseStyles = "flex items-center justify-center font-medium rounded-full transition-all duration-200 active:scale-95";
  
  const variants = {
    primary: "bg-yt-text text-white dark:bg-yt-textDark dark:text-yt-black hover:bg-opacity-90",
    secondary: "bg-yt-gray text-yt-text hover:bg-[#d9d9d9] dark:bg-yt-darkGray dark:text-yt-textDark dark:hover:bg-[#3f3f3f]",
    ghost: "text-yt-text dark:text-yt-textDark hover:bg-yt-gray dark:hover:bg-yt-darkGray",
    danger: "bg-yt-red text-white hover:bg-[#cc0000]"
  };

  const sizes = {
    sm: "px-3 py-1 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </button>
  );
};
