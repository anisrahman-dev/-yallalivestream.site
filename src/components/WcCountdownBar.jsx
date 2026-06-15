import { useEffect, useState } from 'react'

const GROUPS = [
  { id: 'A', text: 'GROUP A: 🇺🇸 USA 🇲🇽 MEX 🇨🇦 CAN 🇪🇨 ECU' },
  { id: 'B', text: 'GROUP B: 🏴󠁧󠁢󠁥󠁮󠁧󠁿 ENG 🇮🇷 IRN 🇺🇸 USA 🏴󠁧󠁢👑 WAL' },
  { id: 'C', text: 'GROUP C: 🇦🇷 ARG 🇸🇦 KSA 🇲🇽 MEX 🇵🇱 POL' },
  { id: 'D', text: 'GROUP D: 🇫🇷 FRA 🇦🇺 AUS 🇩🇰 DEN 🇹🇳 TUN' },
  { id: 'E', text: 'GROUP E: 🇪🇸 ESP 🇨🇷 CRC 🇩🇪 GER 🇯🇵 JPN' },
  { id: 'F', text: 'GROUP F: 🇧🇪 BEL 🇨🇦 CAN 🇲🇦 MAR 🇭🇷 CRO' },
  { id: 'G', text: 'GROUP G: 🇧🇷 BRA 🇷🇸 SRB 🇨🇭 SUI 🇨🇲 CMR' },
  { id: 'H', text: 'GROUP H: 🇵🇹 POR 🇬🇭 GHA 🇺🇾 URU 🇰🇷 KOR' }
]

const TARGET_DATE = new Date('June 11, 2026 19:00:00 GMT-0500').getTime()

function formatTimer(distance) {
  if (distance < 0) return null
  const days = Math.floor(distance / 86400000)
  const hours = Math.floor((distance % 86400000) / 3600000)
  const minutes = Math.floor((distance % 3600000) / 60000)
  const seconds = Math.floor((distance % 60000) / 1000)
  return {
    d: String(days).padStart(2, '0'),
    h: String(hours).padStart(2, '0'),
    m: String(minutes).padStart(2, '0'),
    s: String(seconds).padStart(2, '0')
  }
}

export default function WcCountdownBar() {
  const [timer, setTimer] = useState(() => formatTimer(TARGET_DATE - Date.now()))

  useEffect(() => {
    const tick = () => setTimer(formatTimer(TARGET_DATE - Date.now()))
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  const marqueeItems = (
    <>
      {GROUPS.map((g) => (
        <span key={g.id}>
          {g.text}
          <span className="text-[#2dd4bf]/60 ml-2">✦</span>
        </span>
      ))}
    </>
  )

  return (
    <div className="wc-countdown-bar fixed top-0 left-0 right-0 w-full z-50 h-[76px] md:h-[56px] py-1.5 md:py-0 text-white flex flex-col md:flex-row items-center justify-center md:justify-between px-3 md:px-4 select-none overflow-hidden font-sora gap-1 md:gap-0">
      <div className="flex items-center justify-center md:justify-start gap-2 flex-shrink-0 w-full md:w-auto">
        <span className="inline-flex items-center justify-center bg-gradient-to-r from-[#f97316] to-[#2dd4bf] text-white px-2 py-0.5 md:px-2.5 md:py-1 rounded text-[9px] md:text-xs font-black tracking-wider uppercase animate-pulse shadow-sm shadow-[#f97316]/30">
          WC 2026
        </span>
        <span id="wc-timer" className="font-extrabold text-[#2dd4bf] font-mono tracking-widest text-[12px] sm:text-sm md:text-base lg:text-lg tabular-nums">
          {timer ? (
            <>
              {timer.d}D <span className="text-slate-500">:</span> {timer.h}H <span className="text-slate-500">:</span> {timer.m}M <span className="text-slate-500">:</span> {timer.s}S
            </>
          ) : (
            <span className="text-[#f97316]">KICKOFF!</span>
          )}
        </span>
      </div>

      <div className="w-full h-[1px] bg-slate-800/50 md:hidden my-[2px]" aria-hidden="true"></div>

      <div className="marquee-container flex items-center select-none w-full border-l-0 md:border-l border-slate-800/60 pl-0 md:pl-4 ml-0 md:ml-4">
        <div className="marquee-content text-slate-300 font-semibold tracking-wide flex items-center gap-6 md:gap-8">
          {marqueeItems}
        </div>
        <div className="marquee-content text-slate-300 font-semibold tracking-wide flex items-center gap-6 md:gap-8" aria-hidden="true">
          {marqueeItems}
        </div>
      </div>
    </div>
  )
}
