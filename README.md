#  Personal Portfolio Website


A modern, responsive, and developer-centric personal portfolio website built using HTML5, CSS3, JavaScript, and a variety of frontend libraries. The site showcases personal information, education, work experience, skills, and projects, all optimized for performance, interactivity, and accessibility.

---

##  Features

- Responsive design using Bootstrap
- Animated typing effect with Typed.js
- Image galleries with Venobox
- Scroll-triggered counters and animations
- Project filtering with Isotope
- Integrated contact form (PHP-based)
- Organized file structure for scalability
- GitHub Actions for automated deployment

---

##  Technologies & Libraries

- HTML5, CSS3, JavaScript
- Bootstrap 4+
- jQuery & jQuery plugins
- Owl Carousel
- Typed.js
- Venobox
- Isotope Layout
- Font libraries: Boxicons, Icofont, Remixicon

---

##  Folder Structure

```mermaid
graph TD;
  A[root]
  A --> B[assets]
  B --> B1[css/style.css]
  B --> B2[js/main.js]
  B --> B3[img]
  B3 --> B31[background/]
  B3 --> B32[certification/]
  B3 --> B33[education/]
  B3 --> B34[project/]
  B3 --> B35[me.jpg]
  B3 --> B36[profile.jpg]
  B --> B4[vendor]
  B4 --> |Bootstrap, jQuery, Owl, Typed.js, etc.| B4libs[...]
  A --> C[preview]
  C --> |Screenshots| C1[about.jpg, contact.jpg, education.jpg, experience.jpg, home.jpg, project.jpg, skill.jpg]
  A --> D[projects]
  A --> E[resume]
  A --> F[LICENSE]
  A --> G[favicon.png]
```

---

##  Preview

| Home | About | Education | Experience |
|------|-------|-----------|------------|
| ![](preview/home.jpg) | ![](preview/about.jpg) | ![](preview/education.jpg) | ![](preview/experience.jpg) |

| Skills | Projects | Contact |
|--------|----------|---------|
| ![](preview/skill.jpg) | ![](preview/project.jpg) | ![](preview/contact.jpg) |

---

##  Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/la-b-ib/your-repo-name.git
   cd your-repo-name
   ```

2. **Open `index.html` in a browser**
   You can use Live Server if you're using VS Code:
   ```
   Right-click on index.html → "Open with Live Server"
   ```

3. **Customize your content**
   - Update images in `assets/img`
   - Modify `assets/css/style.css` for theme changes
   - Update text in HTML sections

---

##  GitHub Actions – Deployment Workflow

A GitHub Actions workflow has been added to automate deployment (for example, to GitHub Pages or any static host).

### `.github/workflows/deploy.yml`
```yaml
name: Deploy Portfolio

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Code
        uses: actions/checkout@v3

      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./ # or specify the build/output directory
```

Make sure to update the `publish_dir` to the folder you want to serve (typically root for static portfolios).

---




##  Performance Optimization

- **Image Optimization:** Use compressed `.jpg` images in `assets/img` and lazy loading techniques to enhance load times.
- **Minification:** CSS and JS files can be minified using tools like `uglify-js` or `cssnano` before deployment.
- **Caching:** Add headers for caching static resources on deployment (e.g., via `.htaccess` or hosting provider settings).
- **CDN Usage:** External libraries (e.g., Bootstrap, jQuery) can be optionally loaded from a CDN to reduce initial bundle size.

---

##  SEO and Accessibility

- **Meta Tags:** Includes descriptive meta tags for improved search engine indexing.
- **Semantic HTML:** Uses semantic elements like `<header>`, `<section>`, `<footer>` for better accessibility.
- **Alt Attributes:** All images support `alt` attributes for screen readers.
- **Keyboard Navigation:** Interactive elements are accessible via keyboard (focusable and tabbable).

---

##  Development Tips

- Use **Live Server** in VS Code for live reloading while editing HTML/CSS/JS.
- Maintain modular JS structure by separating components in `assets/js/`.
- Prefer **rem/em** units over **px** for responsive design consistency.
- Leverage browser dev tools for performance profiling and debugging.

---

##  Deployment Recommendations

- **GitHub Pages:** Free hosting for static sites; just push to `gh-pages` branch or configure `deploy.yml`.
- **Netlify or Vercel:** CI/CD deployment with custom domains, HTTPS, and build previews.
- **FTP Deployment:** Manual option for hosting on traditional web servers via cPanel, FileZilla, etc.

---

##  Contact Integration Notes

- Contact form uses `php-email-form` and requires server-side PHP support.
- Configure `assets/vendor/php-email-form/validate.js` and backend PHP script for email routing.
- For hosted services like Netlify Forms or Formspree, replace the form action URL accordingly.

---

##  Future Enhancements (Suggestions)

- Add dark mode toggle using CSS variables and localStorage.
- Integrate a blog section using markdown + static site generator (e.g., Eleventy).
- Add animation triggers using IntersectionObserver for better performance.
- Convert to PWA for offline access and mobile-friendly installability.

##  License

This project is licensed under the terms of the MIT license. See the [LICENSE](LICENSE) file for details.

---
