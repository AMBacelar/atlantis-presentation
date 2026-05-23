import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { joinAsPlayer, whoami } from '../lib/api'

export default function Join() {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // If they've already joined this session, skip straight to play.
    whoami().then(({ player }) => {
      if (player) {
        setName(player.name)
      }
    })
  }, [])

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    const trimmed = name.trim()
    if (!trimmed) return
    setBusy(true)
    setError(null)
    try {
      await joinAsPlayer(trimmed)
      navigate('/play', { replace: true })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'failed to join')
    } finally {
      setBusy(false)
    }
  }

  return (
    <main className="join">
      <form className="join-form" onSubmit={onSubmit}>
        <h1>Join the game</h1>
        <p className="join-sub">Pick a name. Everyone will see it on the big screen.</p>
        <input
          autoFocus
          value={name}
          maxLength={24}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
        />
        <button type="submit" disabled={busy || !name.trim()}>
          {busy ? '…' : 'Join'}
        </button>
        {error && <p className="join-error">{error}</p>}
      </form>
    </main>
  )
}
