import { useEffect, useState } from 'react'
import { about, forum, hero, identity, links, nav, scholarship, team, testimonials } from './content.js'

function Wordmark({ light = false }) {
  return (
    <a href="#top" className={`wordmark ${light ? 'wordmark--light' : ''}`} aria-label="Club Alpbach Iraq, home">
      <img src="brand/globe.png" alt="" width="40" height="40" />
      <span>
        Club Alpbach <strong>Iraq</strong>
      </span>
    </a>
  )
}

function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`header ${scrolled ? 'header--scrolled' : ''}`}>
      <div className="container header__inner">
        <Wordmark />
        <button
          className="menu-btn"
          aria-expanded={open}
          aria-controls="site-nav"
          onClick={() => setOpen((o) => !o)}
        >
          <span className="sr-only">Menu</span>
          <span className="menu-btn__bar" />
          <span className="menu-btn__bar" />
        </button>
        <nav id="site-nav" className={`nav ${open ? 'nav--open' : ''}`}>
          {nav.map((n) => (
            <a key={n.id} href={`#${n.id}`} onClick={() => setOpen(false)}>
              {n.label}
            </a>
          ))}
          <a className="btn btn--small" href={links.instagram} target="_blank" rel="noreferrer">
            Instagram
          </a>
        </nav>
      </div>
    </header>
  )
}

// The red-square callout used across the CAI brand kit ("CIRCLE", "TIGRIS", "EUPHRATES").
function Callout({ label, className = '' }) {
  return (
    <span className={`callout ${className}`} aria-hidden="true">
      <span className="callout__dot" />
      <span className="callout__line" />
      <span className="callout__label">{label}</span>
    </span>
  )
}

function SectionHead({ eyebrow, title, children, center = false }) {
  return (
    <div className={`section-head ${center ? 'section-head--center' : ''}`}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2>{title}</h2>
      {children}
    </div>
  )
}

function Hero() {
  return (
    <section className="hero" id="top">
      <div className="container hero__grid">
        <div className="hero__text">
          <h1 className="stack">
            <span>Club</span>
            <span>Alpbach</span>
            <span>Iraq</span>
          </h1>
          <div className="hero__rule" />
          <p className="hero__fan">{hero.tag}</p>
          <p className="hero__lead">{hero.lead}</p>
          <div className="chips">
            {hero.facts.map((f) => (
              <span className="chip" key={f}>
                {f}
              </span>
            ))}
          </div>
          <div className="hero__ctas">
            <a className="btn" href="#scholarship">
              Go to Alpbach
            </a>
            <a className="btn btn--ghost" href="#about">
              Who we are
            </a>
          </div>
        </div>
        <figure className="hero__media">
          <img
            src="brand/alpbach-congress.jpg"
            alt="Reception on the roof of the Alpbach congress centre, with mountains behind"
          />
          <Callout label="CIRCLE" className="hero__callout" />
          <img className="hero__globe" src="brand/globe.png" alt="" />
        </figure>
      </div>
    </section>
  )
}

function About() {
  return (
    <section className="section" id="about">
      <div className="container about">
        <SectionHead eyebrow="About us" title={about.title} />
        <div className="about__body">
          {about.paragraphs.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
        <div className="pillars">
          {about.pillars.map((p, i) => (
            <div className="pillar" key={p.title}>
              <span className="pillar__n">0{i + 1}</span>
              <h3>{p.title}</h3>
              <p>{p.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Forum() {
  return (
    <section className="section section--grey" id="forum">
      <div className="container">
        <div className="forum__intro">
          <SectionHead eyebrow="European Forum Alpbach" title={forum.title} />
          <div>
            {forum.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
            <a className="link-arrow" href={links.efa} target="_blank" rel="noreferrer">
              alpbach.org
            </a>
          </div>
        </div>
        <div className="cards">
          {forum.program.map((c) => (
            <article className="card" key={c.title}>
              <div className="card__media">
                <img
                  src={c.image}
                  alt=""
                  loading="lazy"
                  className={c.zoom ? 'zoom' : undefined}
                  style={c.position ? { objectPosition: c.position } : undefined}
                />
                <Callout label={c.label} className="card__callout" />
              </div>
              <div className="card__body">
                <h3>{c.title}</h3>
                <p>{c.text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function Identity() {
  return (
    <section className="section identity" id="identity">
      <div className="container identity__grid">
        <div>
          <SectionHead eyebrow="Inspiration for the brand identity" title={identity.title} />
          {identity.text.map((p) => (
            <p key={p}>{p}</p>
          ))}
          <div className="values">
            {identity.values.map((v) => (
              <div className="value" key={v.title}>
                <span className="value__dot" />
                <div>
                  <h3>{v.title}</h3>
                  <p>{v.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <figure className="identity__map">
          <img
            src="brand/tigris-euphrates-map.png"
            alt="Map of Iraq with the Tigris and Euphrates rivers highlighted"
            loading="lazy"
          />
        </figure>
      </div>
    </section>
  )
}

function Scholarship() {
  return (
    <section className="section section--blue" id="scholarship">
      <div className="container">
        <SectionHead eyebrow="Scholarship" title={scholarship.title}>
          <p className="section-head__lead">{scholarship.lead}</p>
        </SectionHead>
        <ol className="steps">
          {scholarship.steps.map((s) => (
            <li className="step" key={s.n}>
              <span className="step__n">{s.n}</span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </li>
          ))}
        </ol>
        <div className="scholarship__ctas">
          <a className="btn btn--white" href={links.scholarships} target="_blank" rel="noreferrer">
            Scholarships on alpbach.org
          </a>
          <a className="btn btn--outline-white" href={`mailto:${links.email}`}>
            Ask us a question
          </a>
        </div>
      </div>
    </section>
  )
}

function Voices() {
  if (!testimonials.length) return null
  return (
    <section className="section">
      <div className="container">
        <SectionHead eyebrow="Voices" title="From our scholarship holders" center />
        <div className="quotes">
          {testimonials.map((t) => (
            <figure className="quote" key={t.name}>
              <blockquote>{t.quote}</blockquote>
              <figcaption>
                <strong>{t.name}</strong>
                <span>{t.meta}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}

function initials(name) {
  return name
    .split(' ')
    .filter(Boolean)
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
}

function Team() {
  return (
    <section className="section" id="team">
      <div className="container">
        <SectionHead eyebrow="Board" title="The people behind CAI" />
        <ul className="team">
          {team.map((m) => (
            <li className="member" key={m.name}>
              <span className="member__avatar" aria-hidden="true">
                {initials(m.name)}
              </span>
              <div>
                <h3>{m.name}</h3>
                <p>{m.role}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

function Contact() {
  const socials = [
    ['Instagram', links.instagram, '@clubalpbachiraq'],
    ['LinkedIn', links.linkedin, 'Club Alpbach Iraq'],
    ['Facebook', links.facebook, 'ClubAlpbachIraq'],
    ['X / Twitter', links.twitter, '@ClubAlpbachIraq'],
  ]
  return (
    <section className="section section--grey" id="contact">
      <div className="container contact">
        <div>
          <SectionHead eyebrow="Contact" title="Interested in Forum Alpbach?">
            <p className="section-head__lead">
              Want to apply, partner with us or join an event? Write to us or follow our channels for news,
              calls and stories from Alpbach.
            </p>
          </SectionHead>
          <a className="contact__mail" href={`mailto:${links.email}`}>
            {links.email}
          </a>
        </div>
        <ul className="socials">
          {socials.map(([label, href, handle]) => (
            <li key={label}>
              <a href={href} target="_blank" rel="noreferrer">
                <span>{label}</span>
                <span className="socials__handle">{handle}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <Wordmark light />
          <p>Forum Alpbach Network</p>
        </div>
        <nav className="footer__nav" aria-label="Footer">
          {nav.map((n) => (
            <a key={n.id} href={`#${n.id}`}>
              {n.label}
            </a>
          ))}
        </nav>
        <div className="footer__meta">
          <a href={links.efaClubPage} target="_blank" rel="noreferrer">
            alpbach.org/club-alpbach-iraq
          </a>
          <a href={`mailto:${links.email}`}>{links.email}</a>
        </div>
      </div>
      <div className="container footer__bottom">
        <span>© {new Date().getFullYear()} Club Alpbach Iraq</span>
        <span>A member of the Forum Alpbach Network</span>
      </div>
    </footer>
  )
}

export default function App() {
  return (
    <>
      <a className="skip" href="#about">
        Skip to content
      </a>
      <Header />
      <main>
        <Hero />
        <About />
        <Forum />
        <Identity />
        <Scholarship />
        <Voices />
        <Team />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
