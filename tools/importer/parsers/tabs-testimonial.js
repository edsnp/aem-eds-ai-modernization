/* eslint-disable */
/* global WebImporter */

/**
 * Parser for tabs-testimonial variant.
 * Base block: tabs
 * Source: https://wknd-trendsetters.site
 * Source selector: .tabs-wrapper
 *
 * Source HTML structure (from captured DOM):
 * - .tabs-content contains .tab-pane elements (4 panes)
 * - Each pane has: .grid-layout > [image div + text div (name/role + quote)]
 * - .tab-menu has button.tab-menu-link elements with avatar + name + role
 *
 * Block library tabs structure (2 columns):
 * - Each row: col1 = tab label, col2 = tab content
 */
export default function parse(element, { document }) {
  // Get tab panes and menu buttons from captured DOM
  const tabPanes = Array.from(element.querySelectorAll('.tab-pane'));
  const tabButtons = Array.from(element.querySelectorAll('button[role="tab"]'));

  const cells = [];

  tabPanes.forEach((pane, index) => {
    // Tab label: person name from the tab menu button
    const button = tabButtons[index];
    const nameEl = button ? button.querySelector('strong') : null;
    const label = nameEl ? nameEl.textContent.trim() : `Tab ${index + 1}`;

    // Tab content: the grid-layout inside the pane (image + name/role + quote)
    const gridLayout = pane.querySelector('.grid-layout');

    cells.push([label, gridLayout || pane]);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'tabs-testimonial', cells });
  element.replaceWith(block);
}
