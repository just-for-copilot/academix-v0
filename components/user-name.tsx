'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/client' // Your browser client helper

export default function UserWidget() {
    const supabase = createClient()
    const [userName, setUserName] = useState<string | null>(null)

    useEffect(() => {
        async function fetchUser() {
            const { data: { user } } = await supabase.auth.getUser()
            if (user) {
                // Handle names from standard metadata or OAuth providers
                const name = user.user_metadata?.full_name || user.user_metadata?.name
                setUserName(name)
            }
        }
        fetchUser()
    }, [])

    return userName
}
