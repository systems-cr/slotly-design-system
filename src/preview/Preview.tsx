import type { ReactNode } from 'react';
import { Button, Chip, ClassCard, NavItem, type IconName } from '../index';
import './preview.css';

const navItems: { icon: IconName; label: string }[] = [
  { icon: 'home', label: 'Home' },
  { icon: 'classes', label: 'Classes' },
  { icon: 'bookings', label: 'Bookings' },
  { icon: 'profile', label: 'Profile' },
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
        <Example props='statusTone="info"'>
          <ClassCard
            name="Evening Vinyasa"
            timeAndStudio="7:30 PM · Lotus Studio"
            price="₹450"
            statusTag="Spots available"
            statusTone="info"
            buttonLabel="Book"
          />
        </Example>
        <Example props='statusTone="warning"'>
          <ClassCard
            name="Morning Yoga Flow"
            timeAndStudio="6:30 AM · Lotus Studio"
            price="₹450"
            statusTag="Few spots left"
            statusTone="warning"
            buttonLabel="Book"
          />
        </Example>
        <Example props='statusTone="error"'>
          <ClassCard
            name="HIIT Express"
            timeAndStudio="7:15 AM · Pulse Gym"
            price="₹600"
            statusTag="Full"
            statusTone="error"
            buttonLabel="Join waitlist"
          />
        </Example>
        <Example props='statusTone="success"'>
          <ClassCard
            name="Core Pilates"
            timeAndStudio="6:00 PM · Align Studio"
            price="₹550"
            statusTag="Booked"
            statusTone="success"
            buttonLabel="View booking"
          />
        </Example>
      </Section>
    </main>
  );
}
