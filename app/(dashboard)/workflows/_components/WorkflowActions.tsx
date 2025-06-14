"use client"

export const dynamic = "force-dynamic"; // ⬅️ Add this

import React,{useState} from 'react'
import { DropdownMenu , DropdownMenuContent , DropdownMenuItem , DropdownMenuTrigger, DropdownMenuSeparator , DropdownMenuLabel } from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { MoreVerticalIcon, TrashIcon } from 'lucide-react'
import TooltipWrapper from '@/components/TooltipWrapper'
import DeleteWorkflowDialog from './DeleteWorkflowDialog'

function WorkflowActions({workflowName , workflowId}: {workflowName : string; workflowId : string}) {
  const[showDeleteDialog, setShowDeleteDialog] = useState(false)
  return (
    <>
      <DeleteWorkflowDialog open={showDeleteDialog} setOpen={setShowDeleteDialog} workflowName={workflowName} workflowId={workflowId} />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={'outline'} size={"sm"}>
            <TooltipWrapper content={"More actions"}>
              <div className='flex items-center justify-center w-full h-full '>
                <MoreVerticalIcon size={18} />  
              </div>
            </TooltipWrapper>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem className = "text-destructive flex items-center gap-2" onSelect={()=>{
            setShowDeleteDialog((prev)=>!prev)
          }}>
            <TrashIcon size={16} /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}

export default WorkflowActions