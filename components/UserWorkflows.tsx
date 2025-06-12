
import { waitFor } from '@/lib/helper/waitFor'
import React from 'react'
import { Alert, AlertDescription } from './ui/alert';
import { AlertCircle, InboxIcon } from 'lucide-react';
import { GetWorkflowsForUser } from '@/actions/workflows/getWorkflowsForUser';

async function UserWorkflows() {

  const workflows = await GetWorkflowsForUser()
  if(!workflows){
    return (
      <Alert variant ="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>Something went wrong</AlertDescription>
      </Alert>
    )
  }

  if(workflows.length===0){
    return (
      <div className='flex flex-col gap-4 h-full items-center justify-center'>
        <div className='w-20 h-20 flex items-center justify-center rounded-full bg-accent'>
          <InboxIcon size={40} className='stroke-primary' />
        </div>
        <div className='flex flex-col items-center gap-1'>
          <p className='font-bold'>No workflows created yet</p>
          <p className='text-sm text-muted-foreground'>
            Click the button below to create your first workflow
          </p>
        </div>
      </div>
    )
  }

  return ( 
    <div></div>
  )
}

export default UserWorkflows