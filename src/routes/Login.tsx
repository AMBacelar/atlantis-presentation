import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { login } from '../lib/api'

export default function Login() {
  const navigate = useNavigate()
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setBusy(true)
    setError(null)
    const ok = await login(password)
    setBusy(false)
    if (ok) navigate('/present', { replace: true })
    else setError('Wrong password')
  }

  return (
    <main className="login">
      <form onSubmit={onSubmit} className="login-form">
        <h1>Presenter</h1>
        <input
          type="password"
          autoFocus
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button type="submit" disabled={busy || !password}>
          {busy ? '…' : 'Enter'}
        </button>
        {error && <p className="login-error">{error}</p>}
      </form>
    </main>
  )
}
