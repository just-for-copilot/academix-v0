import { redirect } from 'next/navigation'
import { AppSidebar } from '@/components/app-sidebar'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { createClient } from '@/lib/server'
import { Main } from 'next/document'
import { Card, CardHeader, CardContent } from '@/components/ui/card'
import UserName from '@/components/user-name'
import localFont from 'next/font/local'
import TodoList from '@/components/todo-list'
import { getTodos } from '@/app/actions/todo'

const anthropicSerif = localFont({
  src: '../public/AnthropicSerif-Display-Light-Static.otf',
})

export default async function ProtectedPage() {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getClaims()
  if (error || !data?.claims) {
    redirect('/auth/login')
  }

  const todos = await getTodos()

  return (
    <div className='w-screen h-screen'>
      <SidebarProvider defaultOpen={false}>
        <AppSidebar />
        <SidebarTrigger className='absolute top-4 left-4 z-50 md:hidden' />
        <div className='flex flex-col min-w-[calc(100vw-50px)] min-h-max p-10 gap-10'>
          <h1 className={`text-4xl ${anthropicSerif.className}`}>Welcome Back, <UserName /></h1>
          <Card className=''>
            <CardHeader>
              <h1 className={`text-2xl ${anthropicSerif.className}`}>Weekly Report</h1>
            </CardHeader>
            <CardContent>
              <TodoList initialTodos={todos} />
            </CardContent>
          </Card>
        </div>
      </SidebarProvider>
    </div>
  )
}