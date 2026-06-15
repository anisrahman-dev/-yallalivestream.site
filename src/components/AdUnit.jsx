import { getSiteConfig } from '../lib/siteConfig.js'

/**
 * Renders a single highperformanceformat (Adsterra) iframe ad unit.
 *
 * Each unit runs inside an isolated srcDoc iframe so that the global
 * `atOptions` object each invoke.js reads cannot clobber sibling units
 * on the same page. Only renders when ads are enabled in site config.
 */
export default function AdUnit({ adKey, width, height, className = '', showLabel = true }) {
  if (!getSiteConfig().adsEnabled) return null

  const srcDoc =
    '<!doctype html><html><head><meta charset="utf-8">' +
    '<style>html,body{margin:0;padding:0;overflow:hidden;background:transparent}</style></head><body>' +
    `<script type="text/javascript">atOptions={'key':'${adKey}','format':'iframe','height':${height},'width':${width},'params':{}};</script>` +
    `<script type="text/javascript" src="https://www.highperformanceformat.com/${adKey}/invoke.js"></script>` +
    '</body></html>'

  return (
    <div className={`flex flex-col items-center gap-1 ${className}`}>
      {showLabel && (
        <span className="text-[9px] uppercase tracking-wider text-gray-400 dark:text-slate-500 font-semibold">Advertisement</span>
      )}
      <iframe
        title="advertisement"
        srcDoc={srcDoc}
        width={width}
        height={height}
        scrolling="no"
        frameBorder="0"
        style={{ width: `${width}px`, height: `${height}px`, border: 0, overflow: 'hidden' }}
      />
    </div>
  )
}
