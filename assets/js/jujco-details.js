/* Unique Learn More popups + click wiring. Full pages stay the destination. */
(function () {
  "use strict";

  var DATA = {
    "svc-furnace": {
      theme: "heat",
      badge: "Heating",
      title: "Furnace Installation",
      lede: "High-efficiency gas furnaces sized for Edmonton winters, installed clean and commissioned the same visit whenever the home is ready.",
      includeTitle: "What this visit includes",
      include: [
        "Manual-J style heat-loss sizing, not a guess from square footage",
        "Safe disconnect and haul-away of the old furnace",
        "Code venting, gas line, and condensate work",
        "Two-stage or modulating setup with a compatible thermostat",
        "Combustion and airflow commissioning",
        "10-year parts path plus JUJCO labour warranty",
      ],
      whenTitle: "Book this when",
      when: [
        "The furnace is 15+ years old or short-cycling",
        "Rooms upstairs stay cold in January",
        "You want a high-efficiency replacement before a failure",
        "A no-heat call showed the heat exchanger is done",
      ],
      page: "service-furnace-installation",
      book: "contact",
      call: "tel:+17809822577",
      callLabel: "Office (780) 982-2577",
    },
    "svc-heatpump": {
      theme: "hybrid",
      badge: "Heat & cool",
      title: "Heat Pump Installation",
      lede: "Cold-climate and dual-fuel heat pumps that still heat when it is −30°C, then flip to efficient cooling in July.",
      includeTitle: "What this visit includes",
      include: [
        "Cold-climate equipment selection rated for Alberta design days",
        "Dual-fuel pairing with your furnace when that is the better fit",
        "Line-set, electrical, and outdoor pad work",
        "Defrost and backup-heat settings done on site",
        "Rebate paperwork walkthrough",
        "One system for winter heat and summer cool",
      ],
      whenTitle: "Book this when",
      when: [
        "You want lower winter bills without losing backup heat",
        "You are replacing both a furnace and an AC",
        "A builder spec called for a heat pump",
        "You need cooling and heating from one outdoor unit",
      ],
      page: "service-heat-pump-installation",
      book: "contact",
      call: "tel:+17809822577",
      callLabel: "Office (780) 982-2577",
    },
    "svc-boiler": {
      theme: "heat",
      badge: "Hydronic",
      title: "Boiler & Hydronic Heating",
      lede: "Cast-iron to condensing boiler replacements and hydronic loops that keep radiators and in-floor heat even on the coldest nights.",
      includeTitle: "What this visit includes",
      include: [
        "Boiler sizing against radiation and in-floor load",
        "Primary/secondary piping where the old loop needs it",
        "New intake, exhaust, and condensate for condensing units",
        "Zone valve and circulator checks",
        "Outdoor-reset control setup",
        "System flush and inhibitor fill",
      ],
      whenTitle: "Book this when",
      when: [
        "The boiler is leaking, banging, or short on hot water",
        "Radiators are lukewarm on one side of the house",
        "You want a high-efficiency condensing swap",
        "In-floor heat never quite comes up to temp",
      ],
      page: "service-boiler-hydronic",
      book: "contact",
      call: "tel:+17809822577",
      callLabel: "Office (780) 982-2577",
    },
    "svc-heating": {
      theme: "heat",
      badge: "Repair",
      title: "Heating System Repair",
      lede: "Same-day furnace, boiler, and heat-pump diagnostics when the house is cold. We find the failed part, not a list of maybe parts.",
      includeTitle: "What this visit includes",
      include: [
        "Full heat sequence test, not just a code read",
        "Ignitor, flame sensor, inducer, and pressure-switch checks",
        "Heat-exchanger inspection when symptoms point there",
        "Control-board and thermostat diagnosis",
        "On-truck parts for common Edmonton furnaces",
        "Clear repair vs replace advice if the unit is old",
      ],
      whenTitle: "Book this when",
      when: [
        "No heat, short cycling, or a raw-gas smell",
        "The furnace blower never shuts off",
        "Error lights are blinking after a power blink",
        "One floor is hot and another is ice",
      ],
      page: "service-heating-system-repair",
      book: "contact",
      call: "tel:+17809823377",
      callLabel: "Emergency (780) 982-3377",
    },
    "svc-acinstall": {
      theme: "cool",
      badge: "Cooling",
      title: "AC Installation",
      lede: "Quiet, high-SEER central air sized to the home — not a copy of whatever was on the pad — so July afternoons stay even and the compressor lasts.",
      includeTitle: "What this visit includes",
      include: [
        "Load calc so the coil and condenser match the house",
        "New pad, whip, and disconnect as needed",
        "Line-set replacement or proper flush",
        "Correct refrigerant charge by weigh-in and superheat/subcool",
        "Old unit recovery and haul-away",
        "Thermostat setup for cooling lockouts",
      ],
      whenTitle: "Book this when",
      when: [
        "You have never had central air and want it before July",
        "The old condenser is loud, rusty, or R-22",
        "A new furnace is going in and the coil should match",
        "Upstairs bedrooms will not cool down",
      ],
      page: "service-ac-installation",
      book: "contact",
      call: "tel:+17809822577",
      callLabel: "Office (780) 982-2577",
    },
    "svc-acrepair": {
      theme: "cool",
      badge: "Repair",
      title: "AC Repair & Maintenance",
      lede: "Fast cooling repair when the house will not drop below 26°C, plus seasonal tune-ups so the same failure does not come back next heat wave.",
      includeTitle: "What this visit includes",
      include: [
        "Capacitor, contactor, and fan-motor tests",
        "Refrigerant leak search before any top-up",
        "Coil cleaning and condensate drain clear",
        "Amp draw and temperature-split readings",
        "Capacitor and contactor replacements from the truck",
        "A written note on remaining life of the compressor",
      ],
      whenTitle: "Book this when",
      when: [
        "The outdoor fan spins but the air is warm",
        "Ice is on the copper lines",
        "The breaker trips when cooling calls",
        "You want a spring check before the first 28°C day",
      ],
      page: "service-ac-repair-maintenance",
      book: "contact",
      call: "tel:+17809822577",
      callLabel: "Office (780) 982-2577",
    },
    "svc-ducts": {
      theme: "slate",
      badge: "Airflow",
      title: "Air Duct Cleaning",
      lede: "Source-removal duct cleaning that pulls dust, drywall grit, and pet dander out of the trunk lines so the system moves air instead of recycling it.",
      includeTitle: "What this visit includes",
      include: [
        "Negative-pressure setup on the trunk",
        "Agitation of supply and return runs",
        "Register and grille wipe-down",
        "Furnace blower compartment vacuum",
        "Optional dryer-vent add-on",
        "Before/after photos of the main trunk",
      ],
      whenTitle: "Book this when",
      when: [
        "You just renovated and the vents blow grit",
        "Allergy or dust complaints spiked",
        "One room has almost no airflow",
        "You have not cleaned ducts in a decade",
      ],
      page: "service-air-duct-cleaning",
      book: "contact",
      call: "tel:+17809822577",
      callLabel: "Office (780) 982-2577",
    },
    "svc-iaq": {
      theme: "air",
      badge: "Air quality",
      title: "Indoor Air Quality",
      lede: "HRV/ERV, power humidifiers, and filtration that fix dry winter air, stale rooms, and the static shock that comes with a tight Edmonton house.",
      includeTitle: "What this visit includes",
      include: [
        "Humidity and CO2 walkthrough of the home",
        "HRV/ERV sizing and duct takeoffs",
        "Bypass or fan-powered humidifier install",
        "Media cabinet or HEPA add-on",
        "Balanced airflow after the new equipment",
        "Simple filter and pad change instructions",
      ],
      whenTitle: "Book this when",
      when: [
        "Winter humidity sits under 25%",
        "Windows fog or furniture cracks",
        "Someone in the house has asthma or allergies",
        "The home feels stale with the furnace running",
      ],
      page: "service-indoor-air-quality",
      book: "contact",
      call: "tel:+17809822577",
      callLabel: "Office (780) 982-2577",
    },
    "svc-emergency": {
      theme: "urgent",
      badge: "24/7",
      title: "24/7 Emergency Service",
      lede: "No-heat at −28°C and no-cool in a heat wave are the calls we keep a truck ready for. Call the emergency line and we dispatch.",
      includeTitle: "What this visit includes",
      include: [
        "After-hours dispatch across Edmonton",
        "Safety check for gas, CO, and electrical",
        "Temporary heat if a part has to come in",
        "Common ignitors, capacitors, and boards on the truck",
        "A clear next-day plan if it is a bigger job",
        "Follow-up so you are not left guessing",
      ],
      whenTitle: "Call now if",
      when: [
        "There is no heat and it is below freezing",
        "You smell gas or a CO alarm is going off",
        "The AC died during a heat warning",
        "Water is leaking from the furnace or boiler",
      ],
      page: "service-emergency-service",
      book: "contact",
      call: "tel:+17809823377",
      callLabel: "Emergency (780) 982-3377",
    },
    "svc-tuneup": {
      theme: "gold",
      badge: "Maintenance",
      title: "Maintenance & Tune-Ups",
      lede: "Pre-winter furnace and pre-summer AC tune-ups that catch a $40 part before it becomes a Saturday night no-heat call.",
      includeTitle: "What this visit includes",
      include: [
        "Burner, heat exchanger, and flame-sensor clean",
        "Blower wheel and cabinet vacuum",
        "Filter check and thermostat test",
        "AC coil, drain, and electrical inspection",
        "Combustion or temperature-split numbers written down",
        "A punch-list of anything that will fail next season",
      ],
      whenTitle: "Book this when",
      when: [
        "October is coming and the furnace has not been opened",
        "May is coming and last summer was a close call",
        "You just bought the house and want a baseline",
        "You want a reminder plan, not a one-off",
      ],
      page: "service-maintenance-tune-ups",
      book: "contact",
      call: "tel:+17809822577",
      callLabel: "Office (780) 982-2577",
    },
    "svc-visit": {
      theme: "gold",
      badge: "How we work",
      title: "What a JUJCO visit looks like",
      lede: "Every install and repair follows the same path: diagnose, explain in plain language, do the work clean, then commission before we leave.",
      includeTitle: "You can expect",
      include: [
        "A real arrival window, not an all-day hold",
        "Shoe covers and a drop cloth in the mechanical room",
        "Options with prices before we start extra work",
        "Photos of anything we recommend replacing",
        "System test with you present at the thermostat",
        "Paperwork and warranty registration",
      ],
      whenTitle: "Start here if",
      when: [
        "You are not sure which service you need",
        "You want a quote, not a sales script",
        "You are comparing a repair against a replacement",
      ],
      page: "service-details",
      book: "contact",
      call: "tel:+17809822577",
      callLabel: "Office (780) 982-2577",
    },
    "prj-furnace": {
      theme: "heat",
      badge: "Project",
      title: "High-efficiency furnace — Edmonton",
      lede: "An 18-year-old single-stage furnace failed in a January snap. We sized a two-stage replacement, rerouted venting to code, and had heat back the same day.",
      includeTitle: "What changed",
      include: [
        "Heat-loss calc instead of a like-for-like guess",
        "New two-stage furnace and variable blower",
        "Fresh-air and exhaust through a new wall penetration",
        "Programmable thermostat and filter routine",
      ],
      whenTitle: "Similar job?",
      when: [
        "Your furnace is from the mid-2000s",
        "The upper floor never catches up in January",
      ],
      page: "project-details",
      book: "contact",
      call: "tel:+17809822577",
      callLabel: "Office (780) 982-2577",
    },
    "prj-ducts": {
      theme: "slate",
      badge: "Project",
      title: "Whole-home duct cleaning — St. Albert",
      lede: "A family with allergy flare-ups had years of dust in the trunks. We pulled the system under negative pressure and cleared every run.",
      includeTitle: "What changed",
      include: [
        "Source-removal on supply and return",
        "Blower compartment deep clean",
        "Register wipe and airflow check",
        "Less dust on furniture the following week",
      ],
      whenTitle: "Similar job?",
      when: [
        "Renovations left grit in the vents",
        "One bedroom barely gets air",
      ],
      page: "project-air-duct-cleaning",
      book: "contact",
      call: "tel:+17809822577",
      callLabel: "Office (780) 982-2577",
    },
    "prj-ac": {
      theme: "cool",
      badge: "Project",
      title: "Emergency AC repair — South Edmonton",
      lede: "A failed capacitor and a tired contactor took out cooling in a July heat wave. Same-day parts from the truck, house cooling again that afternoon.",
      includeTitle: "What changed",
      include: [
        "Capacitor and contactor replaced",
        "Amp draw confirmed on the compressor",
        "Drain cleared so it would not trip again",
        "Advice on remaining condenser life",
      ],
      whenTitle: "Similar job?",
      when: [
        "Outdoor fan hums, air is warm",
        "AC died on the first hot weekend",
      ],
      page: "project-ac-repair-service",
      book: "contact",
      call: "tel:+17809822577",
      callLabel: "Office (780) 982-2577",
    },
    "prj-heatpump": {
      theme: "hybrid",
      badge: "Project",
      title: "Cold-climate heat pump — Edmonton",
      lede: "One outdoor unit now heats into the minus thirties and cools in July, with the existing furnace kept as dual-fuel backup.",
      includeTitle: "What changed",
      include: [
        "Cold-climate heat pump on a new pad",
        "Dual-fuel controls with the furnace",
        "Line-set and electrical upgrade",
        "Rebate forms completed with the homeowner",
      ],
      whenTitle: "Similar job?",
      when: [
        "You want one system for both seasons",
        "A furnace-only quote felt incomplete",
      ],
      page: "project-heat-pump-install",
      book: "contact",
      call: "tel:+17809822577",
      callLabel: "Office (780) 982-2577",
    },
    "prj-iaq": {
      theme: "air",
      badge: "Project",
      title: "Indoor air upgrade — asthma household",
      lede: "We stacked an HRV, a power humidifier, and a media cabinet so winter air stayed at a livable humidity without the stale-room smell.",
      includeTitle: "What changed",
      include: [
        "HRV balanced to the home",
        "Bypass humidifier on the supply trunk",
        "4-inch media filter cabinet",
        "Humidity target the family can actually hold",
      ],
      whenTitle: "Similar job?",
      when: [
        "Kids wake up congested all winter",
        "Static shocks and dry wood furniture",
      ],
      page: "project-indoor-air-quality",
      book: "contact",
      call: "tel:+17809822577",
      callLabel: "Office (780) 982-2577",
    },
    "prj-boiler": {
      theme: "heat",
      badge: "Project",
      title: "Condensing boiler — Sherwood Park",
      lede: "An ageing cast-iron boiler was wasting gas and leaving the far wing cool. We put in a condensing boiler with outdoor reset.",
      includeTitle: "What changed",
      include: [
        "Condensing boiler and new venting",
        "Primary/secondary piping",
        "Outdoor-reset curve set on site",
        "Even radiation on the far wing",
      ],
      whenTitle: "Similar job?",
      when: ["Boiler is noisy or leaking", "Radiators never quite get hot"],
      page: "project-boiler-replacement",
      book: "contact",
      call: "tel:+17809822577",
      callLabel: "Office (780) 982-2577",
    },
    "prj-tuneup": {
      theme: "gold",
      badge: "Project",
      title: "Annual furnace tune-up — Sherwood Park",
      lede: "A pre-winter visit caught a cracked ignitor and a dirty flame sensor before the first cold snap. Small parts, no Saturday emergency.",
      includeTitle: "What changed",
      include: [
        "Ignitor replaced before it failed",
        "Flame sensor cleaned",
        "Combustion numbers written down",
        "Filter schedule set for winter",
      ],
      whenTitle: "Similar job?",
      when: [
        "You skip fall service most years",
        "Last winter had a close call",
      ],
      page: "project-annual-maintenance",
      book: "contact",
      call: "tel:+17809822577",
      callLabel: "Office (780) 982-2577",
    },
    "prj-emergency": {
      theme: "urgent",
      badge: "Project",
      title: "No-heat emergency — Edmonton",
      lede: "A family woke to −28°C and a dead furnace. The on-call tech restored heat in a few hours with a same-day control repair.",
      includeTitle: "What changed",
      include: [
        "After-hours dispatch",
        "Failed control replaced from the truck",
        "Safety checks before we left",
        "Heat restored the same night",
      ],
      whenTitle: "Similar job?",
      when: [
        "It is below freezing and the furnace is silent",
        "You need someone tonight, not Monday",
      ],
      page: "project-emergency-repair",
      book: "contact",
      call: "tel:+17809823377",
      callLabel: "Emergency (780) 982-3377",
    },
  };

  function el(html) {
    var d = document.createElement("div");
    d.innerHTML = html.trim();
    return d.firstElementChild;
  }

  function list(items) {
    return (
      "<ul>" +
      items
        .map(function (t) {
          return "<li>" + t + "</li>";
        })
        .join("") +
      "</ul>"
    );
  }

  function ensureShell() {
    var root = document.getElementById("jpop");
    if (root) return root;
    root = el(
      '<div class="jpop" id="jpop" hidden>' +
        '<div class="jpop__mask" data-jpop-close></div>' +
        '<div class="jpop__panel" role="dialog" aria-modal="true" aria-labelledby="jpop-title">' +
        '<button class="jpop__close" type="button" data-jpop-close aria-label="Close">×</button>' +
        '<div class="jpop__head"><span class="jdetail-badge" id="jpop-badge"></span>' +
        '<h2 id="jpop-title"></h2><p id="jpop-lede"></p></div>' +
        '<div class="jpop__body">' +
        '<h3 id="jpop-inc-title"></h3><div id="jpop-inc"></div>' +
        '<h3 id="jpop-when-title"></h3><div id="jpop-when"></div>' +
        "</div>" +
        '<div class="jpop__foot" id="jpop-foot"></div>' +
        "</div>" +
        "</div>",
    );
    document.body.appendChild(root);
    return root;
  }

  function close() {
    var root = document.getElementById("jpop");
    if (!root) return;
    root.classList.remove("is-open");
    document.body.classList.remove("jpop-lock");
    window.setTimeout(function () {
      root.hidden = true;
    }, 220);
  }

  function open(id) {
    var item = DATA[id];
    if (!item) return false;
    var root = ensureShell();
    root.className = "jpop jtheme jtheme--" + item.theme;
    root.querySelector("#jpop-badge").textContent = item.badge;
    root.querySelector("#jpop-title").textContent = item.title;
    root.querySelector("#jpop-lede").textContent = item.lede;
    root.querySelector("#jpop-inc-title").textContent = item.includeTitle;
    root.querySelector("#jpop-inc").innerHTML = list(item.include);
    root.querySelector("#jpop-when-title").textContent = item.whenTitle;
    root.querySelector("#jpop-when").innerHTML = list(item.when);
    root.querySelector("#jpop-foot").innerHTML =
      '<a class="cs_btn cs_style_1" href="' +
      item.book +
      '"><span>Book this</span></a>' +
      '<a class="cs_btn cs_style_1 cs_color_2" href="' +
      item.call +
      '"><span>' +
      item.callLabel +
      "</span></a>" +
      '<a class="cs_btn cs_style_1 cs_type_1" href="' +
      item.page +
      '"><span>Open full page</span></a>';
    root.hidden = false;
    document.body.classList.add("jpop-lock");
    requestAnimationFrame(function () {
      root.classList.add("is-open");
    });
    return true;
  }

  document.addEventListener("click", function (e) {
    var closer = e.target.closest("[data-jpop-close]");
    if (closer) {
      e.preventDefault();
      close();
      return;
    }
    var trigger = e.target.closest("[data-jpop]");
    if (!trigger) return;
    var id = trigger.getAttribute("data-jpop");
    if (!DATA[id]) return;
    e.preventDefault();
    open(id);
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") close();
  });
})();
