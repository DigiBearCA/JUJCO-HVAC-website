<div align="center">
  <img src="assets/img/logo-mark.webp" alt="JUJCO Logo" width="150"/>
  <h1>🔥 JUJCO Heating &amp; Cooling ❄️</h1>
  <p><em>Premium HVAC Services Website</em></p>

  <p>
    <a href="https://digibearca.com"><img src="https://img.shields.io/badge/Maintained%20By-DigiBearCA-FF9900?style=for-the-badge&logo=codeigniter&logoColor=white" alt="DigiBearCA"></a>
    <img src="https://img.shields.io/badge/Pages-42%20Active%20HTML-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="42 Active HTML Pages">
    <img src="https://img.shields.io/badge/Location-Alberta%2C%20Canada-0057A8?style=for-the-badge&logo=googlemaps&logoColor=white" alt="Alberta, Canada">
  </p>
</div>

---

## 🌟 About JUJCO

**JUJCO Heating & Cooling** provides residential and commercial heating, ventilation, and air conditioning solutions across **Alberta, Canada**. This repository contains the complete frontend website, delivering a fast, responsive, and cinematic web experience across **42 active HTML pages**.

---

## 🗂️ File Structure

The website is structured as a clean static site with pages organized by category:

| Category | Count | Key Files |
|---|---|---|
| **Home** | 1 | `index.html` |
| **Core Pages** | 8 | `about-us.html`, `contact.html`, `service.html`, `projects.html`, `blog.html`, `team.html`, `privacy.html`, `sitemap.html` |
| **Service Pages** | 12 | `service-furnace-installation.html`, `service-heat-pump-installation.html`, `service-ac-installation.html`, `service-heating-system-repair.html`, `service-ac-repair-maintenance.html`, `service-garage-heaters.html`, `service-boiler-hydronic.html`, `service-emergency-service.html`, `service-indoor-air-quality.html`, `service-maintenance-tune-ups.html`, `service-rooftop-units.html`, `service-air-duct-cleaning.html` |
| **Project Pages** | 9 | `project-furnace-installation.html`, `project-heat-pump-install.html`, `project-ac-repair-service.html`, `project-garage-heater-install.html`, `project-emergency-repair.html`, `project-annual-maintenance.html`, `project-rtu-replacement.html`, `project-indoor-air-quality.html`, `project-air-duct-cleaning.html` |
| **Blog Articles** | 4 | `blog-furnace.html`, `blog-spring-tune-up.html`, `blog-ac-stops-cooling.html`, `blog-lower-cooling-bills.html` |
| **Team Profiles** | 8 | `team-brooklyn-simmons.html`, `team-cameron-william.html`, `team-courtney-henry.html`, `team-details.html`, `team-kathryn-murphy.html`, `team-leslie-alexander.html`, `team-marvin-mckinney.html`, `team-savannah-nguyen.html` |
| **Redirect Helpers** | 3 | `blog-2.html`, `blog-3.html`, `blog-details.html` |

---

## ⚙️ Central Site Configuration & Synchronization

All site wide variables including domain, business phone numbers, email address, and social media channels are centralized in a single configuration file:

### 1. Master Config (`site.config.json`)
```json
{
  "domain": "https://jujcohvac.com",
  "siteName": "JUJCO Heating & Cooling",
  "email": "info@jujcohvac.com",
  "phone": "(780) 982 2577",
  "phoneRaw": "+17809822577",
  "emergencyPhone": "(780) 982 3377",
  "emergencyPhoneRaw": "+17809823377",
  "social": {
    "facebook": "https://www.facebook.com/jujco.heating.cooling/",
    "instagram": "https://www.instagram.com/jujcohvac",
    "tiktok": "https://www.tiktok.com/@jujcoheatingcooling"
  }
}
```

### 2. Automatic One Click Updater (`update-config.bat` / `update_config.py`)
Because social media crawlers require static absolute URLs in the HTML header, changing domain or contact information across 42 files is automated:

1. Edit any field inside `site.config.json` (such as adding your new production domain).
2. Double click **`update-config.bat`** (or run `python update_config.py`).
3. The script automatically detects modified values and updates all 42 HTML pages plus `assets/js/site-config.js` in under one second.

---

## 📱 Social Media Previews & Open Graph Assets

Every HTML page includes complete Open Graph and Twitter Card tags configured for optimal preview cards on WhatsApp, Facebook, Instagram, LinkedIn, and Twitter:

* **Preview Graphic**: `assets/img/og-image.jpg`
* **Resolution**: 1200 x 630 pixels (standard 1.91 to 1 aspect ratio)
* **File Size**: 169 KB (optimized well under WhatsApp's strict 300 KB thumbnail cap)
* **Format**: 24 bit RGB JPEG for universal compatibility across all mobile and desktop chat clients

---

## 🔬 Project Architecture

### 🎨 Styling (`assets/css/` — 7 files)

| File | Purpose |
|---|---|
| `style.css` | Master stylesheet including design tokens, layouts, and custom UI components |
| `animations.css` | Scroll triggered and entrance animations |
| `jujco-details.css` | Styles specific to detail and inner pages |
| `bootstrap.min.css` | Responsive grid foundation |
| `fontawesome.min.css` | Icon library |
| `animate.css` | Animation helper classes |
| `slick.min.css` | Carousel base styles |

### ⚙️ JavaScript (`assets/js/` — 10 files)

| File | Purpose |
|---|---|
| `site-config.js` | Client side configuration exposing `window.SITE_CONFIG` |
| `main.js` | Core site interactions, mobile menu, and form handling |
| `animations.js` | Custom scroll and entrance animation controller |
| `intro.js` | Cinematic preloader animation |
| `jujco-anim2.js` | Secondary animation layer and motion effects |
| `jujco-details.js` | Interactive popup modal data and click handlers |
| `jujco-motion.js` | Motion utility helpers |
| `wow.min.js` | Scroll triggered animation library |
| `jquery-3.6.0.min.js` | jQuery core library |
| `jquery.slick.min.js` | Slick carousel library |

### 📁 Asset Directories

```
assets/
├── css/             # All stylesheets (7 files)
├── js/              # All JavaScript (10 files)
├── img/             # Images, logos, team photos, og-image.jpg
├── fonts/           # Custom web fonts
└── product_videos/  # MP4 videos used in hero backgrounds and preloaders
```

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
  <img src="https://img.shields.io/badge/Bootstrap-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white" alt="Bootstrap" />
  <img src="https://img.shields.io/badge/Font_Awesome-528DD7?style=for-the-badge&logo=fontawesome&logoColor=white" alt="Font Awesome" />
</div>

<p align="center">
  <br>
  <em>Designed and maintained with care for JUJCO Heating &amp; Cooling across Alberta.</em>
</p>