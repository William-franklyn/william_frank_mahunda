# William Frank Mahunda — Portfolio

Personal portfolio website for Summer 2027 internship applications — Product Management, AI/ML Engineering, Forward-Deployed Engineering, Full-Stack, AI Agents, SRE, and Software Engineering roles.

**Live site:** https://william-franklyn.github.io/william_frank_mahunda/

## Structure

| File | Purpose |
|---|---|
| `index.html` | Main portfolio page (hero, about, experience, projects, AI4ALL, skills, contact) |
| `resume.html` | ATS-friendly resume (print-optimized, 2 pages) |
| `assets/William_Frank_Mahunda_Resume.pdf` | Downloadable resume PDF, generated from `resume.html` |
| `styles.css` / `script.js` | Styling and project-filter / mobile-nav behavior |

## Enabling GitHub Pages

1. Go to **Settings → Pages** in this repo.
2. Under "Build and deployment", set Source to **Deploy from a branch**, branch **main**, folder **/ (root)**.
3. The site will be live at the URL above within a minute or two.

## Updating the resume PDF

Edit `resume.html`, then regenerate the PDF (keep it ≤ 2 pages):

```
chrome --headless --no-pdf-header-footer --print-to-pdf="assets/William_Frank_Mahunda_Resume.pdf" resume.html
```

## Adding project demos

Live demos are already linked for **Workbox** (workbox-blue.vercel.app) and the **Data Visualization Library** (datavz.vercel.app). For the other projects, the "Demo & Code" buttons point to the GitHub repos — to showcase a recorded demo instead, add a demo video/GIF to each repo's README, or replace the button `href` in `index.html` with a hosted demo URL (YouTube, Vercel, etc.).
