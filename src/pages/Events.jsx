import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { events, links } from '../content.js'
import RsvpForm, { eventStatus } from '../components/RsvpForm.jsx'

const STATUS_LABEL = { upcoming: 'Upcoming', closed: 'Upcoming · RSVP closed', past: 'Past event' }

function usePageTitle(title) {
  useEffect(() => {
    document.title = `${title} · Club Alpbach Iraq`
    return () => {
      document.title = 'Club Alpbach Iraq'
    }
  }, [title])
}

function EventFacts({ event }) {
  return (
    <dl className="event-facts">
      <div>
        <dt>Date</dt>
        <dd>{event.date}</dd>
      </div>
      <div>
        <dt>Time</dt>
        <dd>{event.time}</dd>
      </div>
      <div>
        <dt>Place</dt>
        <dd>{event.place}</dd>
      </div>
    </dl>
  )
}

function PageHead({ eyebrow, title, children }) {
  return (
    <section className="page-head">
      <div className="container">
        {eyebrow}
        <h1>{title}</h1>
        {children}
      </div>
    </section>
  )
}

export function EventsPage() {
  usePageTitle('Events')
  const withStatus = events.map((e) => ({ ...e, status: eventStatus(e) }))
  const upcoming = withStatus.filter((e) => e.status !== 'past')
  const past = withStatus.filter((e) => e.status === 'past')

  const list = (items) => (
    <ul className="event-list">
      {items.map((e) => (
        <li key={e.id}>
          <Link to={`/events/${e.id}`} className={`event-card ${e.status === 'past' ? 'event-card--past' : ''}`}>
            <div className="event-card__media">
              <img src={e.image} alt="" loading="lazy" />
            </div>
            <div className="event-card__body">
              <span className={`event-tag event-tag--${e.status}`}>{STATUS_LABEL[e.status]}</span>
              <h2>{e.title}</h2>
              <p>{e.summary}</p>
              <EventFacts event={e} />
              <span className="link-arrow event-card__cta">
                {e.status === 'upcoming' ? 'View event and RSVP' : 'View event'}
              </span>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  )

  return (
    <>
      <PageHead eyebrow={<p className="eyebrow">Club Alpbach Iraq</p>} title="Events">
        <p className="page-head__lead">Gatherings, talks and meetups for the CAI community.</p>
      </PageHead>
      <section className="section section--tight">
        <div className="container">
          {upcoming.length ? (
            list(upcoming)
          ) : (
            <p className="empty">
              No upcoming events right now. Follow{' '}
              <a href={links.instagram} target="_blank" rel="noreferrer">
                @clubalpbachiraq
              </a>{' '}
              to hear about the next one.
            </p>
          )}
          {past.length > 0 && (
            <>
              <h2 className="list-title">Past events</h2>
              {list(past)}
            </>
          )}
        </div>
      </section>
    </>
  )
}

export function EventPage() {
  const { id } = useParams()
  const event = events.find((e) => e.id === id)
  usePageTitle(event ? event.title : 'Event not found')

  if (!event) {
    return (
      <PageHead title="Event not found">
        <p className="page-head__lead">
          This event doesn’t exist or has been removed. <Link to="/events">See all events</Link>.
        </p>
      </PageHead>
    )
  }

  const status = eventStatus(event)

  return (
    <>
      <PageHead
        eyebrow={
          <Link to="/events" className="back-link">
            All events
          </Link>
        }
        title={event.title}
      >
        <span className={`event-tag event-tag--${status}`}>{STATUS_LABEL[status]}</span>
      </PageHead>
      <section className="section section--tight event-detail">
        <div className="container event-detail__grid">
          <div className="event-detail__info">
            <img className="event-detail__img" src={event.image} alt="" />
            <EventFacts event={event} />
            <p>{event.intro}</p>
          </div>
          <div className="rsvp__card" id="rsvp">
            {status === 'upcoming' ? (
              <RsvpForm event={event} />
            ) : (
              <div className="rsvp__done" role="status">
                <h3>{status === 'past' ? 'This event has taken place' : 'RSVPs are closed'}</h3>
                <p>
                  {status === 'past' ? (
                    <>Thank you to everyone who joined us. </>
                  ) : (
                    <>The reply deadline has passed. If you still want to come, email us at </>
                  )}
                  {status === 'closed' && <a href={`mailto:${links.email}`}>{links.email}</a>}
                  {status === 'closed' && '.'}
                </p>
                <Link className="btn btn--ghost" to="/events">
                  All events
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
