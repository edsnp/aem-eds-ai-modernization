/* eslint-disable */
/* global WebImporter */

/**
 * Parser for columns-feature variant.
 * Base block: columns
 * Source: https://wknd-trendsetters.site
 * Source selector: main > section:nth-of-type(1) .grid-layout
 *
 * Source HTML structure (from captured DOM):
 * - Two-column grid: left has image, right has breadcrumbs + h2 heading + author metadata
 *
 * Block library columns structure (2 columns):
 * - Each row has col1 and col2 cells
 */
export default function parse(element, { document }) {
  // Col 1: Image (from captured DOM: img.cover-image inside first child div)
  const image = element.querySelector(':scope > div:first-child img.cover-image');

  // Col 2: Text content (breadcrumbs, heading, author info from second child div)
  const textDiv = element.querySelector(':scope > div:nth-child(2)');

  const cells = [];
  cells.push([image || '', textDiv || '']);

  const block = WebImporter.Blocks.createBlock(document, { name: 'columns-feature', cells });
  element.replaceWith(block);
}
