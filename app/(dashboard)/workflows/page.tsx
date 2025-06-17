export const dynamic = "force-dynamic"; // ⬅️ Add this

import UserWorkflows from '@/components/UserWorkflows'
import UserWorkflowsSkeleton from '@/components/UserWorkflowsSkeleton'
import React, { Suspense } from 'react'
import CreateWorkflowDialog from './_components/CreateWorkflowDialog'

function WorkflowPage() {
  return (
    <div className='flex flex-1 flex-col h-full'>
      <div className='flex justify-between'>
        <div className='flex flex-col'>
          <h1 className='text-3xl font-bold'>Workflows</h1>
          <p className='text-muted-foreground'>Manage Your Workflows</p>
        </div>
        <CreateWorkflowDialog />
      </div>
      <div className='h-full py-6'>
        <Suspense fallback={<UserWorkflowsSkeleton />}>
          <UserWorkflows />
        </Suspense>
      </div>
      <CreateWorkflowDialog triggerText='Create your first Workflow' />
    </div>
  )
}
export default WorkflowPage