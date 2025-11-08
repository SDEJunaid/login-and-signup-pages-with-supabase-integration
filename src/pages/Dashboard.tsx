import React from 'react'
import { supabase } from '../lib/supabaseClient'
import { LogOut, User } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function Dashboard() {
  const navigate = useNavigate()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate('/login')
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="bg-white rounded-2xl shadow-xl p-10 flex flex-col items-center">
        <User className="w-12 h-12 text-indigo-700 mb-4" />
        <h1 className="text-2xl font-bold mb-2 text-gray-800">Welcome!</h1>
        <p className="text-gray-600 mb-6">You are logged in with Supabase Auth.</p>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-lg transition"
        >
          <LogOut className="w-5 h-5" />
          Log Out
        </button>
      </div>
    </div>
  )
}
