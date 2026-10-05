# ROVER Workspaces brand guidelines

This is the shared brand reference for the extension, website, support material,
beta instructions, and future administration pages. Implementation status belongs
in [STATUS.md](STATUS.md), not in marketing promises.

## Name and meaning

Use **ROVER Workspaces** for the product, and **ROVER** for the acronym:
**R**estore, **O**rganize, **V**iew, **E**xplore, **R**epeat.
The tagline is **Make room for focus**. The introductory sentence is:
“Pick up where you left off. ROVER means Restore, Organize, View, Explore, Repeat.”
Bold the first letters when formatting allows; preserve the words and order.
Use “Custom Templates,” “Collections,” and “Quick actions” consistently.

## Logo and typography

Use the existing three-dot orbital R mark from the app, beside a two-line lockup:
bold, spaced, uppercase ROVER; smaller Workspaces directly underneath. The website
uses the same PNG, with live text so the name remains readable and accessible.
Use an empty image alt when the neighboring text already names the product.
Keep the mark proportional; do not stretch, crop, redraw, or recolor it. Leave
clear space of at least one dot diameter on each edge. Below roughly 150 pixels
of total lockup width, use the mark alone with an accessible product label.

Use system-ui, Segoe UI, and sans-serif fallbacks. No remotely loaded fonts are
required. Body copy should remain readable at 15–16 pixels. Headings are bold,
with sentence case; avoid all-caps paragraphs.

## Color and interaction

| Role                          | Default value |
| ----------------------------- | ------------- |
| Primary blue / primary action | `#315c86`     |
| Primary hover                 | `#274c70`     |
| Logo accent / dark-page link  | `#55a7e8`     |
| Dark background               | `#121f2b`     |
| Dark surface                  | `#1d2b3a`     |
| Dark elevated surface         | `#293e53`     |
| Dark text                     | `#e6eff7`     |
| Light background              | `#f3f6f8`     |
| Light surface                 | `#ffffff`     |
| Light text                    | `#1f2933`     |

The app may honor user-selected theme, accent, and density; brand defaults must
not override those preferences. Filled primary actions open or save. Secondary
actions use quieter surfaces. Destructive actions use clear labels and red text.
Favorites use a gold filled star; unselected favorites use a muted outline.
State must also be communicated by labels, icons, or accessible pressed state.
Keep visible keyboard focus, sufficient contrast, and useful touch targets.

## Navigation and content

Website navigation is shared at build time across every page, with the current
page marked using `aria-current`. It wraps on narrow screens and works without
JavaScript. Always link Home, How it works, Documentation, Beta setup, Plans,
Privacy, and Support. Documentation pages use grouped guide navigation, an
On this page contents menu, and readable headings, tables, lists, and code.
Product links lead to the branded guides; GitHub links are reserved for source
history, editing, and issue reporting.
Admin pages remain separate and must be protected before deployment.

Use plain language. Explain local data, optional cloud features, and limitations
accurately. Label planned integrations and unavailable purchasing explicitly.
Never imply that the beta site is access-controlled simply because it is excluded
from search. Do not add analytics, ads, remote icons, or fonts without a deliberate
privacy and product decision. Screenshots must come from an accepted installed
build and must hide private URLs, names, and account information.

## Maintaining the brand

Update this reference first for an approved brand change, then update app and web
implementations together. The web layout and CSS live in `web/`; `site/` is the
generated, reviewed deployable output. Keep release and privacy facts in the
canonical documents and link to them from both surfaces.
