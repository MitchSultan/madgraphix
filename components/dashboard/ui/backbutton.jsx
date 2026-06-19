'use client'
import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/dashboard/ui/button'

export function BackButton({ fallback = '/', label = 'Back' }) {
  const router = useRouter()

  const handleBack = () => {
    // history.length > 1 means there's a previous page to return to
    if (typeof window !== 'undefined' && window.history.length > 1) {
      router.back()
    } else {
      router.push(fallback)   // safe fallback for direct/email links
    }
  }

  return (
    <Button variant="ghost" size="sm" onClick={handleBack}
      className="gap-2 text-muted-foreground hover:text-foreground -ml-2">
      <ArrowLeft className="h-4 w-4" />
      {label}
    </Button>
  )
}