'use client'

import * as React from 'react'
import { useFormStatus } from 'react-dom'
import { Button, type ButtonProps } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'

interface SubmitButtonProps extends ButtonProps {
}

export function SubmitButton({ 
  children, 
  className, 
  ...props 
}: SubmitButtonProps) {
  const { pending } = useFormStatus()

  return (
    <Button 
      type="submit" 
      disabled={pending} 
      className={className}
      {...props}
    >
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        </>
      ) : (
        children
      )}
    </Button>
  )
}