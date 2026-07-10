import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { AppSidebar } from '@/components/app-sidebar'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { createClient } from '@/lib/server'
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card'
import localFont from 'next/font/local'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { SubmitButton } from '@/components/ui/submit-button' // Import your new button
import { Bell, Lock, User, Save } from 'lucide-react'

const anthropicSerif = localFont({
  src: '../../public/AnthropicSerif-Display-Light-Static.otf',
})

export default async function SettingsPage() {
  const supabase = await createClient()

  const { data: { user }, error } = await supabase.auth.getUser()
  if (error || !user) {
    redirect('/auth/login')
  }

  // --- SERVER ACTIONS ---
  async function updateProfile(formData: FormData) {
    'use server'
    const supabase = await createClient()
    const name = formData.get('name') as string
    
    await supabase.auth.updateUser({ data: { full_name: name } })
    revalidatePath('/settings')
  }

  async function updateNotifications(formData: FormData) {
    'use server'
    const supabase = await createClient()
    const emailNotif = formData.get('email_notifications') === 'on'
    const pushNotif = formData.get('push_notifications') === 'on'
    
    await supabase.auth.updateUser({
      data: { email_notifications: emailNotif, push_notifications: pushNotif }
    })
    revalidatePath('/settings')
  }

  async function updatePassword(formData: FormData) {
    'use server'
    const supabase = await createClient()
    const newPassword = formData.get('new_password') as string
    
    if (newPassword) {
      await supabase.auth.updateUser({ password: newPassword })
    }
    revalidatePath('/settings')
  }

  return (
    <div className='w-screen h-screen'>
      <SidebarProvider defaultOpen={false}>
        <AppSidebar />
        <SidebarTrigger className='absolute top-4 left-4 z-50 md:hidden' />
        <div className='flex flex-col min-w-[calc(100vw-50px)] min-h-max p-10 gap-10 overflow-auto'>
          <h1 className={`text-4xl ${anthropicSerif.className}`}>Settings</h1>

          <div className="grid gap-10 w-full">
            
            {/* Profile Settings */}
            <form action={updateProfile}>
              <Card>
                <CardHeader className="flex flex-row items-center gap-2">
                  <User className="h-6 w-6" />
                  <h1 className={`text-2xl ${anthropicSerif.className}`}>Profile Settings</h1>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input 
                      id="name" 
                      name="name" 
                      defaultValue={user.user_metadata?.full_name || ''} 
                      placeholder="John Doe" 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" defaultValue={user.email} disabled />
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <SubmitButton>
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </SubmitButton>
                </CardFooter>
              </Card>
            </form>

            {/* Notification Settings */}
            <form action={updateNotifications}>
              <Card>
                <CardHeader className="flex flex-row items-center gap-2">
                  <Bell className="h-6 w-6" />
                  <h1 className={`text-2xl ${anthropicSerif.className}`}>Notifications</h1>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="email_notifications" 
                      name="email_notifications" 
                      defaultChecked={user.user_metadata?.email_notifications}
                    />
                    <Label htmlFor="email_notifications">Receive weekly reports via email</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="push_notifications" 
                      name="push_notifications"
                      defaultChecked={user.user_metadata?.push_notifications}
                    />
                    <Label htmlFor="push_notifications">Receive push notifications</Label>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <SubmitButton loadingText="Updating preferences...">
                    <Save className="mr-2 h-4 w-4" />
                    Save Preferences
                  </SubmitButton>
                </CardFooter>
              </Card>
            </form>

            {/* Security */}
            <form action={updatePassword}>
              <Card>
                <CardHeader className="flex flex-row items-center gap-2">
                  <Lock className="h-6 w-6" />
                  <h1 className={`text-2xl ${anthropicSerif.className}`}>Security</h1>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="new_password">New Password</Label>
                    <Input id="new_password" name="new_password" type="password" required minLength={6} />
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <SubmitButton loadingText="Changing password...">
                    Update Password
                  </SubmitButton>
                </CardFooter>
              </Card>
            </form>
            
          </div>
        </div>
      </SidebarProvider>
    </div>
  )
}