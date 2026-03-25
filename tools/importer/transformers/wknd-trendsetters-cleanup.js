/* eslint-disable */
/* global WebImporter */

/**
 * Transformer: WKND Trendsetters cleanup.
 * Selectors from captured DOM of https://wknd-trendsetters.site
 */
const TransformHook = { beforeTransform: 'beforeTransform', afterTransform: 'afterTransform' };

export default function transform(hookName, element, payload) {
  if (hookName === TransformHook.beforeTransform) {
    // Remove skip link that blocks content flow
    // Found in captured HTML: <a href="#main-content" class="skip-link">
    WebImporter.DOMUtils.remove(element, ['a.skip-link']);
  }
  if (hookName === TransformHook.afterTransform) {
    // Remove non-authorable site chrome from captured DOM
    WebImporter.DOMUtils.remove(element, [
      'div.navbar',        // Site navigation bar: <div class="navbar">
      'footer.footer',     // Site footer: <footer class="footer inverse-footer">
      'link',              // Stylesheet link elements
      'noscript'           // Noscript fallback elements
    ]);
  }
}
