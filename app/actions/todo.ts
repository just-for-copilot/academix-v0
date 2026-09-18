'use server'

import { createClient } from '@/lib/server'
import { revalidatePath } from 'next/cache'

export async function getTodos() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return []

  const { data, error } = await supabase
    .from('todos')
    .select('*')
    .order('created_at', { ascending: true })

  if (error) {
    console.error('Error fetching todos:', error)
    return []
  }
  return data
}

export async function addTodo(formData: FormData): Promise<{ error: string | null }> {
  const task = formData.get('task') as string
  if (!task) return { error: null }

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Not authenticated' }

  const { error } = await supabase
    .from('todos')
    .insert([{ task, is_completed: false, user_id: user.id }])

  if (error) {
    console.error('Error adding todo:', error)
    return { error: error.message }
  }
  revalidatePath('/')
  return { error: null }
}

export async function toggleTodo(id: string, is_completed: boolean): Promise<{ error: string | null }> {
  const supabase = await createClient()
  const { error } = await supabase
    .from('todos')
    .update({ is_completed })
    .eq('id', id)

  if (error) {
    console.error('Error toggling todo:', error)
    return { error: error.message }
  }
  revalidatePath('/')
  return { error: null }
}

export async function deleteTodo(id: string): Promise<{ error: string | null }> {
  const supabase = await createClient()
  const { error } = await supabase
    .from('todos')
    .delete()
    .eq('id', id)

  if (error) {
    console.error('Error deleting todo:', error)
    return { error: error.message }
  }
  revalidatePath('/')
  return { error: null }
}
