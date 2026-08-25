#!/usr/bin/env python3
"""Fix crumbs + type, restyle leftover listing pages, inject motion."""
from __future__ import annotations

import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent

ADDR = "10104 103 Avenue NW, Edmonton, AB T5J 0X9"
OFFICE = "(780) 982-2577"
EMERG = "(780) 982-3377"


def crumbs(items: list[tuple[str | None, str]]) -> str:
    bits = ['<nav class="jcrumbs" aria-label="Breadcrumb">']
    for i, (href, label) in enumerate(items):
        if i:
            bits.append('<span class="jcrumbs__sep" aria-hidden="true">/</span>')
        if href:
            bits.append(f'<a href="{href}">{label}</a>')
        else:
            bits.append(f'<span class="jcrumbs__now">{label}</span>')
    bits.append("</nav>")
    return "".join(bits)


def replace_ol_breadcrumbs(html: str) -> str:
    def repl(m: re.Match) -> str:
        inner = m.group(1)
        items = []
        for a in re.finditer(
            r'<li class="breadcrumb-item(?:\s+active)?"[^>]*>\s*(?:<a href="([^"]+)">)?(.*?)(?:</a>)?\s*</li>',
            inner,
            re.S,
        ):
            href = a.group(1)
            label = re.sub(r"<[^>]+>", "", a.group(2)).strip()
            label = re.sub(r"\s+", " ", label)
            if label:
                items.append((href, label))
        return crumbs(items) if items else m.group(0)

    return re.sub(r'<ol class="breadcrumb">([\s\S]*?)</ol>', repl, html)


def hero(badge: str, title: str, items: list[tuple[str | None, str]], lede: str, image: str) -> str:
    return f"""  <section class="jdetail-hero jpage-hero cs_bg_filed" data-src="{image}">
    <div class="jmorph" aria-hidden="true">
      <span class="jmorph__orb jmorph__orb--cool"></span>
      <span class="jmorph__orb jmorph__orb--heat"></span>
    </div>
    <div class="jdetail-hero__in">
      <span class="jdetail-badge">{badge}</span>
      <h1>{title}</h1>
      {crumbs(items)}
      <p class="jdetail-lede">{lede}</p>
    </div>
  </section>
"""


def replace_cs_heading(html: str, badge: str, title: str, items, lede: str, image: str) -> str:
    new = hero(badge, title, items, lede, image)
    html = re.sub(
        r"<!-- Start Page Heading -->[\s\S]*?<!-- End Page Heading -->",
        new,
        html,
        count=1,
    )
    return html


def add_morph_to_detail_heroes(html: str) -> str:
    if "jmorph__orb" in html:
        return html
    return html.replace(
        '<div class="jdetail-hero__in">',
        '<div class="jmorph" aria-hidden="true">'
        '<span class="jmorph__orb jmorph__orb--cool"></span>'
        '<span class="jmorph__orb jmorph__orb--heat"></span></div>\n    '
        '<div class="jdetail-hero__in">',
        1,
    )


def set_body_theme(html: str, theme: str) -> str:
    if 'class="jtheme' in html:
        html = re.sub(
            r'<body class="jtheme jtheme--[a-z]+"',
            f'<body class="jtheme jtheme--{theme}"',
            html,
            count=1,
        )
        return html
    return html.replace("<body>", f'<body class="jtheme jtheme--{theme}">', 1)


def inject_motion(html: str) -> str:
    html = html.replace("style.css?v=uniq1", "style.css?v=wow1")
    html = html.replace("jujco-details.css?v=uniq1", "jujco-details.css?v=wow1")
    html = html.replace("jujco-details.css?v=wow1", "jujco-details.css?v=wow1")
    html = html.replace("main.js?v=uniq1", "main.js?v=wow1")
    html = html.replace("jujco-details.js?v=uniq1", "jujco-details.js?v=wow1")
    if "jujco-motion.js" not in html:
        html = html.replace(
            '<script src="assets/js/jujco-details.js?v=wow1"></script>',
            '<script src="assets/js/jujco-details.js?v=wow1"></script>\n  '
            '<script src="assets/js/jujco-motion.js?v=wow1"></script>',
        )
        html = html.replace(
            '<script src="assets/js/jujco-details.js?v=uniq1"></script>',
            '<script src="assets/js/jujco-details.js?v=wow1"></script>\n  '
            '<script src="assets/js/jujco-motion.js?v=wow1"></script>',
        )
    return html


def swap_middle(html: str, new_mid: str) -> str:
    start = html.find("<!-- End Header Section -->")
    end = html.find("<!-- Start Footer -->")
    if start < 0 or end < 0:
        raise SystemExit("markers missing")
    start = start + len("<!-- End Header Section -->")
    return html[:start] + "\n" + new_mid + "\n" + html[end:]


ABOUT = f"""
{hero("Edmonton shop", "Built for Alberta winters", [("index.html", "Home"), (None, "About")],
      "Furnaces, heat pumps, and emergency heat — run like a shop, not a brochure.",
      "assets/img/hvac_about.jpg")}
  <section class="jdetail">
    <div class="container">
      <div class="jstory">
        <div data-rise>
          <img src="assets/img/hvac_about.jpg" alt="JUJCO technician at an Edmonton furnace">
        </div>
        <div>
          <span class="jdetail-kicker">Who we are</span>
          <h2>A heating and cooling crew that still talks like people</h2>
          <p>JUJCO Heating &amp; Cooling works Edmonton homes through January snaps and July heat. We size equipment, repair what is worth repairing, and say so when it is not. The shop number is {OFFICE}. After hours, {EMERG}.</p>
          <p>You will get an arrival window, a look at the mechanical room before anyone sells a furnace, and a system that is commissioned before we leave. Address: {ADDR}.</p>
        </div>
      </div>
      <div class="jstats">
        <div class="jstat j3d"><strong data-count-to="25" data-count-suffix="+">25+</strong><span>Years in the trade</span></div>
        <div class="jstat j3d"><strong>24/7</strong><span>Emergency line</span></div>
        <div class="jstat j3d"><strong data-count-to="2">2</strong><span>Phones. Office + night</span></div>
        <div class="jstat j3d"><strong>AB</strong><span>Licensed &amp; insured</span></div>
      </div>
      <span class="jdetail-kicker">How a job runs</span>
      <h2>Four steps. No mystery truck.</h2>
      <div class="jtimeline">
        <div class="jtime j3d"><span class="jtime__n">1</span><h3>Book</h3><p>Call or the form. Same-day when the board allows.</p></div>
        <div class="jtime j3d"><span class="jtime__n">2</span><h3>See it</h3><p>We inspect, then explain in plain language.</p></div>
        <div class="jtime j3d"><span class="jtime__n">3</span><h3>Do the work</h3><p>Repair or install. Mechanical room left sweepable.</p></div>
        <div class="jtime j3d"><span class="jtime__n">4</span><h3>Prove it</h3><p>Commission at the thermostat. Paperwork in your hand.</p></div>
      </div>
      <div class="jdetail-when">
        <h3>Need the crew?</h3>
        <p>Office {OFFICE} · Emergency {EMERG} · {ADDR}</p>
        <a class="cs_btn cs_style_1 cs_color_1" href="contact.html"><span>Book a visit</span></a>
      </div>
    </div>
  </section>
"""

CONTACT = f"""
{hero("Talk to the shop", "Call, book, or show up", [("index.html", "Home"), (None, "Contact")],
      "Office for quotes. Emergency line when the house is actually cold — or dangerously hot.",
      "assets/img/hvac_strip_3.jpg")}
  <section class="jdetail">
    <div class="container">
      <div class="row cs_gap_y_40">
        <div class="col-lg-6">
          <span class="jdetail-kicker">Numbers that work</span>
          <h2>Save both. Use the right one.</h2>
          <div class="jphones">
            <a class="jphone j3d" href="tel:+17809822577">
              <small>Office · quotes &amp; weekday</small>
              <strong>{OFFICE}</strong>
            </a>
            <a class="jphone jphone--emer j3d" href="tel:+17809823377">
              <small>Emergency · nights &amp; no-heat</small>
              <strong>{EMERG}</strong>
            </a>
          </div>
          <p><strong>Shop</strong><br>{ADDR}</p>
          <p><strong>Email</strong><br><a href="mailto:info@jujcohvac.com">info@jujcohvac.com</a></p>
          <p><strong>Hours</strong><br>Mon–Fri 8–8 · Sat 9–5 · Sun emergency only</p>
        </div>
        <div class="col-lg-6">
          <form id="contactForm" class="cs_contact_form jform-card">
            <h2 class="cs_fs_30 cs_semibold">Book a visit</h2>
            <input type="text" class="cs_form_field cs_mb_15" name="name" placeholder="Your Name" required>
            <input type="email" class="cs_form_field cs_mb_15" name="email" placeholder="Email" required>
            <input type="tel" class="cs_form_field cs_mb_15" name="phone" placeholder="Phone" required>
            <select class="cs_form_field cs_mb_15" name="service" required>
              <option value="">What do you need?</option>
              <option>Furnace Installation</option>
              <option>Furnace Repair</option>
              <option>Heat Pump Installation</option>
              <option>AC Installation</option>
              <option>AC Repair</option>
              <option>Boiler / Hydronic</option>
              <option>Air Duct Cleaning</option>
              <option>Indoor Air Quality</option>
              <option>Emergency Service</option>
              <option>Tune-Up</option>
            </select>
            <textarea class="cs_form_field cs_mb_15" name="message" rows="4" placeholder="What is the system doing?"></textarea>
            <button class="cs_btn cs_style_1 w-100" type="submit"><span>Send</span></button>
          </form>
        </div>
      </div>
    </div>
  </section>
  <div class="jmap-wrap">
    <iframe title="Map of JUJCO Heating &amp; Cooling in Edmonton"
      src="https://maps.google.com/maps?q=10104%20103%20Avenue%20NW,%20Edmonton,%20AB%20T5J%200X9,%20Canada&t=&z=14&ie=UTF8&iwloc=&output=embed"
      allowfullscreen loading="lazy"></iframe>
  </div>
"""

PRIVACY = f"""
{hero("Legal", "Privacy & terms", [("index.html", "Home"), (None, "Privacy")],
      "What we collect, why, and how a JUJCO job is billed. No fine-print theatre.",
      "assets/img/page_heading_1.jpg")}
  <section class="jdetail">
    <div class="container">
      <div class="row">
        <div class="col-lg-8 jprose">
          <h2>Privacy</h2>
          <p>JUJCO Heating &amp; Cooling collects what we need to book and finish HVAC work in Edmonton: name, phone, email, service address, and notes about the equipment. We do not sell that list.</p>
          <h3>How it is used</h3>
          <p>Scheduling, estimates, follow-up, and maintenance reminders you asked for. Payments go through PCI-compliant processors — we do not keep card numbers on a shop PC.</p>
          <h3>Cookies</h3>
          <p>Basic analytics and preferences. Turn cookies off if you want; you can still request service.</p>
          <h2>Terms</h2>
          <h3>Estimates</h3>
          <p>Written numbers after we see the system. We do not start billable extras without your say-so.</p>
          <h3>Warranties</h3>
          <p>Manufacturer coverage on new equipment plus JUJCO labour. Periods are on the invoice.</p>
          <h3>Emergencies</h3>
          <p>No-heat, gas, CO, and no-cool in a heat warning jump the board. After-hours dispatch costs more than a Tuesday slot — we say that on the phone.</p>
          <p>Questions: <a href="mailto:info@jujcohvac.com">info@jujcohvac.com</a> or {OFFICE}.</p>
          <a class="cs_btn cs_style_1" href="contact.html"><span>Contact</span></a>
        </div>
        <div class="col-lg-4">
          <div class="jdetail-callout">
            <h3>Shop</h3>
            <p>{ADDR}</p>
            <a href="tel:+17809822577">Office {OFFICE} →</a>
            <a href="tel:+17809823377">Emergency {EMERG} →</a>
          </div>
        </div>
      </div>
    </div>
  </section>
"""

SITEMAP = f"""
{hero("Find a page", "Sitemap", [("index.html", "Home"), (None, "Sitemap")],
      "Every public page, grouped the way the shop actually works.",
      "assets/img/page_heading_1.jpg")}
  <section class="jdetail">
    <div class="container">
      <div class="row cs_gap_y_40">
        <div class="col-md-4">
          <h2>Home &amp; company</h2>
          <ul class="jdetail-include">
            <li><a href="index.html">Home 1</a></li>
            <li><a href="home-v2.html">Home 2</a></li>
            <li><a href="about-us.html">About</a></li>
            <li><a href="contact.html">Contact</a></li>
            <li><a href="privacy.html">Privacy</a></li>
            <li><a href="team.html">Crew roles</a></li>
          </ul>
        </div>
        <div class="col-md-4">
          <h2>Services</h2>
          <ul class="jdetail-include">
            <li><a href="service.html">All services</a></li>
            <li><a href="service-furnace-installation.html">Furnace install</a></li>
            <li><a href="service-heat-pump-installation.html">Heat pump</a></li>
            <li><a href="service-boiler-hydronic.html">Boiler</a></li>
            <li><a href="service-heating-system-repair.html">Heating repair</a></li>
            <li><a href="service-ac-installation.html">AC install</a></li>
            <li><a href="service-ac-repair-maintenance.html">AC repair</a></li>
            <li><a href="service-air-duct-cleaning.html">Ducts</a></li>
            <li><a href="service-indoor-air-quality.html">Indoor air</a></li>
            <li><a href="service-emergency-service.html">Emergency</a></li>
            <li><a href="service-maintenance-tune-ups.html">Tune-ups</a></li>
          </ul>
        </div>
        <div class="col-md-4">
          <h2>Work &amp; writing</h2>
          <ul class="jdetail-include">
            <li><a href="projects.html">Projects</a></li>
            <li><a href="blog.html">Blog</a></li>
            <li><a href="blog-details.html">Furnace winter signs</a></li>
            <li><a href="blog-ac-stops-cooling.html">AC stops cooling</a></li>
            <li><a href="blog-spring-tune-up.html">Spring tune-up</a></li>
            <li><a href="blog-lower-cooling-bills.html">Cooling bills</a></li>
          </ul>
        </div>
      </div>
    </div>
  </section>
"""


def polish_service_list(html: str) -> str:
    html = replace_cs_heading(
        html,
        "The board",
        "What we actually do",
        [("index.html", "Home"), (None, "Services")],
        "Eight jobs. Each one has its own page now — tap Learn more for the short version.",
        "assets/img/hvac_strip_1.jpg",
    )
    return set_body_theme(html, "hybrid")


def polish_team(html: str) -> str:
    html = replace_cs_heading(
        html,
        "The crew",
        "Roles, not stock-photo names",
        [("index.html", "Home"), (None, "Team")],
        "Who owns the install, the night call, the quote, and the tune-up.",
        "assets/img/page_heading_1.jpg",
    )
    return set_body_theme(html, "gold")


def polish_projects(html: str) -> str:
    html = replace_cs_heading(
        html,
        "Recent work",
        "Jobs we can stand behind",
        [("index.html", "Home"), (None, "Projects")],
        "Furnace, heat pump, boiler, ducts, emergency — each card opens its own story.",
        "assets/img/project_1.jpg",
    )
    return set_body_theme(html, "heat")


def polish_blog(html: str) -> str:
    html = replace_cs_heading(
        html,
        "From the shop",
        "Notes you can use in January",
        [("index.html", "Home"), (None, "Blog")],
        "Four articles. Four different pages. No cloned 'blog details'.",
        "assets/img/post_1.jpg",
    )
    return set_body_theme(html, "cool")


def main() -> None:
    # Unique interiors
    about = Path("about-us.html").read_text(encoding="utf-8")
    Path("about-us.html").write_text(set_body_theme(swap_middle(about, ABOUT), "about"), encoding="utf-8")

    contact = Path("contact.html").read_text(encoding="utf-8")
    Path("contact.html").write_text(set_body_theme(swap_middle(contact, CONTACT), "contact"), encoding="utf-8")

    privacy = Path("privacy.html").read_text(encoding="utf-8")
    Path("privacy.html").write_text(set_body_theme(swap_middle(privacy, PRIVACY), "slate"), encoding="utf-8")

    sm = Path("sitemap.html").read_text(encoding="utf-8")
    Path("sitemap.html").write_text(set_body_theme(swap_middle(sm, SITEMAP), "gold"), encoding="utf-8")

    Path("service.html").write_text(polish_service_list(Path("service.html").read_text(encoding="utf-8")), encoding="utf-8")
    Path("team.html").write_text(polish_team(Path("team.html").read_text(encoding="utf-8")), encoding="utf-8")
    Path("projects.html").write_text(polish_projects(Path("projects.html").read_text(encoding="utf-8")), encoding="utf-8")
    for name in ("blog.html", "blog-2.html", "blog-3.html"):
        Path(name).write_text(polish_blog(Path(name).read_text(encoding="utf-8")), encoding="utf-8")

    # Sitewide crumbs, morph, cache, motion
    for path in sorted(ROOT.glob("*.html")):
        html = path.read_text(encoding="utf-8")
        html = replace_ol_breadcrumbs(html)
        if "jdetail-hero" in html:
            html = add_morph_to_detail_heroes(html)
        html = inject_motion(html)
        path.write_text(html, encoding="utf-8")

    print("wow pages done")


if __name__ == "__main__":
    main()