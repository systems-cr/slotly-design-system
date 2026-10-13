import type { HTMLAttributes, MouseEventHandler } from 'react';
import { Button } from '../Button/Button';
import './ClassCard.css';

export type ClassCardStatusTone = 'warning' | 'error' | 'success' | 'info';

export interface ClassCardProps extends HTMLAttributes<HTMLElement> {
  /** Figma text property "Class name". */
  name: string;
  /** Figma text property "Time and studio". */
  timeAndStudio: string;
  /** Figma text property "Price". */
  price: string;
  /** Figma text property "Status tag". */
  statusTag: string;
  /**
   * Status tag colour. Not a Figma property: the component uses feedback/warning, and the
   * Reference screen overrides it to feedback/error ("Full") and feedback/success ("Booked").
   * "info" uses text/secondary, for statuses that are purely information (see DESIGN.md).
   */
  statusTone?: ClassCardStatusTone;
  /** Label of the nested Button (its "Label" property, overridden per card on the Reference screen). */
  buttonLabel?: string;
  onButtonClick?: MouseEventHandler<HTMLButtonElement>;
}

export function ClassCard({
  name,
  timeAndStudio,
  price,
  statusTag,
  statusTone = 'warning',
  buttonLabel = 'Book',
  onButtonClick,
  className,
  ...rest
}: ClassCardProps) {
  const classes = ['slotly-class-card', className].filter(Boolean).join(' ');
  return (
    <article className={classes} {...rest}>
      <div className="slotly-class-card__details">
        <div className="slotly-class-card__image" aria-hidden="true" />
        <h3 className="slotly-class-card__name">{name}</h3>
        <p className="slotly-class-card__time">{timeAndStudio}</p>
        <p className="slotly-class-card__price">{price}</p>
        <p className={`slotly-class-card__status slotly-class-card__status--${statusTone}`}>{statusTag}</p>
      </div>
      <Button label={buttonLabel} onClick={onButtonClick} />
    </article>
  );
}
