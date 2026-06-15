import { useEffect } from 'react'

function upsertMeta(selector, attrs) {
  let el = document.head.querySelector(selector)
  if (!el) {
    el = document.createElement('meta')
    Object.entries(attrs).forEach(([k, v]) => {
      if (k === 'name' || k === 'property') el.setAttribute(k, v)
    })
    document.head.appendChild(el)
  }
  Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v))
  return el
}

export default function PageMeta({ title, description, keywords, ogTitle, ogDescription, robots }) {
  useEffect(() => {
    if (title) document.title = title
    if (description) upsertMeta('meta[name="description"]', { name: 'description', content: description })
    if (keywords) upsertMeta('meta[name="keywords"]', { name: 'keywords', content: keywords })
    if (ogTitle) upsertMeta('meta[property="og:title"]', { property: 'og:title', content: ogTitle })
    if (ogDescription) upsertMeta('meta[property="og:description"]', { property: 'og:description', content: ogDescription })
    if (robots) upsertMeta('meta[name="robots"]', { name: 'robots', content: robots })
  }, [title, description, keywords, ogTitle, ogDescription, robots])
  return null
}
