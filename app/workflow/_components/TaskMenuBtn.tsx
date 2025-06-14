"use client"
export const dynamic = "force-dynamic"; // ⬅️ Add this

import { Button } from '@/components/ui/button'
import { TaskRegistry } from '@/lib/workflow/task/registry'
import { TaskType } from '@/types/task'
import React from 'react'

const TaskMenuBtn = ({taskType} : {taskType : TaskType}) => {

  const task = TaskRegistry[taskType];
  const ondragstart = (event : React.DragEvent<HTMLButtonElement>, type : TaskType) => {
    event.dataTransfer.setData("application/reactflow", type);
    event.dataTransfer.effectAllowed = "move";
  }

  return (
    <Button 
      className="flex justify-between items-center gap-2 border w-full"
      variant={"secondary"}
      draggable
      onDragStart={event =>ondragstart(event,taskType)}
    >
      <div className='flex items-center gap-2'>
        <task.icon size={20} />
        {task.label}
      </div>
    </Button>
  )
}

export default TaskMenuBtn