import type { ButtonHTMLAttributes } from 'react';
import './Button.css';

export type ButtonState = 'default' | 'hover';

export interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  /** Figma text property "Label". */
  label: string;
  /** Figma variant "State". The hover style also applies on real pointer hover. */
  state?: ButtonState;
}

export function Button({ label, state = 'default', type = 'button', className, ...rest }: ButtonProps) {
  const classes = ['slotly-button', state === 'hover' && 'slotly-button--hover', className]
    .filter(Boolean)
    .join(' ');
  return (
    <button type={type} className={classes} {...rest}>
      {label}
    </button>
  );
}
