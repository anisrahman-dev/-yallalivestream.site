import { convertDhakaTimeToLocal, FOOT_ORIGIN } from '../lib/matches.js'

export default function MatchCard({ match, onOpen }) {
  const displayLocalTime = convertDhakaTimeToLocal(match.time, match.day)
  const showStatus = match.status && match.status !== "It hasn't started yet." && match.status !== 'Not started'
  const statusBadge = showStatus ? (
    <span className="match-info-badge text-[9px] md:text-xs px-2 py-0.5" style={{ whiteSpace: 'nowrap' }}>
      {match.status}
    </span>
  ) : null

  const servers = Array.isArray(match.servers) ? match.servers.filter(Boolean) : []
  if (servers.length === 0 && match.link && match.link.trim()) servers.push(match.link.trim())
  const hasLink = servers.length > 0

  const handleClick = (e) => {
    if (!hasLink) return
    e.preventDefault()
    onOpen(match.id, servers)
  }

  const Tag = hasLink ? 'a' : 'article'
  const tagProps = hasLink
    ? { href: '#', onClick: handleClick, className: 'custom-match-card block cursor-pointer hover:no-underline' }
    : { className: 'custom-match-card' }

  return (
    <Tag {...tagProps}>
      <div className="flex flex-row items-center justify-between p-4 md:p-5">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between w-[68%] md:w-full gap-2 md:gap-0">
          <div className="flex flex-row items-center gap-3 w-full md:w-[38%] justify-start">
            <img
              src={FOOT_ORIGIN + '/' + match.homeTeam.logo}
              alt={match.homeTeam.name}
              className="team-logo-img w-8 h-8 md:w-11 md:h-11 object-contain flex-shrink-0"
              onError={(e) => { e.currentTarget.src = FOOT_ORIGIN + '/logos/dr-congo.svg' }}
            />
            <span className="text-xs md:text-sm font-bold text-gray-800 dark:text-slate-100 line-clamp-1">
              {match.homeTeam.name}
            </span>
          </div>
          <div className="hidden md:flex flex-col items-center justify-center gap-1.5 w-[24%] text-center">
            <span className="text-sm md:text-base font-extrabold tracking-tight text-gray-900 dark:text-white leading-none">
              {displayLocalTime}
            </span>
            {statusBadge}
          </div>
          <div className="flex flex-row items-center gap-3 w-full md:w-[38%] justify-start text-left md:text-right md:flex-row-reverse">
            <img
              src={FOOT_ORIGIN + '/' + match.awayTeam.logo}
              alt={match.awayTeam.name}
              className="team-logo-img w-8 h-8 md:w-11 md:h-11 object-contain flex-shrink-0"
              onError={(e) => { e.currentTarget.src = FOOT_ORIGIN + '/logos/cameroon.svg' }}
            />
            <span className="text-xs md:text-sm font-bold text-gray-800 dark:text-slate-100 line-clamp-1">
              {match.awayTeam.name}
            </span>
          </div>
        </div>
        <div className="flex md:hidden flex-col items-center justify-center gap-1 w-[32%] text-center">
          <span className="text-xs font-extrabold tracking-tight text-gray-900 dark:text-white leading-none">
            {displayLocalTime}
          </span>
          {statusBadge}
        </div>
      </div>
      <div className="border-t border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-slate-800/20 py-2.5 text-center px-4">
        <span className="text-xs font-semibold text-gray-500 dark:text-slate-400 block truncate">
          {match.league}
        </span>
      </div>
    </Tag>
  )
}
