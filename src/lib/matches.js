// This is the standalone Yalla Live Stream app. It has no match data of its own —
// it reads the live feed (and team logos) from the main Yalla Live Football
// site, so whatever the admin publishes there shows up here automatically.
export const FOOT_ORIGIN = 'https://www.yallalivefootball.com'

export async function loadMatches() {
  const res = await fetch(`${FOOT_ORIGIN}/matches.js`, { cache: 'no-store' })
  if (!res.ok) throw new Error(`Failed to fetch matches.js: ${res.status}`)
  const text = await res.text()
  const m = text.match(/const\s+MATCHES_DATA\s*=\s*(\[[\s\S]*?\]);?\s*$/m)
  if (!m) throw new Error('Could not parse matches.js')
  // eslint-disable-next-line no-new-func
  const arr = new Function('return ' + m[1])()
  if (!Array.isArray(arr)) throw new Error('matches.js did not produce an array')
  return arr
}

// Convert a Dhaka-local time string ("9:00 PM" or "21:00") to the user's local time.
export function convertDhakaTimeToLocal(timeStr, dayOffsetStr) {
  try {
    const now = new Date()
    const targetDate = new Date()
    if (dayOffsetStr === 'tomorrow') targetDate.setDate(now.getDate() + 1)
    else if (dayOffsetStr === 'yesterday') targetDate.setDate(now.getDate() - 1)

    let hours = 0
    let minutes = 0
    const match12 = timeStr.match(/^(\d+):(\d+)\s*(AM|PM)$/i)
    const match24 = timeStr.match(/^(\d+):(\d+)$/)
    if (match12) {
      hours = parseInt(match12[1], 10)
      minutes = parseInt(match12[2], 10)
      const ampm = match12[3].toUpperCase()
      if (ampm === 'PM' && hours < 12) hours += 12
      if (ampm === 'AM' && hours === 12) hours = 0
    } else if (match24) {
      hours = parseInt(match24[1], 10)
      minutes = parseInt(match24[2], 10)
    } else {
      return timeStr
    }

    const year = targetDate.getFullYear()
    const month = String(targetDate.getMonth() + 1).padStart(2, '0')
    const date = String(targetDate.getDate()).padStart(2, '0')
    const hh = String(hours).padStart(2, '0')
    const mm = String(minutes).padStart(2, '0')

    const dhakaIsoStr = `${year}-${month}-${date}T${hh}:${mm}:00+06:00`
    const localDate = new Date(dhakaIsoStr)
    if (isNaN(localDate.getTime())) return timeStr
    return localDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })
  } catch (e) {
    return timeStr
  }
}
