"use client"
export const dynamic = "force-dynamic"; // ⬅️ Add this

import { buttonVariants } from '@/components/ui/button'
import { Card,CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { WorkflowStatus } from '@/types/workflow'
import { Workflow } from '@prisma/client'
import { FileTextIcon, PlayIcon, ShuffleIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import WorkflowActions from './WorkflowActions'

function WorkflowCard({workflow} : {workflow : Workflow}) {
  const isDraft = workflow.status === WorkflowStatus.DRAFT;
  const statusColor = {
    [WorkflowStatus.DRAFT] : "bg-yellow-400 text-yellow-600",
    [WorkflowStatus.PUBLISHED] : "bg-primary",

  }
  return (
    <Card className='border border-separate shadow-sm rounded-lg overflow-hidden hover:shadow-md dark:shadow-primary/30' >
      <CardContent className='p-4 flex items-center justify-between h-[100px]'>
        <div className='flex items-center justify-end space-x-3'>
          <div className={cn("w-10 h-10 rounded-full flex items-center justify-center", statusColor[workflow.status as WorkflowStatus])}>
            {isDraft ? <FileTextIcon className='h-5 w-5'/> : <PlayIcon className='h-5 w-5 text-white' />}
          </div>
          <div className=''>
            <h3 className='text-base font-bold text-muted-foreground flex items-center'>
              <Link href={`/workflows/editor/${workflow.id}`} className='capitalize flex items-center hover:underline hover:text-green-500'>
                {workflow.name}
              </Link>
              {isDraft && (
                <span className='ml-3 px-3 py-1 text-xs font-medium bg-yellow-200 text-yellow-800 rounded-full'> DRAFT</span>
              )}
            </h3>
          </div>
        </div>

        <div className='flex items-center gap-2'>
            <Link href={`/workflows/editor/${workflow.id}`} className={cn(buttonVariants({
              variant: "outline",
              size : "sm",
            }),"flex items-center gap-2"
            )}
          >
            <ShuffleIcon size={16} />
            Edit
          </Link>
          <WorkflowActions workflowName={workflow.name} workflowId={workflow.id} />
        </div>
      </CardContent>
    </Card>
  )
}

export default WorkflowCard