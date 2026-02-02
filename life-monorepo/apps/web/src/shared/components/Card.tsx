import React from 'react';
import './Card.css';

export interface CardProps {
  /** Card children */
  children: React.ReactNode;
  /** Card title */
  title?: string;
  /** Card subtitle */
  subtitle?: string;
  /** Card variant */
  variant?: 'default' | 'secondary';
  /** Additional class names */
  className?: string;
  /** Click handler */
  onClick?: () => void;
  /** Optional header action */
  headerAction?: React.ReactNode;
}

/**
 * Reusable Card component
 * 
 * @example
 * ```tsx
 * <Card title="Statistics" subtitle="Monthly overview">
 *   <Stats />
 * </Card>
 * ```
 */
export const Card: React.FC<CardProps> = ({
  children,
  title,
  subtitle,
  variant = 'default',
  className = '',
  onClick,
  headerAction,
}) => {
  const classes = [
    'card',
    `card--${variant}`,
    onClick && 'card--clickable',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classes} onClick={onClick} role={onClick ? 'button' : undefined}>
      {(title || subtitle || headerAction) && (
        <div className="card__header">
          <div className="card__header-content">
            {title && <h3 className="card__title">{title}</h3>}
            {subtitle && <p className="card__subtitle">{subtitle}</p>}
          </div>
          {headerAction && <div className="card__header-action">{headerAction}</div>}
        </div>
      )}
      <div className="card__content">{children}</div>
    </div>
  );
};

export default Card;
