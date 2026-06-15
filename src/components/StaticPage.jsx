import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import Layout from './Layout.jsx'
import PageMeta from './PageMeta.jsx'

/**
 * Renders pre-built article HTML inside the shared shell.
 * Intercepts internal anchor clicks so React Router handles them.
 */
export default function StaticPage({ meta, html }) {
  const containerRef = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    const root = containerRef.current
    if (!root) return
    const onClick = (e) => {
      const a = e.target.closest('a')
      if (!a) return
      const href = a.getAttribute('href')
      if (!href) return
      if (a.target === '_blank') return
      if (href.startsWith('http://') || href.startsWith('https://') || href.startsWith('mailto:') || href.startsWith('tel:')) return
      if (href.startsWith('#')) return
      e.preventDefault()
      navigate(href.startsWith('/') ? href : `/${href}`)
    }
    root.addEventListener('click', onClick)
    return () => root.removeEventListener('click', onClick)
  }, [navigate])

  return (
    <Layout>
      {meta && <PageMeta {...meta} />}
      <div ref={containerRef} dangerouslySetInnerHTML={{ __html: html }} />
    </Layout>
  )
}
