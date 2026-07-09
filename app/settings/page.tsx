import { redirect } from 'next/navigation'
import { AppSidebar } from '@/components/app-sidebar'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { createClient } from '@/lib/server'
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card'
import localFont from 'next/font/local'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Bell, Lock, User, Save } from 'lucide-react'

const anthropicSerif = localFont({
  src: '../../public/AnthropicSerif-Display-Light-Static.otf',
})

export default async function SettingsPage() {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getClaims()
  if (error || !data?.claims) {
    redirect('/auth/login')
  }

  return (
    <div className='w-screen h-screen'>
      <SidebarProvider defaultOpen={false}>
        <AppSidebar />
        <SidebarTrigger className='absolute top-4 left-4 z-50 md:hidden' />
        <div className='flex flex-col min-w-[calc(100vw-50px)] min-h-max p-10 gap-10 overflow-auto'>
          <h1 className={`text-4xl ${anthropicSerif.className}`}>Settings</h1>

          <div className="grid gap-10 w-full"> {/* Fit this to screen */}
            {/* Profile Settings */}
            <Card>
              <CardHeader className="flex flex-row items-center gap-2">
                <User className="h-6 w-6" />
                <h1 className={`text-2xl ${anthropicSerif.className}`}>Profile Settings</h1>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" placeholder="John Doe" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" placeholder="user@example.com" disabled />
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button>
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
              </CardFooter>
            </Card>

            {/* Notification Settings */}
            <Card>
              <CardHeader className="flex flex-row items-center gap-2">
                <Bell className="h-6 w-6" />
                <h1 className={`text-2xl ${anthropicSerif.className}`}>Notifications</h1>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox id="email_notifications" />
                  <Label htmlFor="email_notifications">Receive weekly reports via email</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="push_notifications" />
                  <Label htmlFor="push_notifications">Receive push notifications</Label>
                </div>
              </CardContent>
            </Card>

            {/* Security */}
            <Card>
              <CardHeader className="flex flex-row items-center gap-2">
                <Lock className="h-6 w-6" />
                <h1 className={`text-2xl ${anthropicSerif.className}`}>Security</h1>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="current_password">Current Password</Label>
                  <Input id="current_password" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new_password">New Password</Label>
                  <Input id="new_password" type="password" />
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button>
                  Update Password
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </SidebarProvider>
    </div>
  )
}
