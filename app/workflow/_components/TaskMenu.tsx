"use client"
export const dynamic = "force-dynamic"; // ⬅️ Add this

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { TaskType } from '@/types/task'
import React from 'react'
import TaskMenuBtn from './TaskMenuBtn'


function TaskMenu() {
  return (
    <aside className='w-[340px] min-w-[340px] border-r-2 border-separate h-full p-2 px-4 overflow-auto'>
      <Accordion type='multiple' className='w-full' defaultValue={['extraction']}>
        <AccordionItem  value="extraction">
          <AccordionTrigger className='font-bold'>
            Data Extraction
          </AccordionTrigger>
          <AccordionContent className='flex flex-col gap-1'>
            <TaskMenuBtn taskType={TaskType.OPENAI_CALL} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </aside>
  )
}

export default TaskMenu