import { redirect } from 'next/navigation'
import { createClient } from '@/lib/server'
import { Button } from '@/components/ui/button'
import { Construction } from 'lucide-react'
import Link from 'next/link'

export default async function MobilePage() {
    const supabase = await createClient()

    const { data, error } = await supabase.auth.getClaims()
    if (error || !data?.claims) {
        redirect('/auth/login')
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-[100dvh] bg-background text-foreground p-6 text-center space-y-8 animate-in fade-in zoom-in-95 duration-500">
            <div className="space-y-3 max-w-md">
                <h1 className="text-3xl sm:text-4xl tracking-tight">Coming Soon</h1>
                <p className="text-muted-foreground text-base sm:text-lg">
                    We're currently crafting an amazing mobile experience for Academix. For now, please access the platform via a desktop device.
                </p>
            </div>
        </div>
    )
}