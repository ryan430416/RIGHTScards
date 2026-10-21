import { NavLink } from 'react-router-dom'
import './SiteNav.css'

export function SiteNav() {
  return (
    <header className="site-nav">
      <div className="site-nav__inner">
        <NavLink to="/" className="site-nav__brand" end>
          <span className="site-nav__brand-mark" aria-hidden="true" />
          <span className="site-nav__brand-text">
            <span className="site-nav__brand-event">學生權益週</span>
            <span className="site-nav__brand-title">權流・溯源</span>
          </span>
        </NavLink>

        <nav className="site-nav__links" aria-label="主要導覽">
          <NavLink to="/" className="site-nav__link" end>
            首頁
          </NavLink>
          <NavLink to="/characters" className="site-nav__link">
            角色圖鑑
          </NavLink>
        </nav>
      </div>
    </header>
  )
}
