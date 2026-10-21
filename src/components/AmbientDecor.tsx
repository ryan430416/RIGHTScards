import './AmbientDecor.css'

/** 背景拱門輪廓、星盤刻線與流動光線（非滿版海報） */
export function AmbientDecor() {
  return (
    <div className="ambient" aria-hidden="true">
      <div className="ambient__haze ambient__haze--a" />
      <div className="ambient__haze ambient__haze--b" />
      <svg className="ambient__arch" viewBox="0 0 800 500" fill="none">
        <path
          d="M140 460 V220 C140 110 250 40 400 40 C550 40 660 110 660 220 V460"
          stroke="rgba(212,175,55,0.18)"
          strokeWidth="1.2"
        />
        <path
          d="M170 460 V230 C170 135 265 70 400 70 C535 70 630 135 630 230 V460"
          stroke="rgba(158,182,212,0.12)"
          strokeWidth="0.8"
        />
        <path
          d="M400 40 L400 18 M388 28 H412"
          stroke="rgba(212,175,55,0.35)"
          strokeWidth="1"
        />
      </svg>

      <svg className="ambient__astro" viewBox="0 0 320 320" fill="none">
        <circle cx="160" cy="160" r="118" stroke="rgba(212,175,55,0.12)" strokeWidth="0.8" />
        <circle cx="160" cy="160" r="88" stroke="rgba(158,182,212,0.1)" strokeWidth="0.7" strokeDasharray="3 6" />
        <circle cx="160" cy="160" r="52" stroke="rgba(212,175,55,0.14)" strokeWidth="0.7" />
        <path d="M160 30 V290 M30 160 H290" stroke="rgba(212,175,55,0.1)" strokeWidth="0.6" />
        <path d="M70 70 L250 250 M250 70 L70 250" stroke="rgba(158,182,212,0.08)" strokeWidth="0.6" />
      </svg>

      <div className="ambient__flow ambient__flow--1" />
      <div className="ambient__flow ambient__flow--2" />
    </div>
  )
}
