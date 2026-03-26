// ==UserScript==
// @name         クリーンアップ
// @namespace    http://tampermonkey.net/
// @version      1.0
// @match        https://tenbin.ai/workspace*
// @grant        none
// ==/UserScript==

(function() {
  'use strict';

  const selectors = [
    '.p-Footer',
    '.gmoGroupFooter',
    '.gmoGroupHeader'
  ];

  function cleanup() {
    document.querySelectorAll(selectors.join(',')).forEach(el => el.remove());
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    document.body.style.marginTop = '-28px';
  }

  const observer = new MutationObserver(cleanup);
  observer.observe(document.body, { childList: true, subtree: true });

  window.addEventListener('load', cleanup);
})();
