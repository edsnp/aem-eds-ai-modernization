/* eslint-disable */
/* global WebImporter */

/**
 * Parser for cards-gallery variant.
 * Base block: cards
 * Source: https://wknd-trendsetters.site
 * Source selector: main > section:nth-of-type(2) .grid-layout.desktop-4-column
 *
 * Source HTML structure (from captured DOM):
 * - 4-column grid with 8 square image items (div.utility-aspect-1x1 > img.cover-image)
 * - Image-only cards, no text content per card
 *
 * Block library cards structure (2 columns):
 * - Each row: col1 = image, col2 = text content
 * - For image-only gallery, col2 is empty
 */
export default function parse(element, { document }) {
  // Each card is a div.utility-aspect-1x1 containing an img (from captured DOM)
  const items = Array.from(element.querySelectorAll(':scope > div.utility-aspect-1x1, :scope > div'));
  const cells = [];

  items.forEach((item) => {
    const img = item.querySelector('img.cover-image, img');
    if (img) {
      cells.push([img, '']);
    }
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-gallery', cells });
  element.replaceWith(block);
}
