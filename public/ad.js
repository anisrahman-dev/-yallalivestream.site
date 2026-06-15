/**
 * Yalla Live - Ad Redirection Script
 * Loads the 728x90 premium stream banner ad inside the redirect modal container.
 */

// Define global atOptions for High Performance Format
atOptions = {
  'key' : '67f6a9b5612784f7953aab973b86c1a3',
  'format' : 'iframe',
  'height' : 90,
  'width' : 728,
  'params' : {}
};

// Dynamically insert invoke.js immediately after this script container
(function() {
  const script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = 'https://www.highperformanceformat.com/67f6a9b5612784f7953aab973b86c1a3/invoke.js';
  
  // Locate this script element to insert invoke.js directly in the same ad container
  const currentScript = document.currentScript || document.scripts[document.scripts.length - 1];
  if (currentScript && currentScript.parentNode) {
    currentScript.parentNode.insertBefore(script, currentScript.nextSibling);
  }
})();
