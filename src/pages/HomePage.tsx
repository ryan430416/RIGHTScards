import { Link } from 'react-router-dom'
import { AmbientDecor } from '../components/AmbientDecor'
import './HomePage.css'

/**
 * 首頁入口。目前為活動導覽；若之後加入抽卡功能，可在此擴充，
 * 並保留通往「角色圖鑑」的導覽。
 */
export function HomePage() {
  return (
    <div className="home-page">
      <AmbientDecor />
      <main className="home-page__main">
        <section className="home-hero" aria-labelledby="home-title">
          <p className="home-hero__eyebrow">學生權益週</p>
          <h1 id="home-title" className="home-hero__title">
            權流・溯源
          </h1>
          <p className="home-hero__tagline">溯其源・知其權</p>
          <p className="home-hero__english">
            TRACE THE SOURCE. KNOW YOUR RIGHTS.
          </p>
          <p className="home-hero__lead">
            循著光流，認識與你同行的獵鷹，理解自身權益的起點。
          </p>
          <div className="home-hero__actions">
            <Link className="btn btn--primary" to="/characters">
              進入角色圖鑑
            </Link>
          </div>
        </section>
      </main>
    </div>
  )
}
