# Noah Rozin — Personal Portfolio

Personal portfolio website for Noah Rozin, senior at Staten Island Technical High School.
Built with plain HTML, CSS, and JavaScript — no build step required.

## Running Locally

**Option 1 — Open directly:**
Open `index.html` in any browser.

**Option 2 — Local dev server (recommended, avoids file:// quirks):**

```bash
# Python (usually pre-installed)
python -m http.server 8000

# Or Node.js
npx serve .
```

Then visit [http://localhost:8000](http://localhost:8000).

## Structure

```
├── index.html              # Home — About, Skills, Awards
├── projects.html           # Projects showcase (SammyGPT, Ace of Ages, Chamber)
├── blog.html               # Blog post index
├── blog/
│   ├── growth-milestone.html   # When RAG clicked: SammyGPT build log
│   ├── teamwork.html           # Leading 12,000 Key Club members
│   └── capstone.html           # Four-year SITHS retrospective
├── css/style.css           # All styles (dark navy theme, responsive)
├── js/main.js              # Nav active state + mobile hamburger
└── README.md
```

## Customization

- **Photo**: In `index.html`, replace the `.about-photo-placeholder` div with `<img src="your-photo.jpg" alt="Noah Rozin" style="width:260px;border-radius:4px;border:2px solid var(--accent)">`
- **GitHub URL**: Search for `YOUR_GITHUB_URL` and replace with your actual GitHub profile link
- **Project links**: Each project card has placeholder `href="#"` — update with real repo/demo URLs
