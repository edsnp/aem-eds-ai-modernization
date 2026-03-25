var CustomImportScript = (() => {
  var __defProp = Object.defineProperty;
  var __defProps = Object.defineProperties;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b)) {
        if (__propIsEnum.call(b, prop))
          __defNormalProp(a, prop, b[prop]);
      }
    return a;
  };
  var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // tools/importer/import-homepage.js
  var import_homepage_exports = {};
  __export(import_homepage_exports, {
    default: () => import_homepage_default
  });

  // tools/importer/parsers/hero-landing.js
  function parse(element, { document }) {
    const heading = element.querySelector("h1.h1-heading, h1, h2");
    const description = element.querySelector("p.subheading, p");
    const buttons = Array.from(element.querySelectorAll(":scope > div:first-child a.button"));
    const images = Array.from(element.querySelectorAll("img.cover-image"));
    const cells = [];
    if (images.length > 0) {
      cells.push([images[0]]);
    }
    const contentContainer = document.createElement("div");
    if (heading) contentContainer.append(heading);
    if (description) contentContainer.append(description);
    buttons.forEach((btn) => contentContainer.append(btn));
    cells.push([contentContainer]);
    const block = WebImporter.Blocks.createBlock(document, { name: "hero-landing", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/columns-feature.js
  function parse2(element, { document }) {
    const image = element.querySelector(":scope > div:first-child img.cover-image");
    const textDiv = element.querySelector(":scope > div:nth-child(2)");
    const cells = [];
    cells.push([image || "", textDiv || ""]);
    const block = WebImporter.Blocks.createBlock(document, { name: "columns-feature", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-gallery.js
  function parse3(element, { document }) {
    const items = Array.from(element.querySelectorAll(":scope > div.utility-aspect-1x1, :scope > div"));
    const cells = [];
    items.forEach((item) => {
      const img = item.querySelector("img.cover-image, img");
      if (img) {
        cells.push([img, ""]);
      }
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "cards-gallery", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/tabs-testimonial.js
  function parse4(element, { document }) {
    const tabPanes = Array.from(element.querySelectorAll(".tab-pane"));
    const tabButtons = Array.from(element.querySelectorAll('button[role="tab"]'));
    const cells = [];
    tabPanes.forEach((pane, index) => {
      const button = tabButtons[index];
      const nameEl = button ? button.querySelector("strong") : null;
      const label = nameEl ? nameEl.textContent.trim() : `Tab ${index + 1}`;
      const gridLayout = pane.querySelector(".grid-layout");
      cells.push([label, gridLayout || pane]);
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "tabs-testimonial", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-article.js
  function parse5(element, { document }) {
    const cards = Array.from(element.querySelectorAll("a.article-card"));
    const cells = [];
    cards.forEach((card) => {
      const img = card.querySelector("img.cover-image, img");
      const textContainer = document.createElement("div");
      const tag = card.querySelector(".tag");
      if (tag) textContainer.append(tag);
      const date = card.querySelector(".article-card-meta .paragraph-sm");
      if (date) textContainer.append(date);
      const heading = card.querySelector("h3, h4");
      if (heading) {
        const link = document.createElement("a");
        link.href = card.href;
        link.textContent = heading.textContent;
        heading.textContent = "";
        heading.appendChild(link);
        textContainer.append(heading);
      }
      cells.push([img || "", textContainer]);
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "cards-article", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/accordion-faq.js
  function parse6(element, { document }) {
    const items = Array.from(element.querySelectorAll("details.faq-item"));
    const cells = [];
    items.forEach((item) => {
      const summary = item.querySelector("summary.faq-question");
      const questionSpan = summary ? summary.querySelector("span:first-child") : null;
      const questionEl = document.createElement("p");
      questionEl.textContent = questionSpan ? questionSpan.textContent.trim() : "";
      const answer = item.querySelector(".faq-answer");
      cells.push([questionEl, answer || ""]);
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "accordion-faq", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/hero-banner.js
  function parse7(element, { document }) {
    const bgImage = element.querySelector("img.cover-image");
    const heading = element.querySelector("h2, h1");
    const description = element.querySelector("p.subheading, p");
    const buttons = Array.from(element.querySelectorAll("a.button"));
    const cells = [];
    if (bgImage) {
      cells.push([bgImage]);
    }
    const contentContainer = document.createElement("div");
    if (heading) contentContainer.append(heading);
    if (description) contentContainer.append(description);
    buttons.forEach((btn) => contentContainer.append(btn));
    cells.push([contentContainer]);
    const block = WebImporter.Blocks.createBlock(document, { name: "hero-banner", cells });
    element.replaceWith(block);
  }

  // tools/importer/transformers/wknd-trendsetters-cleanup.js
  var TransformHook = { beforeTransform: "beforeTransform", afterTransform: "afterTransform" };
  function transform(hookName, element, payload) {
    if (hookName === TransformHook.beforeTransform) {
      WebImporter.DOMUtils.remove(element, ["a.skip-link"]);
    }
    if (hookName === TransformHook.afterTransform) {
      WebImporter.DOMUtils.remove(element, [
        "div.navbar",
        // Site navigation bar: <div class="navbar">
        "footer.footer",
        // Site footer: <footer class="footer inverse-footer">
        "link",
        // Stylesheet link elements
        "noscript"
        // Noscript fallback elements
      ]);
    }
  }

  // tools/importer/transformers/wknd-trendsetters-sections.js
  var TransformHook2 = { beforeTransform: "beforeTransform", afterTransform: "afterTransform" };
  function transform2(hookName, element, payload) {
    if (hookName === TransformHook2.afterTransform) {
      const template = payload.template;
      if (!template || !template.sections || template.sections.length < 2) return;
      const { sections } = template;
      const doc = element.ownerDocument;
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        const selectors = Array.isArray(section.selector) ? section.selector : [section.selector];
        let sectionEl = null;
        for (const sel of selectors) {
          sectionEl = doc.querySelector(sel);
          if (sectionEl) break;
        }
        if (!sectionEl) continue;
        if (section.style) {
          const metaBlock = WebImporter.Blocks.createBlock(doc, {
            name: "Section Metadata",
            cells: { style: section.style }
          });
          sectionEl.append(metaBlock);
        }
        if (i > 0) {
          const hr = doc.createElement("hr");
          sectionEl.before(hr);
        }
      }
    }
  }

  // tools/importer/import-homepage.js
  var parsers = {
    "hero-landing": parse,
    "columns-feature": parse2,
    "cards-gallery": parse3,
    "tabs-testimonial": parse4,
    "cards-article": parse5,
    "accordion-faq": parse6,
    "hero-banner": parse7
  };
  var PAGE_TEMPLATE = {
    name: "homepage",
    urls: [
      "https://wknd-trendsetters.site"
    ],
    description: "Homepage template for WKND Trendsetters site",
    blocks: [
      {
        name: "hero-landing",
        instances: ["header.section.secondary-section > .container > .grid-layout"]
      },
      {
        name: "columns-feature",
        instances: ["main > section:nth-of-type(1) .grid-layout"]
      },
      {
        name: "cards-gallery",
        instances: ["main > section:nth-of-type(2) .grid-layout.desktop-4-column"]
      },
      {
        name: "tabs-testimonial",
        instances: [".tabs-wrapper"]
      },
      {
        name: "cards-article",
        instances: ["main > section:nth-of-type(4) .grid-layout.desktop-4-column"]
      },
      {
        name: "accordion-faq",
        instances: [".faq-list"]
      },
      {
        name: "hero-banner",
        instances: ["main > section.inverse-section .utility-position-relative"]
      }
    ],
    sections: [
      {
        id: "section-1-hero",
        name: "Hero Section",
        selector: "header.section.secondary-section",
        style: "light-grey",
        blocks: ["hero-landing"],
        defaultContent: []
      },
      {
        id: "section-2-featured-story",
        name: "Featured Story Section",
        selector: "main > section:nth-of-type(1)",
        style: null,
        blocks: ["columns-feature"],
        defaultContent: []
      },
      {
        id: "section-3-gallery",
        name: "Image Gallery Section",
        selector: "main > section:nth-of-type(2)",
        style: "light-grey",
        blocks: ["cards-gallery"],
        defaultContent: ["main > section:nth-of-type(2) .utility-text-align-center"]
      },
      {
        id: "section-4-testimonials",
        name: "Testimonials Section",
        selector: "main > section:nth-of-type(3)",
        style: null,
        blocks: ["tabs-testimonial"],
        defaultContent: []
      },
      {
        id: "section-5-articles",
        name: "Latest Articles Section",
        selector: "main > section:nth-of-type(4)",
        style: "light-grey",
        blocks: ["cards-article"],
        defaultContent: ["main > section:nth-of-type(4) .utility-text-align-center"]
      },
      {
        id: "section-6-faq",
        name: "FAQ Section",
        selector: "main > section:nth-of-type(5)",
        style: null,
        blocks: ["accordion-faq"],
        defaultContent: ["main > section:nth-of-type(5) h2.h2-heading", "main > section:nth-of-type(5) p.subheading"]
      },
      {
        id: "section-7-cta",
        name: "CTA Banner Section",
        selector: ["main > section.inverse-section", "main > section:nth-of-type(6)"],
        style: "dark",
        blocks: ["hero-banner"],
        defaultContent: []
      }
    ]
  };
  var transformers = [
    transform,
    ...PAGE_TEMPLATE.sections && PAGE_TEMPLATE.sections.length > 1 ? [transform2] : []
  ];
  function executeTransformers(hookName, element, payload) {
    const enhancedPayload = __spreadProps(__spreadValues({}, payload), {
      template: PAGE_TEMPLATE
    });
    transformers.forEach((transformerFn) => {
      try {
        transformerFn.call(null, hookName, element, enhancedPayload);
      } catch (e) {
        console.error(`Transformer failed at ${hookName}:`, e);
      }
    });
  }
  function findBlocksOnPage(document, template) {
    const pageBlocks = [];
    template.blocks.forEach((blockDef) => {
      blockDef.instances.forEach((selector) => {
        const elements = document.querySelectorAll(selector);
        if (elements.length === 0) {
          console.warn(`Block "${blockDef.name}" selector not found: ${selector}`);
        }
        elements.forEach((element) => {
          pageBlocks.push({
            name: blockDef.name,
            selector,
            element
          });
        });
      });
    });
    console.log(`Found ${pageBlocks.length} block instances on page`);
    return pageBlocks;
  }
  var import_homepage_default = {
    transform: (payload) => {
      const { document, url, params } = payload;
      const main = document.body;
      executeTransformers("beforeTransform", main, payload);
      const pageBlocks = findBlocksOnPage(document, PAGE_TEMPLATE);
      pageBlocks.forEach((block) => {
        const parser = parsers[block.name];
        if (parser) {
          try {
            parser(block.element, { document, url, params });
          } catch (e) {
            console.error(`Failed to parse ${block.name} (${block.selector}):`, e);
          }
        } else {
          console.warn(`No parser found for block: ${block.name}`);
        }
      });
      executeTransformers("afterTransform", main, payload);
      const hr = document.createElement("hr");
      main.appendChild(hr);
      WebImporter.rules.createMetadata(main, document);
      WebImporter.rules.transformBackgroundImages(main, document);
      WebImporter.rules.adjustImageUrls(main, url, params.originalURL);
      const u = new URL(params.originalURL);
      let path = u.pathname.replace(/\/$/, "").replace(/\.html$/, "");
      if (!path || path === "") path = "/index";
      return [{
        element: main,
        path,
        report: {
          title: document.title,
          template: PAGE_TEMPLATE.name,
          blocks: pageBlocks.map((b) => b.name)
        }
      }];
    }
  };
  return __toCommonJS(import_homepage_exports);
})();
