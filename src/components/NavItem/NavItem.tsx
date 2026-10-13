import type { ButtonHTMLAttributes } from 'react';
import { Icon, type IconName } from '../Icon/Icon';
import './NavItem.css';

export type NavItemState = 'default' | 'selected';

export interface NavItemProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  /** Figma text property "Label". */
  label: string;
  /** Figma instance-swap property "Icon" (Icon/Home, Icon/Classes, Icon/Bookings, Icon/Profile). */
  icon?: IconName;
  /** Figma variant "State". */
  state?: NavItemState;
}

export function NavItem({ label, icon = 'home', state = 'default', type = 'button', className, ...rest }: NavItemProps) {
  const selected = state === 'selected';
  const classes = ['slotly-nav-item', selected && 'slotly-nav-item--selected', className].filter(Boolean).join(' ');
  return (
    <button type={type} aria-current={selected ? 'page' : undefined} className={classes} {...rest}>
      <Icon name={icon} className="slotly-nav-item__icon" />
      <span className="slotly-nav-item__label">{label}</span>
    </button>
  );
}
