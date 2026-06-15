/**
 * Renders a third-party ad snippet inside its own isolated <iframe> via srcdoc.
 *
 * Why an iframe: several ad networks (e.g. Adsterra / highperformanceformat)
 * read a shared global `atOptions` the moment their invoke.js loads. Dropping
 * two such snippets on the same page makes the second clobber the first. Giving
 * each ad its own document removes the collision, lets document.write-based
 * loaders work, and makes the ad re-render cleanly on client-side navigation.
 */
export default function IframeAd({ html, width, height, title = 'Advertisement', responsive = false, className = '' }) {
  const srcDoc = `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style>*{margin:0;padding:0;box-sizing:border-box}html,body{overflow:hidden;background:transparent}body{display:flex;align-items:center;justify-content:center;width:100%;height:100%}</style></head><body>${html}</body></html>`

  return (
    <iframe
      title={title}
      srcDoc={srcDoc}
      width={width}
      height={height}
      scrolling="no"
      className={className}
      style={{
        border: 0,
        display: 'block',
        width: responsive ? '100%' : `${width}px`,
        maxWidth: `${width}px`,
        height: `${height}px`
      }}
    />
  )
}
