import type { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'small' | 'medium' | 'large';
  isLoading?: boolean;
}

export function Button({
  children,
  variant = 'primary',
  size = 'medium',
  isLoading = false,
  disabled,
  className = '',
  ...props
}: ButtonProps) {
  const baseClasses = 'btn';
  const variantClasses = `btn-${variant}`;
  const sizeClasses = size === 'large' ? 'btn-lg' : size === 'small' ? 'btn-sm' : '';

  return (
    <button
      className={`${baseClasses} ${variantClasses} ${sizeClasses} ${className}`.trim()}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? 'Loading...' : children}
    </button>
  );
}
