"use client"
export const dynamic = "force-dynamic"; // ⬅️ Add this

import { updateWorkflow } from '@/actions/workflows/updateWorkflow'
import { Button } from '@/components/ui/button'
import { useMutation } from '@tanstack/react-query'
import { useReactFlow } from '@xyflow/react'
import { CheckIcon } from 'lucide-react'
import React from 'react'
import { toast } from 'sonner'

function SaveBtn({workflowId}: {workflowId: string}) {

  const {toObject} = useReactFlow();
  const saveMutation = useMutation({
    mutationFn: updateWorkflow,
    onSuccess: ()=>{
      toast.success("Workflow saved successfully", {id : 'save-workflow'})
    },
    onError:()=>{
      toast.error("Failed to save workflow", {id : 'save-workflow'})
    },
  })

  return (
    <Button
      variant={"outline"}
      className='flex items-center gap-2'
      onClick={()=>{
        const workflowDef = JSON.stringify(toObject());
        toast.loading("Saving workflow...", {id : 'save-workflow'});
        saveMutation.mutate({
          id: workflowId,
          definition: workflowDef
        })
      }}
    >
      <CheckIcon size={16} className='stroke-green-400' />
      Save
    </Button>
  )
}

export default SaveBtn