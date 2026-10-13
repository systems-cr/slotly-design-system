# Slotly Design System

Design tokens and assets for Slotly, exported from the Slotly DS Figma library.

## Contents

- `tokens/tokens.css`, `tokens/tokens.json`: Primitive and Semantic variables.
- `tokens/typography.css`: the five Figma text styles (Heading, Title, Body, Label, Caption).
- `assets/icons/`: navigation icons, using `currentColor`.
- `src/components/`: React components (Button, Chip, ClassCard, NavItem) styled with the Semantic tokens and text styles.

## Development

```sh
npm install
npm run dev        # preview page with every component in every state
npm run build      # typecheck and build
npm run check:css  # component CSS uses only Semantic tokens and text styles
```
