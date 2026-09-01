---
trigger: always_on
---

# CLYRA DESIGN SYSTEM

Version: 1.0

This document is the visual source of truth for the CLYRA
application.

Every UI component must follow this system.

==================================================
1. BRAND
==================================================

Brand:
CLYRA

Primary brand color:
#FFE600

Secondary / AI color:
#7B3DFF

Visual direction:
- Premium futuristic AI SaaS
- Dark
- Minimal
- High-end
- Enterprise
- AI-native
- Clean
- Subtle neon
- Controlled glow

The interface must NOT look like a gaming UI.

==================================================
2. COLORS
==================================================

PRIMARY

Yellow:
#FFE600

Yellow Hover:
#FFF033

Yellow Pressed:
#C9B800

Yellow Soft:
rgba(255,230,0,0.10)

Yellow Border:
rgba(255,230,0,0.55)


AI PURPLE

Purple:
#7B3DFF

Purple Hover:
#914FFF

Purple Pressed:
#5D22D6

Purple Soft:
rgba(123,61,255,0.10)

Purple Border:
rgba(123,61,255,0.55)


SEMANTIC

Blue:
#4D7BFF

Green:
#22C55E

Red:
#FF3B30


BACKGROUNDS

Background:
#0F0F10

Deep:
#09090A

Surface:
#151517

Elevated:
#1E1E22

High Elevated:
#24242A


TEXT

Primary:
#FFFFFF

Secondary:
#B8B8BE

Muted:
#85858D

Placeholder:
#707078

Disabled:
#55555C


BORDERS

Default:
#2A2A30

Subtle:
rgba(255,255,255,0.08)

Strong:
rgba(255,255,255,0.15)


==================================================
3. COLOR SEMANTICS
==================================================

YELLOW:

Use for:
- Primary CTA
- Active navigation
- Selected states
- Brand highlights
- Important actions
- Primary indicators
- CLYRA branding

Do not use yellow for every element.


PURPLE:

Use for:
- AI functionality
- AI assistant
- AI-generated content
- AI automation
- Secondary actions
- Futuristic decorative elements

Purple must remain secondary to yellow.


BLUE:

Use only for:
- Information
- Progress
- Informational alerts
- Neutral interactive states


GREEN:

Use only for:
- Success
- Resolved
- Completed
- Online


RED:

Use only for:
- Error
- Failed
- Destructive actions


==================================================
4. TYPOGRAPHY
==================================================

Font:
Inter

H1:
32px / 700

H2:
24px / 600

H3:
20px / 600

Body Large:
16px / 400

Body:
14px / 400

Body Medium:
14px / 500

Caption:
12px / 400

Section Label:
12–14px / 600 / uppercase


==================================================
5. BUTTONS
==================================================

PRIMARY

Background:
#FFE600

Text:
#0F0F10

Radius:
8px

Weight:
600


HOVER

Background:
#FFF033

Glow:
0 0 24px rgba(255,230,0,0.30)


PRESSED

Background:
#C9B800


DISABLED

Background:
#3A3708

Text:
#77720A


SECONDARY

Background:
#7B3DFF

Text:
#FFFFFF

Hover:
#914FFF

Pressed:
#5D22D6


OUTLINE

Background:
transparent

Border:
1px solid rgba(255,230,0,0.55)

Text:
#FFE600


GHOST

Background:
transparent

Text:
#FFE600

Hover:
rgba(255,230,0,0.08)


==================================================
6. INPUTS
==================================================

Height:
48px

Background:
#0F0F10

Border:
#2A2A30

Radius:
8px

Text:
#FFFFFF

Placeholder:
#707078


FOCUS

Border:
#FFE600

Glow:
0 0 0 2px rgba(255,230,0,0.08)


DISABLED

Background:
#151517

Border:
#24242A

Text:
#55555C


==================================================
7. CARDS
==================================================

Background:
#151517

Border:
1px solid #2A2A30

Radius:
12px

Shadow:
0 8px 30px rgba(0,0,0,0.25)


HOVER

Background:
#1E1E22

Border:
rgba(255,230,0,0.25)


Do not add strong glow to every card.


==================================================
8. ICONS
==================================================

Style:
Modern clean line icons

Stroke:
1.8–2px

Normal:
18–22px

Navigation:
22–24px


Default:
#B8B8BE

Inactive:
#85858D

Active:
#FFE600

AI:
#7B3DFF

Info:
#4D7BFF

Success:
#22C55E

Error:
#FF3B30


Do not randomly color icons.


==================================================
9. CHIPS
==================================================

Yellow:

Background:
rgba(255,230,0,0.08)

Border:
rgba(255,230,0,0.55)

Text:
#FFE600


Purple:

Background:
rgba(123,61,255,0.08)

Border:
rgba(123,61,255,0.55)

Text:
#9B6CFF


Blue:

Background:
rgba(77,123,255,0.08)

Border:
rgba(77,123,255,0.55)

Text:
#4D7BFF


Green:

Background:
rgba(34,197,94,0.08)

Border:
rgba(34,197,94,0.55)

Text:
#22C55E


Radius:
999px


==================================================
10. ALERTS
==================================================

WARNING:
#FFE600

INFO:
#4D7BFF

SUCCESS:
#22C55E

ERROR:
#FF3B30

Use dark backgrounds with colored borders/icons.

Never use huge solid colored alert backgrounds.


==================================================
11. NAVIGATION
==================================================

Background:
#151517

Border:
#2A2A30

Inactive:
#85858D

Active:
#FFE600


Primary floating action:

Background:
#FFE600

Icon:
#0F0F10

Radius:
50%

Glow:
0 0 25px rgba(255,230,0,0.35)


==================================================
12. RADIUS
==================================================

Small:
6px

Buttons:
8px

Inputs:
8px

Dropdown:
8px

Cards:
12px

Panels:
16px

Pills:
999px

Circular:
50%


==================================================
13. SPACING
==================================================

Use 8px spacing system.

4
8
12
16
24
32
40
48
64
80


==================================================
14. GLOW
==================================================

Glow is an accent.

Use glow for:

- Primary CTA hover
- Focused inputs
- Active navigation
- AI elements
- Selected states
- Hero artwork
- Primary floating action

Do NOT glow:

- Every card
- Every icon
- Every text
- Every border
- Every component


==================================================
15. GRADIENTS
==================================================

Yellow:

linear-gradient(
135deg,
#FFE600 0%,
#FFC107 100%
)


AI:

linear-gradient(
135deg,
#7B3DFF 0%,
#A51EFF 55%,
#FF2DAD 100%
)


Use gradients mainly for artwork,
AI elements and special visual areas.

Do not gradient every component.


==================================================
16. CLYRA ARTWORK
==================================================

Use the provided CLYRA assets.

Approved visual language:

- Black
- CLYRA yellow
- Electric purple
- Cyan
- Blue
- Magenta
- Glossy 3D surfaces
- Futuristic AI forms
- Cybernetic imagery
- Ambient yellow lighting

Artwork should primarily appear in:

- Hero
- AI sections
- Feature highlights
- Empty states
- Decorative backgrounds

The core application UI remains controlled and dark.


==================================================
17. IMPLEMENTATION RULES
==================================================

Never invent a new color.

Never introduce another primary accent.

Never randomly change border radius.

Never randomly change typography.

Never create inconsistent button styles.

Never create inconsistent input styles.

Reuse existing design tokens.

Reuse existing components.

Create shared components when possible.

Preserve existing functionality.

Preserve existing UX unless explicitly asked to change it.

Every interactive component must support:

DEFAULT
HOVER
FOCUS
PRESSED
DISABLED

Where applicable:

SELECTED
LOADING
SUCCESS
ERROR


==================================================
18. FINAL QUALITY CHECK
==================================================

Before completing any UI task, verify:

[ ] Correct CLYRA colors
[ ] Correct typography
[ ] Correct spacing
[ ] Correct radius
[ ] Correct component states
[ ] Correct icon colors
[ ] Correct semantic colors
[ ] Correct glow usage
[ ] No random colors
[ ] No random gradients
[ ] No excessive neon
[ ] No excessive glassmorphism
[ ] No gaming aesthetic
[ ] Consistent desktop/mobile behavior
[ ] Components visually belong to the same CLYRA system