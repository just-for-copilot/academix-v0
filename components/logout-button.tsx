'use client'

import { useRouter } from 'next/navigation'

import { createClient } from '@/lib/client'
import { Button } from '@/components/ui/button'
import { LucideLogOut } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip'

export function LogoutButton() {
  const router = useRouter()

  const logout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/auth/login')
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipContent side='right'>Log Out</TooltipContent>
        <TooltipTrigger>
          <Button onClick={logout}><LucideLogOut strokeWidth={3} /></Button>
        </TooltipTrigger>
      </Tooltip>
    </TooltipProvider>
  )
}
