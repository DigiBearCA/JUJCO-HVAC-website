<div align="center">
  <img src="assets/img/logo-mark.png" alt="JUJCO Logo" width="150"/>
  <h1>🔥 JUJCO Heating & Cooling ❄️</h1>
  <p><em>Premium HVAC Services Website Project</em></p>
  
  <p>
    <a href="https://digibearca.com"><img src="https://img.shields.io/badge/Maintained%20By-DigiBearCA-FF9900?style=for-the-badge&logo=codeigniter&logoColor=white" alt="DigiBearCA"></a>
  </p>
</div>

---

## 🌟 About JUJCO

Welcome to **JUJCO Heating & Cooling**. This repository contains the official frontend web architecture for an HVAC service provider based in Edmonton, Alberta. It serves as a digital storefront offering residential and commercial heating, ventilation, and air conditioning solutions.

---

## 🔬 Project Architecture & Deep Analysis

Unlike a traditional Content Management System (CMS) or a Single-Page Application (SPA) built with React/Vue, this project utilizes a **Script-Assisted Static Site Architecture**. It relies on flat HTML files augmented by custom Python and PowerShell scripts to handle templating, bulk updates, and structural injection.

### 1. Automation & Build Scripts
The root directory contains utility scripts that act as a pseudo-Static Site Generator (SSG). These scripts parse and patch the `.html` files in bulk:
- **`_wow_pages.py` (Python)**: Parses the HTML files to inject motion patterns, append `jtheme` and `jmorph` CSS classes, standardize breadcrumb navigation logic (`crumbs()`), and dynamically replace hero headers across all service and detail pages.
- **`_bulk_all.ps1` (PowerShell)**: A robust bulk-update script that:
  - Cleans up text encodings, replacing corrupted UTF-8 sequences (mojibake) with proper typographic characters (en-dashes, em-dashes, smart quotes).
  - Conditionally injects MP4 preloader video tags depending on whether it's the index or an inner page.
  - Automatically fixes and clones items for CSS marquee tracks.
  - Conditionally hides or displays specific sections (like Pricing) based on the page context.

### 2. Frontend Assets & Styling
- **CSS Framework**: Built on **Bootstrap** for reliable and responsive grid layouts.
- **Custom Animations**: Heavy emphasis on micro-interactions and scroll-animations using custom JS (`animations.js`, `jujco-anim2.js`, `jujco-motion.js`) and `wow.min.js`.
- **Cinematic Preloader**: A custom, intricate pre-loader handled by `intro.js` featuring film-grain, glow effects, and animated rotors representing HVAC fans.
- **Carousels**: Integrated with `jquery.slick.min.js` for content sliders.

### 3. File Structure Pattern
The project scales by isolating page types into specific HTML files:
- **Index Pages**: `index.html`, `index-2.html`, `home-v2.html`
- **Service Pages**: `service-*.html` (e.g., `service-furnace-installation.html`)
- **Project/Portfolio Pages**: `project-*.html`
- **Blog Pages**: `blog-*.html`
- **Team Profiles**: `team-*.html`

---

## 📖 For Non-Coders: What is this Project?

This project is the **official website** for JUJCO Heating & Cooling. Think of it as a digital storefront. Just as a physical store needs a well-designed layout, friendly signs, and a welcoming entrance, a business needs a website that looks professional and helps customers find what they need quickly.

Here is a simple breakdown of what this project contains:
- **The Visual Design**: It includes all the fonts, colors, images, and animations (like the cool cinematic intro when you first open the site) that make the website look modern, trustworthy, and premium.
- **The Engine Under the Hood**: Although it's a standard website, it uses custom mini-programs (scripts) to automatically update formatting, fix typos, and apply the same visual style across all 50+ pages at once. This means if we need to change the style of the top banner, we run a script instead of changing 50 files by hand!
- **The Content**: Everything from describing furnace repairs and AC installations to showcasing past work and introducing the team members.

---

## 👑 Ownership

This project is proudly owned and managed by **[DigiBearCA.com](https://digibearca.com/)**.

---

## 💻 Tech Stack

<div align="center">
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5" />
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3" />
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript" />
  <img src="https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white" alt="Python" />
  <img src="https://img.shields.io/badge/PowerShell-5391FE?style=for-the-badge&logo=powershell&logoColor=white" alt="PowerShell" />
</div>

<p align="center">
  <br>
  <em>Designed and maintained with ❤️ for JUJCO Heating & Cooling.</em>
</p>