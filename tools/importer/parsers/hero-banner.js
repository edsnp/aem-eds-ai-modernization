/* eslint-disable */
/* global WebImporter */

/**
 * Parser for hero-banner variant.
 * Base block: hero
 * Source: https://wknd-trendsetters.site
 * Source selector: main > section.inverse-section .utility-position-relative
 *
 * Source HTML structure (from captured DOM):
 * - Container with background image (img.cover-image), overlay div,
 *   and card-body with h2, subheading paragraph, and CTA button
 *
 * Block library hero structure (1 column):
 * - Row 1: Background image
 * - Row 2: Title + Subheading + CTA (single cell)
 */
export default function parse(element, { document }) {
  // Background image from captured DOM
  const bgImage = element.querySelector('img.cover-image');

  // Text content from .card-body
  const heading = element.querySelector('h2, h1');
  const description = element.querySelector('p.subheading, p');
  const buttons = Array.from(element.querySelectorAll('a.button'));

  const cells = [];

  // Row 1: Background image
  if (bgImage) {
    cells.push([bgImage]);
  }

  // Row 2: All text content in a single cell
  const contentContainer = document.createElement('div');
  if (heading) contentContainer.append(heading);
  if (description) contentContainer.append(description);
  buttons.forEach((btn) => contentContainer.append(btn));
  cells.push([contentContainer]);

  const block = WebImporter.Blocks.createBlock(document, { name: 'hero-banner', cells });
  element.replaceWith(block);
}
