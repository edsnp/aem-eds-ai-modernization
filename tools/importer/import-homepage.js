/* eslint-disable */
/* global WebImporter */

// PARSER IMPORTS
import heroLandingParser from './parsers/hero-landing.js';
import columnsFeatureParser from './parsers/columns-feature.js';
import cardsGalleryParser from './parsers/cards-gallery.js';
import tabsTestimonialParser from './parsers/tabs-testimonial.js';
import cardsArticleParser from './parsers/cards-article.js';
import accordionFaqParser from './parsers/accordion-faq.js';
import heroBannerParser from './parsers/hero-banner.js';

// TRANSFORMER IMPORTS
import cleanupTransformer from './transformers/wknd-trendsetters-cleanup.js';
import sectionsTransformer from './transformers/wknd-trendsetters-sections.js';

// PARSER REGISTRY
const parsers = {
  'hero-landing': heroLandingParser,
  'columns-feature': columnsFeatureParser,
  'cards-gallery': cardsGalleryParser,
  'tabs-testimonial': tabsTestimonialParser,
  'cards-article': cardsArticleParser,
  'accordion-faq': accordionFaqParser,
  'hero-banner': heroBannerParser,
};

// PAGE TEMPLATE CONFIGURATION (embedded from page-templates.json)
const PAGE_TEMPLATE = {
  name: 'homepage',
  urls: [
    'https://wknd-trendsetters.site',
  ],
  description: 'Homepage template for WKND Trendsetters site',
  blocks: [
    {
      name: 'hero-landing',
      instances: ['header.section.secondary-section > .container > .grid-layout'],
    },
    {
      name: 'columns-feature',
      instances: ['main > section:nth-of-type(1) .grid-layout'],
    },
    {
      name: 'cards-gallery',
      instances: ['main > section:nth-of-type(2) .grid-layout.desktop-4-column'],
    },
    {
      name: 'tabs-testimonial',
      instances: ['.tabs-wrapper'],
    },
    {
      name: 'cards-article',
      instances: ['main > section:nth-of-type(4) .grid-layout.desktop-4-column'],
    },
    {
      name: 'accordion-faq',
      instances: ['.faq-list'],
    },
    {
      name: 'hero-banner',
      instances: ['main > section.inverse-section .utility-position-relative'],
    },
  ],
  sections: [
    {
      id: 'section-1-hero',
      name: 'Hero Section',
      selector: 'header.section.secondary-section',
      style: 'light-grey',
      blocks: ['hero-landing'],
      defaultContent: [],
    },
    {
      id: 'section-2-featured-story',
      name: 'Featured Story Section',
      selector: 'main > section:nth-of-type(1)',
      style: null,
      blocks: ['columns-feature'],
      defaultContent: [],
    },
    {
      id: 'section-3-gallery',
      name: 'Image Gallery Section',
      selector: 'main > section:nth-of-type(2)',
      style: 'light-grey',
      blocks: ['cards-gallery'],
      defaultContent: ['main > section:nth-of-type(2) .utility-text-align-center'],
    },
    {
      id: 'section-4-testimonials',
      name: 'Testimonials Section',
      selector: 'main > section:nth-of-type(3)',
      style: null,
      blocks: ['tabs-testimonial'],
      defaultContent: [],
    },
    {
      id: 'section-5-articles',
      name: 'Latest Articles Section',
      selector: 'main > section:nth-of-type(4)',
      style: 'light-grey',
      blocks: ['cards-article'],
      defaultContent: ['main > section:nth-of-type(4) .utility-text-align-center'],
    },
    {
      id: 'section-6-faq',
      name: 'FAQ Section',
      selector: 'main > section:nth-of-type(5)',
      style: null,
      blocks: ['accordion-faq'],
      defaultContent: ['main > section:nth-of-type(5) h2.h2-heading', 'main > section:nth-of-type(5) p.subheading'],
    },
    {
      id: 'section-7-cta',
      name: 'CTA Banner Section',
      selector: ['main > section.inverse-section', 'main > section:nth-of-type(6)'],
      style: 'dark',
      blocks: ['hero-banner'],
      defaultContent: [],
    },
  ],
};

// TRANSFORMER REGISTRY (after PAGE_TEMPLATE so sections are accessible)
const transformers = [
  cleanupTransformer,
  ...(PAGE_TEMPLATE.sections && PAGE_TEMPLATE.sections.length > 1 ? [sectionsTransformer] : []),
];

/**
 * Execute all page transformers for a specific hook
 */
function executeTransformers(hookName, element, payload) {
  const enhancedPayload = {
    ...payload,
    template: PAGE_TEMPLATE,
  };

  transformers.forEach((transformerFn) => {
    try {
      transformerFn.call(null, hookName, element, enhancedPayload);
    } catch (e) {
      console.error(`Transformer failed at ${hookName}:`, e);
    }
  });
}

/**
 * Find all blocks on the page based on the embedded template configuration
 */
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
          element,
        });
      });
    });
  });

  console.log(`Found ${pageBlocks.length} block instances on page`);
  return pageBlocks;
}

export default {
  transform: (payload) => {
    const { document, url, params } = payload;

    const main = document.body;

    // 1. Execute beforeTransform (initial cleanup)
    executeTransformers('beforeTransform', main, payload);

    // 2. Find blocks on page using embedded template
    const pageBlocks = findBlocksOnPage(document, PAGE_TEMPLATE);

    // 3. Parse each block using registered parsers
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

    // 4. Execute afterTransform (final cleanup + section breaks/metadata)
    executeTransformers('afterTransform', main, payload);

    // 5. Apply WebImporter built-in rules
    const hr = document.createElement('hr');
    main.appendChild(hr);
    WebImporter.rules.createMetadata(main, document);
    WebImporter.rules.transformBackgroundImages(main, document);
    WebImporter.rules.adjustImageUrls(main, url, params.originalURL);

    // 6. Generate sanitized path
    const u = new URL(params.originalURL);
    let path = u.pathname.replace(/\/$/, '').replace(/\.html$/, '');
    if (!path || path === '') path = '/index';

    return [{
      element: main,
      path,
      report: {
        title: document.title,
        template: PAGE_TEMPLATE.name,
        blocks: pageBlocks.map((b) => b.name),
      },
    }];
  },
};
