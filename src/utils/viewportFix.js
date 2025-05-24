/**
 * viewportFix.js - Fixes inconsistent viewport height on mobile browsers
 * 
 * This utility addresses the issue where 100vh doesn't account for 
 * browser UI elements on mobile devices, causing content to be cut off.
 */

// Set the --vh custom property based on the actual viewport height
const setViewportHeight = () => {
  // First we get the viewport height and we multiply it by 1% to get a value for a vh unit
  const vh = window.innerHeight * 0.01;
  
  // Then we set the value in the --vh custom property to the root of the document
  document.documentElement.style.setProperty('--vh', `${vh}px`);
};

// Run once on load
export const initViewportFix = () => {
  setViewportHeight();

  // Update on resize and orientation change
  window.addEventListener('resize', setViewportHeight);
  window.addEventListener('orientationchange', setViewportHeight);
};
