# LuxeDining — Restaurant Website

A responsive restaurant website concept built with **HTML, CSS, and vanilla JavaScript**. LuxeDining uses a dark interface with gold accents to present menu items, prices, and restaurant navigation.

> **Project status:** Static front-end website. Menu imagery is loaded from remote Unsplash URLs, so an internet connection is required for those images.

## Table of Contents

- [Overview](#overview)
- [Problem Statement](#problem-statement)
- [Solution and Engineering Decisions](#solution-and-engineering-decisions)
- [Features](#features)
- [Project Structure](#project-structure)
- [Run Locally](#run-locally)
- [Image Troubleshooting](#image-troubleshooting)
- [Responsive Design](#responsive-design)
- [Testing Checklist](#testing-checklist)
- [Known Limitations](#known-limitations)
- [Contributing](#contributing)

## Overview

LuxeDining is a multi-page restaurant website with a premium black-and-gold visual theme. The repository includes separate pages for the home page, menu, contact/location, and login interface.

## Problem Statement

The menu page previously displayed broken-image icons or empty image areas. This made menu cards inconsistent and reduced the quality of the user experience. The layout also needed to adapt more predictably to desktop, tablet, and mobile screen sizes.

### Likely causes investigated

- Image files referenced with relative paths that may not exist at the deployed path.
- Remote image URLs that may fail because of a typo, unavailable resource, network restrictions, or an external service issue.
- Differences between the local project and the version served by the hosting provider.
- Cached browser or deployment content.
- Menu cards and navigation needing explicit responsive rules.

A broken image should be diagnosed by checking the actual request in the browser; replacing URLs without verifying the response does not guarantee a fix.

## Solution and Engineering Decisions

The menu implementation follows these principles:

1. **Explicit image sources:** Menu cards use complete HTTPS image URLs rather than relying on local image files that may be missing.
2. **Graceful degradation:** An image error handler attempts a fallback and avoids an infinite fallback loop. If that also fails, the image is hidden rather than displaying a broken-image icon.
3. **Responsive grid:** CSS Grid adapts the menu to three columns on wide screens, two on medium screens, and one on narrow screens.
4. **Accessible controls:** Category filters expose their state through `aria-pressed`; the mobile navigation toggle exposes its expanded state.
5. **Progressive debugging:** Browser developer tools and the deployed page should be used to verify image requests and deployment output before concluding the issue is resolved.

**Recommended production improvement:** Download approved, licensed menu photos into a repository-managed `assets/images/` directory and reference them with relative paths. This reduces dependence on third-party image hosting and makes the image assets version-controlled.

## Features

- Dark, gold-accented restaurant design.
- Menu cards with item names, descriptions, prices, and photos.
- **All**, **Food**, and **Drinks** category filters.
- Responsive menu grid.
- Mobile navigation toggle.
- Remote image error handling.
- Automatic current year in the footer.
- Separate HTML pages for the main site sections.

## Project Structure

The current repository includes the following top-level files and source directories:

```text
restaurant/
├── index.html
├── menu.html
├── contact.html
├── login.html
├── validate.js
└── src/
    ├── css/
    │   └── style.css
    ├── js/
    │   └── main.js
    └── assets/
        └── images/   # Add locally managed images here if desired
```

The exact contents of `src/` may change as the project evolves. The menu page currently includes page-specific CSS and JavaScript in addition to loading shared assets.

## Run Locally

No package installation or build step is required for the static pages.

### Option 1: Open directly

1. Clone or download this repository.
2. Open the project folder.
3. Open `index.html` in a browser.

### Option 2: Use VS Code Live Server

1. Open the repository folder in Visual Studio Code.
2. Install the **Live Server** extension if needed.
3. Right-click `index.html` and choose **Open with Live Server**.
4. Visit `menu.html` to test the menu page.

A local web server is recommended because it more closely matches how the pages are served after deployment.

## Image Troubleshooting

If an image is missing in the deployed website:

1. Open the menu page in the browser.
2. Open Developer Tools (**F12**) and select **Network**.
3. Filter requests by **Img** and reload the page.
4. Select the failed image request and inspect its URL and HTTP status.
5. Open that exact image URL in a new tab to distinguish a bad URL from a hosting or network issue.
6. Check the **Console** for content-security, network, or JavaScript errors.
7. Confirm the deployed page is the latest version of `menu.html` on the expected branch.
8. After a new deployment, hard-refresh the page (**Ctrl + Shift + R**).

### Common symptoms

| Symptom | What to check |
| --- | --- |
| HTTP 404 | The image path or filename is incorrect, or the resource no longer exists. |
| HTTP 403 | The image host may deny the request. Use a permitted asset source. |
| Network error | Check connectivity, browser extensions, DNS, and the image host's availability. |
| Works locally but not after deployment | Check path casing, relative paths, deployment root, and whether the latest commit was deployed. |
| Image loads but shows the wrong photo | Verify the URL points to the intended asset; use repository-managed images for predictable results. |

Do not treat a hard refresh as a fix for a broken URL. It only helps when stale cached content is the cause.

## Responsive Design

The menu uses CSS Grid and media queries:

- **Desktop:** Three columns.
- **Tablet / medium screens:** Two columns.
- **Mobile:** One column, with a collapsible navigation menu.

When making layout changes, verify that long dish names and prices wrap cleanly and that buttons remain usable with touch input.

## Testing Checklist

Before merging or deploying a change, check:

- [ ] Open `index.html`, `menu.html`, `contact.html`, and `login.html`.
- [ ] Confirm every menu image request succeeds or degrades gracefully.
- [ ] Test **All**, **Food**, and **Drinks** filters.
- [ ] Test mobile navigation using both mouse/touch and keyboard.
- [ ] Check the page at desktop, tablet, and mobile widths.
- [ ] Inspect browser Console and Network panels for errors.
- [ ] Confirm the deployed version matches the latest intended commit.

These are recommended checks; they should be marked complete only after they have actually been run.

## Known Limitations

- Menu photos currently depend on remote image hosting and internet connectivity.
- The image fallback is defensive behavior, not a guarantee that every image URL is available.
- The repository is a static front-end project; a real login system, database-backed menu, order processing, and reservation workflow require additional implementation and appropriate backend services.
- Menu items, prices, and contact information should be reviewed before using the website for a real restaurant.

## Contributing

1. Create a branch for your change.
2. Make a focused update and keep shared styles consistent.
3. Test the affected page at desktop and mobile widths.
4. Verify image requests and check the browser Console.
5. Commit with a descriptive message, for example:

   ```text
   Fix menu image loading and responsive layout
   ```

6. Open a pull request describing the problem, the fix, and the checks performed.

---

Built with HTML, CSS, and vanilla JavaScript.
