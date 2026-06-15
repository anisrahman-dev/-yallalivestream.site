// SITE_CONFIG is loaded by /site-config.js script tag in index.html and
// hangs off window. This thin accessor centralizes reads.
const DEFAULT = {
  adsEnabled: false,
  vignetteEnabled: false,
  multiAdEnabled: false,
  popUnderEnabled: false,
  networkTagsEnabled: false,
  tvBannerAdsEnabled: false,
  tvNativeAdEnabled: false,
  countdownEnabled: true,
  countdownSeconds: 10
}

export function getSiteConfig() {
  if (typeof window === 'undefined') return DEFAULT
  return { ...DEFAULT, ...(window.SITE_CONFIG || {}) }
}
