# Wesley Nabo - Personal Website

A simple HTML/CSS portfolio website with a space theme.

## Structure

```
website/
  index.html              # Main HTML file
  assets/
    css/                  # Stylesheets
      main.css
      noscript.css
      fontawesome-all.min.css
    images/               # Images and icons
      logo.png
      overlay-pattern.png
      overlay.svg
      space3.jpg
      ie/                 # IE-specific images
    webfonts/             # Font Awesome fonts
```

## Features

- **Smooth Scrolling Navigation** - Navigation bar that fades in/out based on scroll position
- **Space Theme** - Animated starfield background
- **Spaceship Element** - Parallax spaceship that moves with scroll
- **Responsive Design** - Works on desktop, tablet, and mobile devices
- **Easy to Extend** - Simple HTML structure for adding new experiences and projects

## Sections

1. **Landing** - Hero section with introduction
2. **Experience** - Professional work experiences
3. **Projects** - Project showcase
4. **Contact** - Contact information and social links

## Running Locally

Simply open `index.html` in a web browser or use a live server extension in your code editor.

### Using VS Code Live Server

1. Install the "Live Server" extension
2. Right-click on `index.html`
3. Select "Open with Live Server"

### Using Python (if installed)

```bash
python -m http.server 8000
```

Then open `http://localhost:8000` in your browser.

## Adding New Content

### Adding a New Experience

Copy and paste this block in the `#experience` section:

```html
<div class="entry">
    <h3>Job Title</h3>
    <p class="meta">Company Name &nbsp;&bull;&nbsp; Date Range</p>
    <p>Description of your role and responsibilities.</p>
</div>
```

### Adding a New Project

Copy and paste this block in the `#projects` section:

```html
<div class="entry">
    <h3>Project Name</h3>
    <p class="meta">Technologies Used &nbsp;&bull;&nbsp; Date</p>
    <p>Description of your project.</p>
</div>
```

## Technologies

- Pure HTML5
- CSS3 (with animations and transitions)
- Vanilla JavaScript (for smooth scrolling and navigation effects)
- Font Awesome (for icons)

