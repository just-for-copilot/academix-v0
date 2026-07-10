'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/client' // or your client-side supabase helper

export default function UserName() {
  const [name, setName] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function getUser() {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      
      // Fallback to email if display name isn't set
      setName(user?.user_metadata?.full_name || user?.email || 'User')
      setLoading(false)
    }
    getUser()
  }, [])

  // Show a subtle loading skeleton or nothing while fetching so it doesn't jump
  if (loading) return <span className="opacity-0">Loading...</span>

  // The animation now triggers seamlessly ONLY when the name is ready
  return (
    <span className="inline-block animate-in fade-in slide-in-from-bottom-3 duration-700 ease-out fill-mode-both">
      {name}
    </span>
  )
}