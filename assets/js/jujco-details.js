/* Unique Learn More popups + click wiring. Full pages stay the destination. */
(function () {
  "use strict";

  var DATA = {
    "svc-furnace": {
      theme: "heat",
      badge: "Heating",
      title: "Furnace Installation",
      lede: "High efficiency gas furnaces sized for Alberta winters, installed clean and commissioned during the same visit whenever the home is ready.",
      includeTitle: "What this visit includes",
      include: [
        "Precise heating load sizing calculated for your home, not a guess from square footage",
        "Safe disconnect and complete removal of the old furnace",
        "Code venting, gas line, and condensate work",
        "Two stage or modulating equipment setup with a compatible thermostat",
        "Combustion and airflow commissioning",
        "1 year parts warranty plus JUJCO labour coverage",
      ],
      whenTitle: "Book this service when:",
      when: [
        "The furnace is over 6 years old or cycling rapidly",
        "Rooms upstairs stay cold in January",
        "You want a high efficiency replacement before a failure occurs",
        "A heating inspection showed the heat exchanger needs replacement",
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
      lede: "Cold climate and dual fuel heat pumps that deliver dependable heat in deep winter temperatures, then transition to efficient cooling all summer.",
      includeTitle: "What this visit includes",
      include: [
        "Cold climate equipment selection engineered for Alberta weather",
        "Dual fuel pairing with your furnace when that provides the best fit",
        "Refrigerant line set, electrical connections, and outdoor pad installation",
        "Defrost controls and backup heat settings configured on site",
        "Rebate paperwork walkthrough",
        "One system for winter heat and summer cool",
      ],
      whenTitle: "Book this service when:",
      when: [
        "You want lower winter bills without losing backup heat",
        "You are replacing both a furnace and an AC",
        "A builder specification called for a heat pump",
        "You need cooling and heating from one outdoor unit",
      ],
      page: "service-heat-pump-installation",
      book: "contact",
      call: "tel:+17809822577",
      callLabel: "Office (780) 982-2577",
    },
    /* "svc-boiler": {
      theme: "heat",
      badge: "Hydronic",
      title: "Boiler & Hydronic Heating",
      lede: "Cast iron to condensing boiler replacements and hydronic loops that keep radiators and in floor heat even on the coldest nights.",
      includeTitle: "What this visit includes",
      include: [
        "Boiler sizing against radiation and in floor load",
        "Primary and secondary piping where the old loop needs it",
        "New intake, exhaust, and condensate for condensing units",
        "Zone valve and circulator checks",
        "Outdoor reset control setup",
        "System flush and inhibitor fill",
      ],
      whenTitle: "Book this service when:",
      when: [
        "The boiler is leaking, banging, or short on hot water",
        "Radiators are lukewarm on one side of the house",
        "You want a high efficiency condensing swap",
        "In floor heat never quite comes up to temp",
      ],
      page: "service-boiler-hydronic",
      book: "contact",
      call: "tel:+17809822577",
      callLabel: "Office (780) 982-2577",
    }, */
    "svc-heating": {
      theme: "heat",
      badge: "Repair",
      title: "Heating System Repair",
      lede: "Prompt furnace and heat pump diagnostics when your home is cold. We identify the exact failed part and provide upfront solutions.",
      includeTitle: "What this visit includes",
      include: [
        "Full heat sequence test, not just a code read",
        "Ignitor, flame sensor, inducer motor, and pressure switch checks",
        "Heat exchanger inspection when symptoms require testing",
        "Control board and thermostat diagnosis",
        "Fully stocked service trucks with parts for common Alberta furnaces",
        "Clear repair versus replace advice if the unit is old",
      ],
      whenTitle: "Book this service when:",
      when: [
        "No heat, rapid cycling, or unusual gas odours",
        "The furnace blower never shuts off",
        "Error lights are blinking after a power interruption",
        "One floor is hot and another is freezing",
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
      lede: "Quiet and energy efficient central air conditioning properly sized for your home so hot summer afternoons stay comfortably cool.",
      includeTitle: "What this visit includes",
      include: [
        "Load calculations so the coil and condenser match the house",
        "New pad, whip, and electrical disconnect as needed",
        "Line set replacement or complete line flush",
        "Precise refrigerant charge measured by weight and manufacturer specifications",
        "Old equipment recovery and safe removal",
        "Thermostat setup for cooling lockouts",
      ],
      whenTitle: "Book this service when:",
      when: [
        "You have never had central air and want it before summer",
        "The old condenser is loud, rusted, or running on obsolete refrigerant",
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
      lede: "Fast cooling repair when your home stays warm, plus seasonal tune ups so the same problem does not return during the next heat wave.",
      includeTitle: "What this visit includes",
      include: [
        "Capacitor, contactor, and fan motor electrical testing",
        "Refrigerant leak inspection before adding any refrigerant",
        "Coil cleaning and condensate drain clearing",
        "Amp draw and temperature split performance readings",
        "Capacitor and contactor replacements from the service truck",
        "A written report on remaining life of the compressor",
      ],
      whenTitle: "Book this service when:",
      when: [
        "The outdoor fan spins but the air is warm",
        "Ice is forming on the copper lines",
        "The breaker trips when cooling turns on",
        "You want a spring check before hot summer weather",
      ],
      page: "service-ac-repair-maintenance",
      book: "contact",
      call: "tel:+17809822577",
      callLabel: "Office (780) 982-2577",
    },
    /* "svc-ducts": {
      theme: "slate",
      badge: "Airflow",
      title: "Air Duct Cleaning",
      lede: "Thorough duct cleaning that clears dust and debris out of the trunk lines so the system moves clean air efficiently.",
      includeTitle: "What this visit includes",
      include: [
        "Negative pressure setup on the trunk",
        "Agitation of supply and return runs",
        "Register and grille cleaning",
        "Furnace blower compartment vacuum",
        "Optional dryer vent cleaning add on",
        "Visual verification of the main trunk",
      ],
      whenTitle: "Book this service when:",
      when: [
        "You just renovated and the vents blow dust",
        "Allergy or dust issues increased",
        "One room has almost no airflow",
        "Ducts have not been cleaned in years",
      ],
      page: "service-air-duct-cleaning",
      book: "contact",
      call: "tel:+17809822577",
      callLabel: "Office (780) 982-2577",
    }, */
    "svc-iaq": {
      theme: "air",
      badge: "Air quality",
      title: "Indoor Air Quality",
      lede: "HRV and ERV air exchangers, power humidifiers, and filtration that resolve dry winter air, stale rooms, and static shock across Alberta homes.",
      includeTitle: "What this visit includes",
      include: [
        "Humidity and air quality assessment of the home",
        "HRV and ERV sizing and duct connections",
        "Bypass or fan powered humidifier installation",
        "High efficiency media filter cabinet or HEPA unit addition",
        "Balanced airflow throughout the home",
        "Simple filter and humidifier pad change instructions",
      ],
      whenTitle: "Book this service when:",
      when: [
        "Winter humidity sits under 25 percent",
        "Windows fog or wood furniture cracks",
        "Someone in the house has asthma or allergies",
        "The home feels stale when the furnace runs",
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
      lede: "Loss of heat in freezing weather or cooling failure during a severe heat wave are emergencies we respond to quickly across Alberta.",
      includeTitle: "What this visit includes",
      include: [
        "Prompt emergency dispatch across Alberta communities",
        "Safety checks for gas, carbon monoxide, and electrical",
        "Temporary heating support if a special part must be ordered",
        "Common ignitors, capacitors, and control boards stocked on the truck",
        "A clear action plan if major replacement work is required",
        "Dedicated follow up communication so you remain fully informed",
      ],
      whenTitle: "Call now if",
      when: [
        "There is no heat and outdoor temperatures are below freezing",
        "You smell gas or a carbon monoxide alarm sounds",
        "The air conditioner stopped working during an extreme heat warning",
        "Water is leaking from the furnace or heating equipment",
      ],
      page: "service-emergency-service",
      book: "contact",
      call: "tel:+17809823377",
      callLabel: "Emergency (780) 982-3377",
    },
    "svc-tuneup": {
      theme: "gold",
      badge: "Maintenance",
      title: "Maintenance and Tune Ups",
      lede: "Seasonal furnace and air conditioner tune ups that detect worn parts early before unexpected system breakdowns occur.",
      includeTitle: "What this visit includes",
      include: [
        "Burner, heat exchanger, and flame sensor cleaning",
        "Blower wheel and cabinet cleaning",
        "Filter check and thermostat calibration test",
        "Cooling coil, condensate drain, and electrical inspection",
        "Combustion analysis and temperature split verification",
        "A clear inspection report detailing component conditions",
      ],
      whenTitle: "Book this service when:",
      when: [
        "Autumn is arriving and the furnace requires inspection",
        "Spring has arrived and cooling season is approaching",
        "You recently purchased the home and want a baseline inspection",
        "You want an ongoing seasonal maintenance plan",
      ],
      page: "service-maintenance-tune-ups",
      book: "contact",
      call: "tel:+17809822577",
      callLabel: "Office (780) 982-2577",
    },
    "svc-rtu": {
      theme: "hybrid",
      badge: "Commercial RTU",
      title: "Commercial Rooftop Units (RTU)",
      lede: "Packaged rooftop heating and cooling for Alberta corporate offices, retail plazas, and commercial facilities. Crane lifts, curb adapters, and zone balancing.",
      includeTitle: "What this commercial service includes",
      include: [
        "Commercial load calculations and roof curb dimension audit",
        "Crane rigging, safety permits, and safe removal of old units",
        "Custom curb adapter installation with weather sealed roof flashing",
        "Packaged gas heating and direct expansion cooling commissioning",
        "Economizer calibration and fresh air damper balancing",
        "Building automation system or multi stage thermostat integration",
      ],
      whenTitle: "Book this service when:",
      when: [
        "An existing commercial RTU is over 6 years old or failing",
        "Tenants report hot or cold drafts across office zones",
        "You want quarterly or seasonal commercial preventative care",
        "A sudden compressor or heat exchanger breakdown halts business",
      ],
      page: "service-rooftop-units",
      book: "contact",
      call: "tel:+17809822577",
      callLabel: "Office (780) 982-2577",
    },
    "svc-garage": {
      theme: "heat",
      badge: "Heating",
      title: "Garage Heaters Installation and Repair",
      lede: "Gas and electric unit heaters professionally sized to transform your cold garage into a comfortable workspace all year long.",
      includeTitle: "What this service includes",
      include: [
        "Heater sizing against garage square footage and insulation levels",
        "New gas line installation and electrical circuit verification",
        "Safe venting clearances according to Alberta code",
        "Thermostat wiring and optimal wall placement",
        "Radiant tube or forced air unit heater options",
        "Diagnostics and repairs for failing garage heaters",
      ],
      whenTitle: "Book this service when:",
      when: [
        "Your garage freezes over during cold winter months",
        "You want to use your garage or workshop in comfort all year long",
        "An existing garage heater is blowing cold air or shutting off unexpectedly",
        "You smell gas or notice unusual noises from the unit",
      ],
      page: "service-garage-heaters",
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
        "A specific arrival window without waiting all day",
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
      title: "High efficiency furnace installation in Alberta",
      lede: "A failing single stage furnace was upgraded during a winter cold snap. We sized a two stage replacement, installed code venting, and restored heat quickly.",
      includeTitle: "What changed",
      include: [
        "Heat loss calculations instead of simple guessing",
        "New two stage furnace and variable speed blower",
        "Fresh air intake and exhaust through a code compliant exterior wall",
        "Programmable thermostat and seasonal filter routine",
      ],
      whenTitle: "Similar job?",
      when: [
        "Your furnace is more than 6 years old",
        "The upper floor never catches up during cold winter months",
      ],
      page: "project-furnace-installation",
      book: "contact",
      call: "tel:+17809822577",
      callLabel: "Office (780) 982-2577",
    },
    /* "prj-ducts": {
      theme: "slate",
      badge: "Project",
      title: "Whole home duct cleaning in Alberta",
      lede: "A family had years of dust in the trunks. We cleaned the system under negative pressure and cleared every run thoroughly.",
      includeTitle: "What changed",
      include: [
        "Dust and debris removed on supply and return",
        "Blower compartment deep clean",
        "Register wipe and airflow check",
        "Noticeably less dust on furniture the following week",
      ],
      whenTitle: "Similar job?",
      when: [
        "Renovations left dust in the vents",
        "One bedroom barely gets air",
      ],
      page: "project-air-duct-cleaning",
      book: "contact",
      call: "tel:+17809822577",
      callLabel: "Office (780) 982-2577",
    }, */
    "prj-ac": {
      theme: "cool",
      badge: "Project",
      title: "Emergency AC repair across Alberta",
      lede: "A worn capacitor and contactor stopped cooling during a severe heat wave. Our technician arrived with stocked parts and restored cooling that afternoon.",
      includeTitle: "What changed",
      include: [
        "Capacitor and contactor replaced promptly",
        "Amp draw confirmed on the compressor",
        "Drain cleared to prevent future shutoffs",
        "Professional advice on remaining condenser lifespan",
      ],
      whenTitle: "Similar job?",
      when: [
        "Outdoor fan hums while airflow remains warm",
        "Air conditioner stopped working on the first hot weekend",
      ],
      page: "project-ac-repair-service",
      book: "contact",
      call: "tel:+17809822577",
      callLabel: "Office (780) 982-2577",
    },
    "prj-heatpump": {
      theme: "hybrid",
      badge: "Project",
      title: "Cold climate heat pump installation in Alberta",
      lede: "A central heat pump provides reliable winter heating and quiet summer cooling, paired with a furnace for dual fuel backup.",
      includeTitle: "What changed",
      include: [
        "Cold climate heat pump mounted on a secure outdoor pad",
        "Dual fuel controls integrated with the furnace",
        "Refrigerant line set and electrical wiring upgrades",
        "Energy efficiency rebate documentation completed for the homeowner",
      ],
      whenTitle: "Similar job?",
      when: [
        "You want one system for both heating and cooling seasons",
        "A furnace quote alone felt incomplete for your comfort goals",
      ],
      page: "project-heat-pump-install",
      book: "contact",
      call: "tel:+17809822577",
      callLabel: "Office (780) 982-2577",
    },
    "prj-garage": {
      theme: "heat",
      badge: "Project",
      title: "Garage heater installation in Alberta",
      lede: "A cold detached garage was converted into a warm, comfortable workspace all winter with a high efficiency unit heater and code certified gas piping.",
      includeTitle: "What changed",
      include: [
        "Natural gas line run and certified shutoff valve installed",
        "Overhead unit heater securely mounted to ceiling trusses",
        "Direct sidewall power venting with weatherproof termination",
        "Digital wall thermostat for precise winter climate control",
      ],
      whenTitle: "Similar job?",
      when: [
        "Your garage freezes vehicles and tools throughout the winter",
        "You want a warm, usable workshop or hobby space year round",
      ],
      page: "project-garage-heater-install",
      book: "contact",
      call: "tel:+17809822577",
      callLabel: "Office (780) 982-2577",
    },
    "prj-iaq": {
      theme: "air",
      badge: "Project",
      title: "Indoor air quality system upgrade",
      lede: "We installed an HRV, a power humidifier, and a high efficiency filter cabinet so winter air remains fresh and properly humidified.",
      includeTitle: "What changed",
      include: [
        "HRV balanced for optimal home ventilation",
        "Bypass humidifier connected to the supply duct",
        "Four inch high efficiency media filter cabinet",
        "Healthy indoor humidity levels maintained automatically",
      ],
      whenTitle: "Similar job?",
      when: [
        "Family members wake up congested throughout the winter",
        "Static electricity and drying woodwork occur frequently",
      ],
      page: "project-indoor-air-quality",
      book: "contact",
      call: "tel:+17809822577",
      callLabel: "Office (780) 982-2577",
    },
    "prj-rtu": {
      theme: "hybrid",
      badge: "Project",
      title: "Commercial RTU replacement in Alberta",
      lede: "An aging rooftop unit was struggling to keep a commercial space comfortable. We arranged crane rigging and installed an efficient packaged unit.",
      includeTitle: "What changed",
      include: [
        "Packaged rooftop unit and custom curb adapter",
        "Advanced economizer for optimal efficiency",
        "Crane rigging and safe removal of the old unit",
        "Balanced airflow across all commercial spaces",
      ],
      whenTitle: "Similar job?",
      when: ["Rooftop unit is failing or cycling frequently", "Commercial tenants complain about uneven temperatures"],
      page: "project-rtu-replacement",
      book: "contact",
      call: "tel:+17809822577",
      callLabel: "Office (780) 982-2577",
    },
    "prj-tuneup": {
      theme: "gold",
      badge: "Project",
      title: "Annual heating system tune up",
      lede: "A seasonal inspection caught a worn ignitor and dirty flame sensor before freezing temperatures arrived, preventing a weekend breakdown.",
      includeTitle: "What changed",
      include: [
        "Ignitor replaced before failure occurred",
        "Flame sensor thoroughly cleaned",
        "Combustion efficiency and airflow verified",
        "Filter replacement schedule prepared for winter",
      ],
      whenTitle: "Similar job?",
      when: [
        "You skipped seasonal maintenance in recent years",
        "The system experienced minor issues during previous cold spells",
      ],
      page: "project-annual-maintenance",
      book: "contact",
      call: "tel:+17809822577",
      callLabel: "Office (780) 982-2577",
    },
    "prj-emergency": {
      theme: "urgent",
      badge: "Project",
      title: "Emergency heating repair in Alberta",
      lede: "A family lost heat during freezing winter weather. Our emergency technician arrived promptly and restored heating that same evening.",
      includeTitle: "What changed",
      include: [
        "Prompt emergency dispatch",
        "Replacement components installed from our service vehicle",
        "Complete safety inspections before departure",
        "Heating restored the same evening",
      ],
      whenTitle: "Similar job?",
      when: [
        "Outdoor temperatures are below freezing and the furnace will not start",
        "You require immediate heating service rather than waiting days",
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
