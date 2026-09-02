---
trigger: always_on
---

# CLYRA UI DEVELOPMENT RULE

@clyra-design-system.md

This project uses the CLYRA Design System as its permanent visual source of truth.

The global CSS file is:

src/app/globals.css

All CLYRA design tokens must be defined and reused from this file.

Before creating or modifying ANY UI component:

1. Follow @clyra-design-system.md.
2. Use the existing CLYRA CSS variables from globals.css.
3. Do not hardcode colors when an existing CLYRA variable exists.
4. Do not invent new colors.
5. Do not introduce random gradients.
6. Do not introduce random border-radius values.
7. Do not introduce another visual style.
8. Reuse existing components whenever possible.
9. Preserve existing functionality and business logic.
10. Keep the UI responsive.

COLOR RULES:

#FFE600 = CLYRA primary brand and primary actions.

#7B3DFF = AI and secondary functionality.

#4D7BFF = information and progress.

#22C55E = success and resolved.

#FF3B30 = errors and destructive actions.

Yellow must remain the dominant brand accent.

Purple must primarily represent AI functionality.

Blue, green and red must remain semantic colors.

The interface must remain primarily dark, clean and premium.

Avoid excessive glow.

Avoid excessive gradients.

Avoid excessive glassmorphism.

Do not make the UI look like a gaming website.

Every new component must visually belong to the CLYRA design system.

STRICT PROJECT RULES:
- NEVER use dot-type status indicators or pulsing dots (`<span className="w-1.5 h-1.5 rounded-full bg-... animate-pulse" />` or circular dot badges) anywhere in the project. Use clean typography, badges, or icon indicators instead.

Before finishing a UI task, verify the implementation against:

@clyra-design-system.md

and

src/app/globals.css