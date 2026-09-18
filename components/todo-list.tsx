'use client'

import { useOptimistic, useRef, useTransition } from 'react'
import { addTodo, toggleTodo, deleteTodo } from '@/app/actions/todo'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Trash2 } from 'lucide-react'
import { Checkbox } from './ui/checkbox'
import { toast } from 'sonner'

type Todo = {
  id: string
  task: string
  is_completed: boolean
}

type OptimisticAction =
  | { type: 'add'; todo: Todo }
  | { type: 'toggle'; id: string; is_completed: boolean }
  | { type: 'delete'; id: string }

function todosReducer(state: Todo[], action: OptimisticAction): Todo[] {
  switch (action.type) {
    case 'add':
      return [...state, action.todo]
    case 'toggle':
      return state.map((t) =>
        t.id === action.id ? { ...t, is_completed: action.is_completed } : t
      )
    case 'delete':
      return state.filter((t) => t.id !== action.id)
  }
}

export default function TodoList({ initialTodos }: { initialTodos: Todo[] }) {
  const [optimisticTodos, applyOptimistic] = useOptimistic(initialTodos, todosReducer)
  const [isPending, startTransition] = useTransition()
  const formRef = useRef<HTMLFormElement>(null)

  async function handleAddTodo(formData: FormData) {
    const task = formData.get('task') as string
    if (!task?.trim()) return

    const tempId = `temp-${Date.now()}`
    const tempTodo: Todo = { id: tempId, task, is_completed: false }

    startTransition(async () => {
      applyOptimistic({ type: 'add', todo: tempTodo })
      formRef.current?.reset()
      const { error } = await addTodo(formData)
      if (error) {
        toast.error('Failed to add task', { description: error })
      }
    })
  }

  async function handleToggle(id: string, is_completed: boolean) {
    startTransition(async () => {
      applyOptimistic({ type: 'toggle', id, is_completed })
      const { error } = await toggleTodo(id, is_completed)
      if (error) {
        // revert is automatic — optimistic state reverts when transition settles
        toast.error('Failed to update task', { description: error })
      }
    })
  }

  async function handleDelete(id: string) {
    startTransition(async () => {
      applyOptimistic({ type: 'delete', id })
      const { error } = await deleteTodo(id)
      if (error) {
        toast.error('Failed to delete task', { description: error })
      }
    })
  }

  return (
    <div className="space-y-4">
      <form ref={formRef} action={handleAddTodo} className="flex gap-2">
        <Input
          name="task"
          placeholder="Add a new task..."
          disabled={isPending}
          autoComplete='off'
          required
        />
        <Button type="submit" disabled={isPending}>Add</Button>
      </form>

      {optimisticTodos.length === 0 ? (
        <p className='text-sm text-muted-foreground'>You have no upcoming events, enjoy your week!</p>
      ) : (
        <ul className="space-y-2">
          {optimisticTodos.map((todo) => (
            <li key={todo.id} className="flex items-center justify-between gap-2 p-2 rounded border bg-card">
              <div className="flex items-center gap-2">
                <Checkbox
                  checked={todo.is_completed}
                  onCheckedChange={() => handleToggle(todo.id, !todo.is_completed)}
                  disabled={isPending}
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
