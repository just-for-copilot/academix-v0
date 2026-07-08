'use client'

import { useState } from 'react'
import { addTodo, toggleTodo, deleteTodo } from '@/app/actions/todo'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Trash2 } from 'lucide-react'

type Todo = {
  id: string
  task: string
  is_completed: boolean
}

export default function TodoList({ initialTodos }: { initialTodos: Todo[] }) {
  const [isPending, setIsPending] = useState(false)

  async function handleAddTodo(formData: FormData) {
    setIsPending(true)
    await addTodo(formData)
    setIsPending(false)
  }

  async function handleToggle(id: string, is_completed: boolean) {
    setIsPending(true)
    await toggleTodo(id, is_completed)
    setIsPending(false)
  }

  async function handleDelete(id: string) {
    setIsPending(true)
    await deleteTodo(id)
    setIsPending(false)
  }

  return (
    <div className="space-y-4">
      <form action={handleAddTodo} className="flex gap-2">
        <Input 
          name="task" 
          placeholder="Add a new task..." 
          disabled={isPending}
          required
        />
        <Button type="submit" disabled={isPending}>Add</Button>
      </form>

      {initialTodos.length === 0 ? (
        <p className='text-sm text-muted-foreground'>You have no upcoming events, enjoy your week!</p>
      ) : (
        <ul className="space-y-2">
          {initialTodos.map((todo) => (
            <li key={todo.id} className="flex items-center justify-between gap-2 p-2 rounded border bg-card">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={todo.is_completed}
                  onChange={(e) => handleToggle(todo.id, e.target.checked)}
                  disabled={isPending}
                  className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
                />
                <span className={`text-sm ${todo.is_completed ? 'line-through text-muted-foreground' : ''}`}>
                  {todo.task}
                </span>
              </div>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => handleDelete(todo.id)}
                disabled={isPending}
                className="h-8 w-8 text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
