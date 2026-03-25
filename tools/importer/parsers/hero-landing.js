/* eslint-disable */
/* global WebImporter */

/**
 * Parser for hero-landing variant.
 * Base block: hero
 * Source: https://wknd-trendsetters.site
 * Source selector: header.section.secondary-section > .container > .grid-layout
 *
 * Source HTML structure (from captured DOM):
 * - Two-column grid: left has h1 + subheading + 2 CTA buttons, right has 3 stacked images
 *
 * Block library hero structure (1 column):
 * - Row 1: Background image (optional)
 * - Row 2: Title + Subheading + CTA (single cell)
 */
export default function parse(element, { document }) {
  // Extract content from captured DOM selectors
  const heading = element.querySelector('h1.h1-heading, h1, h2');
  const description = element.querySelector('p.subheading, p');
  const buttons = Array.from(element.querySelectorAll(':scope > div:first-child a.button'));
  const images = Array.from(element.querySelectorAll('img.cover-image'));

  const cells = [];

  // Row 1: First image as background (single cell)
  if (images.length > 0) {
    cells.push([images[0]]);
  }

  // Row 2: All text content in a single cell (heading + subheading + CTAs)
  const contentContainer = document.createElement('div');
  if (heading) contentContainer.append(heading);
  if (description) contentContainer.append(description);
  buttons.forEach((btn) => contentContainer.append(btn));
  cells.push([contentContainer]);

  const block = WebImporter.Blocks.createBlock(document, { name: 'hero-landing', cells });
  element.replaceWith(block);
}
