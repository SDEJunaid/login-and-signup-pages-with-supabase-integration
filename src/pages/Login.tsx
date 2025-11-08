import React, { useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import { LogIn, Mail, Lock, Loader2 } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    setLoading(false)
    if (error) {
      setError(error.message)
    } else {
      navigate('/dashboard')
    }
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="hidden md:flex flex-1 items-center justify-center bg-gradient-to-br from-blue-600 to-indigo-800">
        <img
          src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80"
          alt="Login Visual"
          className="rounded-3xl shadow-2xl w-4/5 h-4/5 object-cover"
        />
      </div>
      <div className="flex-1 flex items-center justify-center bg-white">
        <form
          onSubmit={handleLogin}
          className="w-full max-w-md p-8 rounded-2xl shadow-xl bg-white"
        >
          <div className="flex items-center gap-2 mb-8">
            <LogIn className="w-8 h-8 text-blue-700" />
            <h1 className="text-3xl font-bold text-gray-800">Sign In</h1>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-1" htmlFor="email">
              Email
            </label>
            <div className="flex items-center border rounded-lg px-3 py-2 bg-gray-50">
              <Mail className="w-5 h-5 text-gray-400 mr-2" />
              <input
                id="email"
                type="email"
                className="w-full bg-transparent outline-none"
                placeholder="you@email.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                autoFocus
              />
            </div>
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-1" htmlFor="password">
              Password
            </label>
            <div className="flex items-center border rounded-lg px-3 py-2 bg-gray-50">
              <Lock className="w-5 h-5 text-gray-400 mr-2" />
              <input
                id="password"
                type="password"
                className="w-full bg-transparent outline-none"
                placeholder="Your password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
            </div>
          </div>
          {error && (
            <div className="mb-4 text-red-600 text-sm font-medium">{error}</div>
          )}
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-blue-700 hover:bg-blue-800 text-white font-bold py-2.5 rounded-lg transition"
            disabled={loading}
          >
            {loading ? <Loader2 className="animate-spin w-5 h-5" /> : <LogIn className="w-5 h-5" />}
            Sign In
          </button>
          <div className="mt-6 text-center text-gray-600">
            Don&apos;t have an account?{' '}
            <Link to="/signup" className="text-blue-700 font-semibold hover:underline">
              Sign Up
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}
