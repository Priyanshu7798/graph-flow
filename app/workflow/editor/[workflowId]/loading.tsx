export const dynamic = "force-dynamic"; // ⬅️ Add this
import { Loader2Icon } from 'lucide-react'
import React from 'react'

function loading() {
  return (
    <div className='flex items-center justify-center h-screen w-full'>
      <Loader2Icon size={30} className='animate-spin stroke-primary' />
    </div>
  )
}

export default loading