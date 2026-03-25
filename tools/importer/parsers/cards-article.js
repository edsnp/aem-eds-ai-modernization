/* eslint-disable */
/* global WebImporter */

/**
 * Parser for cards-article variant.
 * Base block: cards
 * Source: https://wknd-trendsetters.site
 * Source selector: main > section:nth-of-type(4) .grid-layout.desktop-4-column
 *
 * Source HTML structure (from captured DOM):
 * - 4-column grid of a.article-card elements
 * - Each card: .article-card-image > img + .article-card-body > (.article-card-meta > .tag + date) + h3
 * - Entire card is a link (<a>)
 *
 * Block library cards structure (2 columns):
 * - Each row: col1 = image, col2 = text (tag + date + heading with link)
 */
export default function parse(element, { document }) {
  // Get article card links from captured DOM
  const cards = Array.from(element.querySelectorAll('a.article-card'));

  const cells = [];

  cards.forEach((card) => {
    const img = card.querySelector('img.cover-image, img');

    // Build text cell: tag, date, and linked heading
    const textContainer = document.createElement('div');

    const tag = card.querySelector('.tag');
    if (tag) textContainer.append(tag);

    const date = card.querySelector('.article-card-meta .paragraph-sm');
    if (date) textContainer.append(date);

    const heading = card.querySelector('h3, h4');
    if (heading) {
      // Wrap heading text in a link to preserve card URL
      const link = document.createElement('a');
      link.href = card.href;
      link.textContent = heading.textContent;
      heading.textContent = '';
      heading.appendChild(link);
      textContainer.append(heading);
    }

    cells.push([img || '', textContainer]);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-article', cells });
  element.replaceWith(block);
}
