"use client"
export const dynamic = "force-dynamic"; // ⬅️ Add this

import React from 'react'

function NodeOutputs({children}: {children : React.ReactNode}) {
  return (
    <div className='flex flex-col divide-y gap-1 '>
      {children}
    </div>
  )
}

export default NodeOutputs