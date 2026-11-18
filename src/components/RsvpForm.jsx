import { useState } from 'react'
import { links } from '../content.js'

const EMPTY = { name: '', attending: '', guests: '', year: '', suggestion: '', website: '' }

// 'upcoming' (RSVP open) | 'closed' (RSVP deadline passed) | 'past' (event over)
export function eventStatus(event, now = new Date()) {
  if (now > new Date(event.endsAt)) return 'past'
  if (now > new Date(event.rsvpClosesAt)) return 'closed'
  return 'upcoming'
}

function validate(f) {
  const errors = {}
  if (!f.name.trim()) errors.name = 'Please enter your full name.'
  if (!f.attending) errors.attending = 'Please choose an answer.'
  if (!f.guests) errors.guests = 'Please choose an answer.'
  const year = Number(f.year)
  if (!/^\d{4}$/.test(f.year.trim()) || year < 1945 || year > new Date().getFullYear()) {
    errors.year = 'Please enter a year, for example 2024.'
  }
  return errors
}

function Choice({ name, label, options, value, onChange, error }) {
  return (
    <fieldset className={`field ${error ? 'field--error' : ''}`} aria-describedby={error ? `${name}-error` : undefined}>
      <legend>
        {label} <span className="req" aria-hidden="true">*</span>
      </legend>
      <div className="choices">
        {options.map((opt) => (
          <label key={opt} className={`choice ${value === opt ? 'choice--on' : ''}`}>
            <input type="radio" name={name} value={opt} checked={value === opt} onChange={onChange} required />
            <span>{opt}</span>
          </label>
        ))}
      </div>
      {error && (
        <p className="field__error" id={`${name}-error`}>
          {error}
        </p>
      )}
    </fieldset>
  )
}

export default function RsvpForm({ event }) {
  const [form, setForm] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | done | error
  const [message, setMessage] = useState('')
  const { rsvp } = event

  const set = (e) => {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
    if (errors[name]) setErrors((er) => ({ ...er, [name]: undefined }))
  }

  const submit = async (e) => {
    e.preventDefault()
    const found = validate(form)
    setErrors(found)
    if (Object.keys(found).length) {
      document.querySelector(`[name="${Object.keys(found)[0]}"]`)?.focus()
      return
    }
    if (!rsvp.endpoint) {
      setStatus('error')
      setMessage(`The RSVP form isn’t connected yet. Please email ${links.email} instead.`)
      return
    }
    setStatus('sending')
    try {
      // text/plain keeps this a "simple" request, which Apps Script web apps accept without a CORS preflight.
      const res = await fetch(rsvp.endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({ ...form, year: form.year.trim(), name: form.name.trim() }),
      })
      const data = await res.json()
      if (!data.ok) throw new Error(data.error || 'Something went wrong.')
      setStatus('done')
    } catch (err) {
      setStatus('error')
      setMessage(
        err instanceof Error && err.message && !/fetch|network|JSON/i.test(err.message)
          ? err.message
          : `We couldn’t send your RSVP. Please try again, or email ${links.email}.`,
      )
    }
  }

  if (status === 'done') {
    return (
      <div className="rsvp__done" role="status">
        <span className="rsvp__check" aria-hidden="true" />
        <h3>Thank you, {form.name.split(' ')[0]}!</h3>
        <p>
          {form.attending.startsWith('No')
            ? 'We’re sorry you can’t make it. Thanks for letting us know.'
            : `Your reply is in. See you on ${event.date} at ${event.place}.`}
        </p>
        <button
          type="button"
          className="btn btn--ghost"
          onClick={() => {
            setForm(EMPTY)
            setStatus('idle')
          }}
        >
          Send another reply
        </button>
      </div>
    )
  }

  return (
    <form className="form" onSubmit={submit} noValidate>
      <div className="form__head">
        <h3>RSVP</h3>
        <p>Reply by {event.replyBy}.</p>
      </div>

      <div className={`field ${errors.name ? 'field--error' : ''}`}>
        <label htmlFor="rsvp-name">
          Full name <span className="req" aria-hidden="true">*</span>
        </label>
        <input
          id="rsvp-name"
          name="name"
          autoComplete="name"
          value={form.name}
          onChange={set}
          required
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? 'name-error' : undefined}
        />
        {errors.name && (
          <p className="field__error" id="name-error">
            {errors.name}
          </p>
        )}
      </div>

      <Choice
        name="attending"
        label="Will you join us?"
        options={rsvp.attending}
        value={form.attending}
        onChange={set}
        error={errors.attending}
      />

      <Choice
        name="guests"
        label="Are you bringing a guest?"
        options={rsvp.guests}
        value={form.guests}
        onChange={set}
        error={errors.guests}
      />

      <div className={`field ${errors.year ? 'field--error' : ''}`}>
        <label htmlFor="rsvp-year">
          Which year did you attend the European Forum Alpbach? <span className="req" aria-hidden="true">*</span>
        </label>
        <input
          id="rsvp-year"
          name="year"
          inputMode="numeric"
          maxLength={4}
          placeholder="e.g. 2024"
          value={form.year}
          onChange={set}
          required
          className="input--short"
          aria-invalid={!!errors.year}
          aria-describedby={errors.year ? 'year-error' : undefined}
        />
        {errors.year && (
          <p className="field__error" id="year-error">
            {errors.year}
          </p>
        )}
      </div>

      <div className="field">
        <label htmlFor="rsvp-suggestion">
          Would you like to share or suggest something, or lead an activity during the afternoon?
        </label>
        <textarea id="rsvp-suggestion" name="suggestion" rows={4} maxLength={2000} value={form.suggestion} onChange={set} />
      </div>

      {/* Honeypot: hidden from people, often filled in by spam bots. */}
      <div className="hp" aria-hidden="true">
        <label>
          Website
          <input name="website" tabIndex={-1} autoComplete="off" value={form.website} onChange={set} />
        </label>
      </div>

      {status === 'error' && (
        <p className="form__error" role="alert">
          {message}
        </p>
      )}

      <div className="form__footer">
        <button className="btn" type="submit" disabled={status === 'sending'}>
          {status === 'sending' ? 'Sending…' : 'Send RSVP'}
        </button>
        <span className="form__note">
          <span className="req">*</span> Required
        </span>
      </div>
    </form>
  )
}
