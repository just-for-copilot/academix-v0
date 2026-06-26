import { redirect } from 'next/navigation'
import { AppSidebar } from '@/components/app-sidebar'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { createClient } from '@/lib/server'
import { Main } from 'next/document'

export default async function ProtectedPage() {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getClaims()
  if (error || !data?.claims) {
    redirect('/auth/login')
  }

  return (
    <SidebarProvider defaultOpen={false}>
      <AppSidebar />
    </SidebarProvider>
  )
}