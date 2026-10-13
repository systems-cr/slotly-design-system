# Slotly design system

Slotly helps people find fitness classes near them and book a spot. This design system is the small set of colours, text styles, spacing, icons and components used to build Slotly's screens.

This guide is for anyone building a new Slotly screen: designers in Figma, developers, and AI tools. It says what each piece is for, when to use each state, and the rules every screen must follow.

## Where things live

- **Figma is the source of truth.** Everything here comes from the [Slotly DS – Tokens (Lib)](https://www.figma.com/design/aC4DTl4rU1vQL66WMlq0o9/Slotly-DS---Tokens--Lib-?node-id=2-2) file:
  - **Reference page:** the components, and an example screen (the class list) that shows them in use.
  - **Token spec page:** what every colour, spacing and radius value is for.
- **This repository is generated from Figma.** It holds the tokens, typography, icons and coded components. Change Figma first, then update the repository to match. Never the other way round.

| What | Figma | Repository |
|---|---|---|
| Colours, spacing, radius | Variables: the Primitives and Semantic collections | `tokens/tokens.css`, `tokens/tokens.json` |
| Text styles | Text styles: Heading, Title, Body, Label, Caption | `tokens/typography.css` |
| Icons | Icon/Home, Icon/Classes, Icon/Bookings, Icon/Profile | `assets/icons/` |
| Components | Button, Chip, Class card, Nav item | `src/components/` |

---

## Foundations

### Two layers of tokens: use only the Semantic one

The system has two layers of variables:

- **Primitives** are raw values with plain names, such as `blue/600` (a blue) or `space/16` (16px). They say *what* a value is.
- **Semantic** variables are roles, such as `text/primary` or `space/inset-md`. They say *what a value is for*. Each one points at a primitive.

**Always design with Semantic variables. Never use a Primitive directly.** Because a role points at a primitive, a colour can be changed in one place and every screen updates correctly. If you can't find a Semantic variable for what you need, that's a gap in the system: ask for one to be added in Figma rather than reaching for a primitive or typing a hex code.

### Colour

Each colour role has one job. Pick a role by what you're colouring, not by the colour you want.

**Surfaces (backgrounds)**

| Role | Use it for |
|---|---|
| `bg/default` | The main surface: the screen, header, bottom nav, cards and unselected chips. White. |
| `bg/subtle` | The area behind a list of cards, so the white cards stand out from it. |
| `bg/placeholder` | Space reserved for an image that isn't there yet (the class card image). |
| `bg/selected` | The background of a selected chip. |

**Lines**

| Role | Use it for |
|---|---|
| `border/default` | Outlines of cards and unselected chips, and the line along the top of the bottom nav. It's very faint (1.26:1 against white), so it only decorates. Never let a border be the only thing that shows where something is or what state it's in. |

**Text**

| Role | Use it for |
|---|---|
| `text/primary` | Most text: headings, class names, prices, chip labels. |
| `text/secondary` | Supporting text that should step back: dates, times and studios, unselected nav labels. |
| `text/selected` | Text in a selected chip or nav item. |
| `text/on-primary` | Text on top of the primary action colour, i.e. button labels. |

**Icons**

| Role | Use it for |
|---|---|
| `icon/default` | Icons in their normal state (unselected nav items). |
| `icon/selected` | Icons in a selected nav item. |

**Actions**

| Role | Use it for |
|---|---|
| `action/primary` | The fill of a Button. |
| `action/primary-hover` | The fill of a Button while a pointer is over it. |

**Feedback (status)**

| Role | Use it for |
|---|---|
| `feedback/success` | Good news: something worked or is confirmed. On the class card: "Booked". |
| `feedback/warning` | Something needs attention soon. On the class card: "Few spots left". |
| `feedback/error` | Something is blocked or failed. On the class card: "Full". |

Feedback colours are only for status messages. Don't use them to decorate, or to colour a button or background.

**Contrast.** Every text and icon role passes the WCAG AA contrast minimum (4.5:1) on the backgrounds it's meant for.
- **`text/secondary` on `bg/subtle` passes by a hair (4.51:1).** Don't put it on anything darker.
- **Never use `amber/500` for text.** It's only 2.15:1 on white, which is why `feedback/warning` uses the darker `amber/700`.

### Text styles

There are five text styles. All use Inter with automatic line height. Don't create other sizes or weights.

| Style | Size and weight | Use it for |
|---|---|---|
| **Heading** | 24, Semi Bold | The title of a screen. One per screen. |
| **Title** | 20, Semi Bold | The name of the main thing in a card, such as the class name. |
| **Body** | 16, Regular | Supporting information: the date line, time and studio, price. |
| **Label** | 14, Semi Bold | Text inside a control: button and chip labels. |
| **Caption** | 12, Regular | Small text: status tags, nav labels. |

Colour and text style are separate choices. For example, the class card's status tag is Caption text in a feedback colour, and its price is Body text in `text/primary`.

### Spacing

Spacing comes in two kinds:
- **Gap** is the space *between* things.
- **Inset** is the padding *inside* a container, between its edge and its content.

| Role | Size | Use it for |
|---|---|---|
| `space/gap-xs` | 4 | An icon and its own label (nav items). |
| `space/gap-sm` | 8 | Items in a tight group: lines of text in a stack, chips in a row. |
| `space/gap-md` | 12 | Between a group of content and its action (card details and the card's button). |
| `space/gap-lg` | 16 | Between repeated items, such as cards in a list. |
| `space/gap-section` | 32 | Between major sections. |
| `space/inset-sm` | 12 | Padding inside small controls (the sides of a chip). |
| `space/inset-md` | 16 | Screen edges, list padding and card padding. |
| `space/inset-lg` | 24 | Larger padding: the top of the screen header and the sides of a button. |

Spacing values not on this list don't exist in the system; don't use them. Zero is fine.

### Corner radius

| Role | Size | Use it for |
|---|---|---|
| `radius/sm` | 8 | Small elements, usually inside a card: buttons, the image placeholder. |
| `radius/lg` | 16 | Cards. |
| `radius/pill` | fully round | Chips. |

### Icons

There are four icons: **Home, Classes, Bookings and Profile**. They're 24×24 outlines with a 2px stroke, used in the bottom navigation.
- Always show an icon at 24×24. Don't scale it, fill it or change its stroke.
- Colour icons only with `icon/default` or `icon/selected`. In code the icons take the colour of their surroundings, so set the colour on the nav item, not on the icon.
- Each icon belongs to one destination (Home with Home, Classes with Classes, and so on). Don't swap them or reuse one for another meaning.

---

## Components

There are four components. Use them as they are: don't detach them, restyle them or rebuild them from scratch. If a screen needs something they can't do, ask for the component to be extended in Figma first.

### Button

**What it's for:** the main action on a card or screen, the thing you most want people to do. On Slotly that's booking a class, joining a waitlist or viewing a booking.

**What you can change:**
- **Label:** a short verb or verb phrase, such as "Book", "Join waitlist" or "View booking". Use sentence case, no full stop, and keep it on one line.

**States**

| State | When to use it |
|---|---|
| **Default** | Always, in every screen design. This is how the button looks at rest. |
| **Hover** | Only to show what happens when a mouse pointer is over the button, for example in a prototype or a handoff note. Never design a screen with a button resting in Hover. In code, hover happens on its own. Phones have no hover, so never rely on it to tell people anything. |

**Rules**
- **One Button per card.** Avoid several Buttons side by side: there is only one, high-emphasis style, so two together compete. A quieter (secondary) button isn't designed yet.
- **The Button fills the width of its container,** as it does inside the class card.
- **Don't use a Button for filtering or navigation.** Use a Chip or a Nav item.
- **No disabled or loading state exists yet.** Don't fake one by fading the button; ask for it to be designed.

### Chip

**What it's for:** filtering a list. On the class list, chips filter by class type ("All", "Yoga", "HIIT", "Pilates").

**What you can change:**
- **Label:** one or two words naming the filter.

**States**

| State | When to use it |
|---|---|
| **Default** | The filter is not applied. |
| **Selected** | The filter is applied. |

**Rules**
- **Chips sit in a single row** under the screen header, with `space/gap-sm` between them and `space/inset-md` at the screen edges.
- **Treat chips as single-choice, as the Reference screen does.** Exactly one is selected at a time, and the "All" chip is selected when nothing is filtered. Choosing several at once isn't designed yet.
- **A chip changes what's shown on the current screen.** It never takes people to another screen or starts an action like booking.
- **Don't use a Chip as a status label or tag.** Status lives in the class card's status tag.

### Class card

**What it's for:** one bookable class in a list. It shows what the class is, when and where it is, what it costs and how full it is, and gives the one action that makes sense right now.

**Content, top to bottom**
1. **Image:** for now, an empty placeholder (`bg/placeholder`). How a real class photo should look hasn't been designed yet.
2. **Class name:** Title style. For example, "Morning Yoga Flow".
3. **Time and studio:** Body style, `text/secondary`. For example, "6:30 AM · Lotus Studio".
4. **Price:** Body style. For example, "₹450".
5. **Status tag:** Caption style, in a feedback colour.
6. **Button:** the action.

**Status and action go together.** Pick the row that matches the class, and use its tag, colour and button label together:

| Situation | Status tag | Colour | Button label |
|---|---|---|---|
| Spots available, but few left | "Few spots left" | `feedback/warning` | "Book" |
| No spots left | "Full" | `feedback/error` | "Join waitlist" |
| The person has already booked | "Booked" | `feedback/success` | "View booking" |

The status text must say the status in words. Colour backs it up but is never the only signal.

The design doesn't yet cover a class with plenty of spots, a cancelled class, or a class that has already started. Ask before inventing a tag or hiding it.

**Rules**
- **Stack cards vertically** with `space/gap-lg` between them, inside a list area coloured `bg/subtle` with `space/inset-md` padding.
- **Keep the order and text styles of the content.** Don't add fields to the card or remove them; if a screen needs different information, that's a new or extended component.

### Nav item

**What it's for:** moving between Slotly's four main sections. Four Nav items make up the bottom navigation bar: Home, Classes, Bookings and Profile.

**What you can change:**
- **Icon:** Home, Classes, Bookings or Profile.
- **Label:** the section name. It must match the icon.

**States**

| State | When to use it |
|---|---|
| **Default** | Every section the person is *not* currently in. |
| **Selected** | The section the person is currently in. |

**Rules**
- **The bottom nav always has exactly four items,** in this order: Home, Classes, Bookings, Profile. The items share the width equally.
- **Exactly one item is Selected:** the section the current screen belongs to. Screens inside a section (for example a class's detail page, under Classes) keep that section selected.
- **The bar sits at the bottom of the screen** on `bg/default`, with a `border/default` line along its top edge.
- **Don't add a fifth item, remove one, or put other content in the bar.**

---

## Building a screen

The class list on the Reference page is the model for a Slotly screen. It's a phone screen 390 wide. From top to bottom:

1. **Header:** the screen title in Heading style, and a supporting line in Body style with `text/secondary`.
   - Padding: `space/inset-lg` at the top, `space/inset-md` at the sides and bottom.
   - Space between the two lines: `space/gap-sm`.
2. **Filters (optional):** one row of Chips.
3. **Content:** for a list, Class cards on `bg/subtle`.
4. **Bottom nav:** four Nav items.

The screen's background is `bg/default`. Content lines up with the screen edges at `space/inset-md`.

## The rules

Every new screen must follow these, whether a designer or an AI is building it. They're short on purpose, so they can be checked one by one.

1. **Use the four components as they are.** Don't detach, restyle or recreate them. Don't build new components out of plain shapes.
2. **Colour only with Semantic variables,** and pick the role by what you're colouring: `bg/` for surfaces, `text/` for text, `icon/` for icons, `border/` for lines, `action/` for buttons, `feedback/` for status. Never use a Primitive, a hex code or a colour picked by eye.
3. **Use only the five text styles.** No other font, size or weight.
4. **Use only the spacing and radius roles.** Gap between things, inset inside things. No in-between values.
5. **Use status colours only for status,** and always say the status in words too.
6. **Show state with the component's own states.** Selected for the current chip or section, Default for the rest. Never invent a state by changing colours by hand.
7. **Exactly one Nav item is Selected,** and exactly one Chip in a filter row.
8. **Use one Button per card,** with a label that matches the card's status (see the class card table).
9. **Keep text readable.** Don't place text on a background its role wasn't meant for, and never use `amber/500` for text.
10. **If the system doesn't have what you need, stop and ask.** Name the gap (for example, "a secondary button" or "an empty state"). Don't improvise a one-off. New tokens and components are added in Figma first and then come to this repository. They're never invented in a screen or in code.

### Extra notes for AI tools and developers

- **Use the coded components from `src/index.ts`:** `Button`, `Chip`, `ClassCard` and `NavItem`. Figma variants and properties map directly to props:
  - **Button:** `state` (`"default"` / `"hover"`) and `label`.
  - **Chip:** `state` (`"default"` / `"selected"`) and `label`.
  - **NavItem:** `state` (`"default"` / `"selected"`), `icon` and `label`.
  - **ClassCard:** `name`, `timeAndStudio`, `price`, `statusTag`, `statusTone` (`"warning"` / `"error"` / `"success"`) and `buttonLabel`.
- **Don't pass `state="hover"` in a real screen.** It exists for previews and documentation; real hover is automatic.
- **In CSS, refer to variables by their CSS names.** A Figma name becomes a CSS name by replacing `/` with `-` and adding `--` (`text/secondary` → `var(--text-secondary)`). Text styles are `--typography-{style}-{property}`, for example `var(--typography-body-font-size)`.
- **Never use the Primitive variables in `tokens/tokens.css`** (the first block in the file), and never write colours, font sizes or spacing as raw values.
  - The only plain values allowed are component dimensions with no token: the Button (40), Chip (32) and Nav item (64) heights, the 120 image height, and the 1px outline.
  - Run `npm run check:css` to check component CSS against this rule.
- **Don't edit `tokens/tokens.css`, `tokens/tokens.json` or `tokens/typography.css` by hand.** They're generated from Figma.
- **Run `npm run dev` to see every component in every state.**

---

## Not designed yet

These are known gaps. If a screen needs one, ask for it to be designed in Figma before building it:

- **A secondary or less prominent button, and disabled or loading buttons.**
- **Chip behaviour beyond single selection,** and a hover state for chips.
- **Class photos in the card,** and statuses other than "Few spots left", "Full" and "Booked".
- **Empty, loading and error states for screens.**
- **Header and bottom-nav bar components.** They're built from frames on the Reference screen, not as reusable components.
- **A visible keyboard focus style.** Code currently uses the browser's default focus ring.
- **Dark mode.** Each collection has a single mode.
- **Selected chips and nav items rely on colour alone,** a colour change with no shape or weight change. In code, the components also tell screen readers which item is selected, but people who can't tell the colours apart get no other visual cue. Worth a design decision.
