/* eslint-disable */
/* global WebImporter */

/**
 * Parser for accordion-faq variant.
 * Base block: accordion
 * Source: https://wknd-trendsetters.site
 * Source selector: .faq-list
 *
 * Source HTML structure (from captured DOM):
 * - div.faq-list contains details.faq-item elements (4 items)
 * - Each item: summary.faq-question > span (question text) + div.faq-answer > p (answer)
 *
 * Block library accordion structure (2 columns):
 * - Each row: col1 = question title, col2 = answer content
 */
export default function parse(element, { document }) {
  // Get FAQ items from captured DOM
  const items = Array.from(element.querySelectorAll('details.faq-item'));

  const cells = [];

  items.forEach((item) => {
    // Question: first span inside summary (excludes icon span)
    const summary = item.querySelector('summary.faq-question');
    const questionSpan = summary ? summary.querySelector('span:first-child') : null;
    const questionEl = document.createElement('p');
    questionEl.textContent = questionSpan ? questionSpan.textContent.trim() : '';

    // Answer: content inside .faq-answer
    const answer = item.querySelector('.faq-answer');

    cells.push([questionEl, answer || '']);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'accordion-faq', cells });
  element.replaceWith(block);
}
