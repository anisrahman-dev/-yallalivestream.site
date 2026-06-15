import { useEffect, useMemo, useState } from 'react'
import Layout from '../components/Layout.jsx'
import PageMeta from '../components/PageMeta.jsx'
import MatchCard from '../components/MatchCard.jsx'
import GutterAds from '../components/GutterAds.jsx'
import AdUnit from '../components/AdUnit.jsx'
import { loadMatches, FOOT_ORIGIN } from '../lib/matches.js'

function injectSiteNavigationSchema(todayMatches) {
  const origin = window.location.origin
  const navElements = todayMatches.slice(0, 4).map((m, idx) => ({
    '@type': 'SiteNavigationElement',
    position: idx + 1,
    name: `${m.homeTeam.name} vs ${m.awayTeam.name} Live`,
    description: `Watch today's live stream of ${m.homeTeam.name} vs ${m.awayTeam.name} on Yalla Live Stream.`,
    url: `${origin}/#match-${m.id}`
  }))
  if (navElements.length === 0) {
    navElements.push({
      '@type': 'SiteNavigationElement',
      position: 1,
      name: 'Live Football Schedule Today',
      description: "Watch today's most important matches live on Yalla Live Stream.",
      url: `${origin}/`
    })
  }
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${origin}/#website`,
        url: origin,
        name: 'Yalla Live Stream',
        publisher: { '@type': 'Organization', name: 'Yalla Live Stream', logo: { '@type': 'ImageObject', url: `${origin}/logos/logo-unified.png` } }
      },
      { '@type': 'ItemList', '@id': `${origin}/#navigation`, name: "Today's Live Football Match Sitelinks", itemListElement: navElements }
    ]
  }
  const id = 'yalla-sitenav-schema'
  document.getElementById(id)?.remove()
  const script = document.createElement('script')
  script.id = id
  script.type = 'application/ld+json'
  script.text = JSON.stringify(schema)
  document.head.appendChild(script)
}

const TABS = [
  { key: 'yesterday', label: 'Yesterday' },
  { key: 'today', label: 'Today' },
  { key: 'tomorrow', label: 'Tomorrow' }
]

export default function Home() {
  const [matches, setMatches] = useState([])
  const [tab, setTab] = useState('today')
  const [today, setToday] = useState('')

  // Match data lives on the main Yalla Live Football site; we read it from there.
  useEffect(() => {
    loadMatches().then(setMatches).catch(() => setMatches([]))
  }, [])

  useEffect(() => {
    const opts = { month: 'short', day: 'numeric', year: 'numeric' }
    setToday('- ' + new Date().toLocaleDateString('en-US', opts))
  }, [])

  const todayImportant = useMemo(
    () => matches.filter((m) => m.day === 'today' && m.isImportant),
    [matches]
  )

  useEffect(() => {
    if (matches.length === 0) return
    injectSiteNavigationSchema(todayImportant)
  }, [matches, todayImportant])

  const visible = useMemo(() => matches.filter((m) => m.day === tab), [tab, matches])

  const emptyMessage = useMemo(() => {
    if (tab === 'tomorrow') return 'There is no match tomorrow.'
    if (tab === 'yesterday') return 'There is no match yesterday.'
    return 'There is no match today.'
  }, [tab])

  // "Send to foot": clicking any match opens the main Yalla Live Football site
  // to watch the stream there.
  const handleOpen = () => {
    window.open(FOOT_ORIGIN + '/', '_blank', 'noopener')
  }

  return (
    <Layout withWcBar>
      <PageMeta
        title="Yalla Live Stream | Free Live Football Streaming for Every Match"
        description="Yalla Live Stream — free live football streaming with today's full fixture list, kickoff times and real-time scores for the Premier League, La Liga, Serie A, Champions League and more. One tap to the stream."
        keywords="Yalla Live Stream, yalla stream, live football streaming, watch football live, free soccer streams, yalla shoot, koora live stream, live football matches, live scores, today football schedule"
        ogTitle="Yalla Live Stream | Free Live Football Streaming for Every Match"
        ogDescription="Stream today's football live and free on any device. Full schedule, real-time scores and one-tap match streams."
      />

      <GutterAds />

      <main className="pt-[176px] md:pt-[156px] pb-6 md:pb-16 max-w-[1000px] mx-auto min-h-screen px-4">
        <div className="mb-6">
          <h1 className="green-sub-bar shadow-sm block m-0">Yalla Live Stream - Free Live Football Streaming for Every Match</h1>
        </div>

        <section className="mb-8 bg-white dark:bg-slate-900/50 border border-gray-200 dark:border-slate-800 rounded-2xl p-5 md:p-7 shadow-sm" aria-labelledby="about-yalla-live-stream">
          <h2 id="about-yalla-live-stream" className="text-lg md:text-xl font-extrabold text-gray-900 dark:text-white mb-3 tracking-tight">
            Free Live Football Streams — Every League in One Place
          </h2>
          <p className="text-sm md:text-base text-gray-700 dark:text-slate-300 leading-relaxed mb-3">
            <strong className="text-primary">Yalla Live Stream</strong> is your free hub for watching football live online. Open a match on your phone, tablet, laptop or TV browser and the stream starts in a single tap — no sign-up, no clutter. Catch the <strong>English Premier League</strong>, <strong>La Liga</strong>, <strong>Serie A</strong>, <strong>Bundesliga</strong> and <strong>Ligue 1</strong> with accurate kickoff times and live scores beside every fixture.
          </p>
          <p className="text-sm md:text-base text-gray-700 dark:text-slate-300 leading-relaxed">
            Our fixture board updates automatically through the day, so today’s, yesterday’s and tomorrow’s games are always one click away — including the <strong>UEFA Champions League</strong>, <strong>Europa League</strong> and <strong>FIFA World Cup 2026</strong> ties. Find your game, tap it, and start streaming.
          </p>
        </section>

        <div className="flex flex-wrap justify-center items-center gap-4 mb-8">
          <AdUnit adKey="0d95f3cc5d513c86c4303b542e9c3a68" width={320} height={50} showLabel={false} />
          <AdUnit adKey="0d95f3cc5d513c86c4303b542e9c3a68" width={320} height={50} showLabel={false} />
        </div>

        <div className="main-wrapper">
          <div className="flex justify-center items-center gap-2 mb-6 pb-4 border-b border-gray-200 dark:border-gray-700">
            {TABS.map((t) => (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className="league-pill text-xs font-bold uppercase px-4 md:px-6 py-2.5 rounded shadow-sm transition-all flex items-center gap-1 text-center"
                style={tab === t.key ? { transform: 'scale(1.05)', opacity: 1, border: '2px solid #ffffff' } : { transform: 'scale(1)', opacity: 0.75, border: 'none' }}
              >
                <span>{t.label}</span>
                {t.key === 'today' && <span className="text-accent">{today}</span>}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-4" id="matches-container">
            {visible.length === 0 ? (
              <div className="text-center py-12 text-gray-500 dark:text-slate-400 font-medium">{emptyMessage}</div>
            ) : (
              visible.map((m) => <MatchCard key={m.id} match={m} onOpen={handleOpen} />)
            )}
          </div>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-4 mt-8">
          <AdUnit adKey="0d95f3cc5d513c86c4303b542e9c3a68" width={320} height={50} showLabel={false} />
          <AdUnit adKey="0d95f3cc5d513c86c4303b542e9c3a68" width={320} height={50} showLabel={false} />
        </div>

        <section className="mt-10 bg-white dark:bg-slate-900/50 border border-gray-200 dark:border-slate-800 rounded-2xl p-5 md:p-7 shadow-sm" aria-labelledby="how-to-stream">
          <h2 id="how-to-stream" className="text-lg md:text-xl font-extrabold text-gray-900 dark:text-white mb-3 tracking-tight">
            How to Stream Live Football on Yalla Live Stream
          </h2>
          <p className="text-sm md:text-base text-gray-700 dark:text-slate-300 leading-relaxed mb-3">
            Streaming a game takes three seconds: scroll to the fixture you want, tap the card, and the live feed loads instantly. <strong className="text-primary">Yalla Live Stream</strong> gathers the day’s biggest matches into one tidy schedule, so there’s no hunting across a dozen sites to find a working link. Every card lists the competition, your local kickoff time and the live status at a glance.
          </p>
          <p className="text-sm md:text-base text-gray-700 dark:text-slate-300 leading-relaxed">
            For buffer-free viewing aim for at least <strong>5 Mbps</strong>, or <strong>10 Mbps</strong> for full HD. The site is built mobile-first with large, tap-friendly cards and a board that refreshes on its own — save it to your home screen and open it minutes before kickoff.
          </p>
        </section>
      </main>
    </Layout>
  )
}
