import type { ButtonHTMLAttributes } from 'react';
import './Chip.css';

export type ChipState = 'default' | 'selected';

export interface ChipProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  /** Figma text property "Label". */
  label: string;
  /** Figma variant "State". */
  state?: ChipState;
}

export function Chip({ label, state = 'default', type = 'button', className, ...rest }: ChipProps) {
  const selected = state === 'selected';
  const classes = ['slotly-chip', selected && 'slotly-chip--selected', className].filter(Boolean).join(' ');
  return (
    <button type={type} aria-pressed={selected} className={classes} {...rest}>
      {label}
    </button>
  );
}
