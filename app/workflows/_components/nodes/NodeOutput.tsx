"use client"
export const dynamic = "force-dynamic"; // ⬅️ Add this

import { TaskParam } from '@/types/task'
import React from 'react'

function NodeOutput({output,nodeId}: {output: TaskParam, nodeId:string}) {
  return (
    <div>
      {output.name}
    </div>
  )
}

export default NodeOutput