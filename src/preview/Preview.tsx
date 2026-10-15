import type { ReactNode } from 'react';
import { Button, Chip, ClassCard, NavItem, type ClassCardStatusTone, type IconName } from '../index';
import './preview.css';

const navItems: { icon: IconName; label: string }[] = [
  { icon: 'home', label: 'Home' },
  { icon: 'classes', label: 'Classes' },
  { icon: 'bookings', label: 'Bookings' },
  { icon: 'profile', label: 'Profile' },
];

// The approved statuses, in the order of the Status Examples frame on the Figma Reference page.
const classStatuses: { statusTag: string; statusTone: ClassCardStatusTone; buttonLabel: string }[] = [
  { statusTag: 'Few spots left', statusTone: 'warning', buttonLabel: 'Book' },
  { statusTag: 'Full', statusTone: 'error', buttonLabel: 'Join waitlist' },
  { statusTag: 'Spots available', statusTone: 'info', buttonLabel: 'Book' },
  { statusTag: 'Booked', statusTone: 'success', buttonLabel: 'View booking' },
  { statusTag: 'Attended', statusTone: 'info', buttonLabel: 'Book again' },
];

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="preview-section">
      <h2 className="preview-section__title">{title}</h2>
      {children}
    </section>
  );
}

function Example({ props, children }: { props: string; children: ReactNode }) {
  return (
    <div className="preview-example">
      <code className="preview-example__props">{props}</code>
      {children}
    </div>
  );
}

export function Preview() {
  return (
    <main className="preview">
      <h1 className="preview__title">Slotly components</h1>

      <Section title="Button">
        <Example props='state="default"'>
          <Button label="Book" />
        </Example>
        <Example props='state="hover"'>
          <Button label="Book" state="hover" />
        </Example>
      </Section>

      <Section title="Chip">
        <div className="preview-row">
          <Example props='state="default"'>
            <Chip label="Yoga" />
          </Example>
          <Example props='state="selected"'>
            <Chip label="Yoga" state="selected" />
          </Example>
        </div>
      </Section>

      <Section title="Nav item">
        {(['default', 'selected'] as const).map((state) => (
          <Example key={state} props={`state="${state}" icon="home" | "classes" | "bookings" | "profile"`}>
            <div className="preview-nav">
              {navItems.map((item) => (
                <NavItem key={item.icon} icon={item.icon} label={item.label} state={state} />
              ))}
            </div>
          </Example>
        ))}
      </Section>

      <Section title="Class card">
        {classStatuses.map((status) => (
          <Example
            key={status.statusTag}
            props={`statusTag="${status.statusTag}" statusTone="${status.statusTone}" buttonLabel="${status.buttonLabel}"`}
          >
            <ClassCard name="Morning Yoga Flow" timeAndStudio="6:30 AM · Lotus Studio" price="₹450" {...status} />
          </Example>
        ))}
      </Section>
    </main>
  );
}
