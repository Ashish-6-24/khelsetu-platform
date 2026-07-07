# KhelSetu Design System

This folder is the **Source of Truth** for all UI/UX work on the KhelSetu frontend. It is generated and maintained using the [ui-ux-pro-max](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill) skill installed at `.opencode/skills/ui-ux-pro-max/`.

## Structure

```
design-system/
├── README.md                          # This file
└── khelsetu/                          # Project-specific design system
    ├── MASTER.md                      # Global rules (colors, typography, spacing, motion, a11y)
    └── pages/                         # Page-specific overrides
        ├── dashboard.md               # Main authenticated dashboard
        ├── scoring.md                 # Live match scoring
        ├── tournament-bracket.md      # Bracket visualization
        ├── live-broadcast-overlay.md  # OBS overlay
        ├── landing.md                 # Public marketing page
        └── auth.md                    # Login / Register
```

## How the AI uses this

When you ask the AI to build or modify any UI, it follows this protocol:

1. **Read** `khelsetu/MASTER.md` for global rules (colors, typography, motion, a11y)
2. **Check** `khelsetu/pages/[page-name].md` for page-specific overrides
3. **Apply** page overrides if they exist; otherwise use Master rules
4. **Run** the Pre-Delivery Checklist before completing

## How to extend

### Add a new page override

```bash
# Create a new page override file
touch design-system/khelsetu/pages/[page-name].md
```

Follow the structure of existing overrides (Style / Color / Components / Layout / A11y / Performance).

### Update the Master

Edit `design-system/khelsetu/MASTER.md` directly. The skill's CLI can also be used to regenerate:

```bash
python3 .opencode/skills/ui-ux-pro-max/scripts/search.py "your query" --design-system -p "KhelSetu"
```

⚠️ The CLI output is generic — review and customize before committing.

## Quick searches

```bash
# Get style recommendations
python3 .opencode/skills/ui-ux-pro-max/scripts/search.py "glassmorphism dark" --domain style

# Get chart type suggestions
python3 .opencode/skills/ui-ux-pro-max/scripts/search.py "real-time dashboard" --domain chart

# Get UX guidelines
python3 .opencode/skills/ui-ux-pro-max/scripts/search.py "accessibility animation" --domain ux

# Get stack-specific best practices
python3 .opencode/skills/ui-ux-pro-max/scripts/search.py "form validation" --stack react
```

## Triggers

The skill auto-activates when the AI receives any of these prompts:

- "Build a landing page for..."
- "Design a dashboard for..."
- "Create a modal/form/button..."
- "Review the UI for accessibility..."
- "Make this look more professional..."
- "Improve the UX of..."
- "Fix the layout on mobile..."
- Any UI/UX task involving KhelSetu components

## Related

- **Skill:** `.opencode/skills/ui-ux-pro-max/SKILL.md`
- **Components:** `khelsetu-frontend/src/components/ui/`
- **Styles:** `khelsetu-frontend/src/styles/`
- **Animations:** `khelsetu-frontend/src/components/animations/`
