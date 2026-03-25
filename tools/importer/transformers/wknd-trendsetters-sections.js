/* eslint-disable */
/* global WebImporter */

/**
 * Transformer: WKND Trendsetters section breaks and section-metadata.
 * Processes payload.template.sections to insert <hr> and Section Metadata blocks.
 * Runs in afterTransform only (after block parsing).
 */
const TransformHook = { beforeTransform: 'beforeTransform', afterTransform: 'afterTransform' };

export default function transform(hookName, element, payload) {
  if (hookName === TransformHook.afterTransform) {
    const template = payload.template;
    if (!template || !template.sections || template.sections.length < 2) return;

    const { sections } = template;
    const doc = element.ownerDocument;

    // Process sections in reverse order to avoid selector invalidation
    for (let i = sections.length - 1; i >= 0; i--) {
      const section = sections[i];
      const selectors = Array.isArray(section.selector) ? section.selector : [section.selector];

      let sectionEl = null;
      for (const sel of selectors) {
        sectionEl = doc.querySelector(sel);
        if (sectionEl) break;
      }

      if (!sectionEl) continue;

      // Add Section Metadata block if section has a style
      if (section.style) {
        const metaBlock = WebImporter.Blocks.createBlock(doc, {
          name: 'Section Metadata',
          cells: { style: section.style },
        });
        sectionEl.append(metaBlock);
      }

      // Add <hr> before section (except first section)
      if (i > 0) {
        const hr = doc.createElement('hr');
        sectionEl.before(hr);
      }
    }
  }
}
