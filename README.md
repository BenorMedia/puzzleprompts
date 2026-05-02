# Puzzle AI Close Prompt Library — Open (No Gate)

The full prompt library page without the lead capture form. Hero section, filter bar, search, and all 29 prompt cards are fully visible and interactive.

---

## Files

| File | Purpose |
|---|---|
| `index.html` | Page structure — hero, filter bar, prompt cards grid, footer |
| `styles.css` | All styling (no HubSpot overrides needed) |
| `app.js` | Prompt card rendering, filter/search logic |

---

## Webflow Integration

### Option A: Full Page (Recommended)

Host on GitHub Pages and link from Webflow navigation.

1. Push this repo to GitHub
2. Enable GitHub Pages (Settings → Pages → Deploy from `main` branch)
3. Live at `https://<your-org>.github.io/puzzle-prompt-library/`
4. In Webflow, link the "Prompts" nav item to this URL

### Option B: Embed in Webflow Page

1. Add an **Embed** element in Webflow
2. Paste:

```html
<link rel="stylesheet" href="https://<your-org>.github.io/puzzle-prompt-library/styles.css" />
<div id="puzzle-prompt-library">
  <!-- Copy the contents of index.html <body> here -->
</div>
<script src="https://<your-org>.github.io/puzzle-prompt-library/app.js"></script>
```

### Option C: Webflow Custom Code Injection

1. **Head Code:**
```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
<link rel="stylesheet" href="https://<your-org>.github.io/puzzle-prompt-library/styles.css" />
```
2. **Footer Code:**
```html
<script src="https://<your-org>.github.io/puzzle-prompt-library/app.js"></script>
```

---

## Customization

### Adding/removing prompts
Edit the `PROMPTS` array at the top of `app.js`. Each prompt needs: `id`, `title`, `description`, `category` ("Accounting" or "Insights"), and `tags` (array of strings).

### Updating stat counts
Edit the stat numbers directly in `index.html` (the `hero-stat-number` spans).

---

## GitHub Pages Deployment

```bash
git init
git add .
git commit -m "Initial commit: Puzzle prompt library (open)"
git remote add origin https://github.com/<your-org>/puzzle-prompt-library.git
git push -u origin main
```

Then enable GitHub Pages in the repo settings.
