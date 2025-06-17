"use server"

import prisma from '@/lib/prisma'
import { auth } from '@clerk/nextjs/server'
import React from 'react'
import Editor from '../../_components/Editor'

async function page({params}: {params: {workflowId: string}}) {

  const workflowId = params.workflowId
  let userId: string | null = null;

  try {
    const session = auth();
    userId = session.userId;
  } catch (err) {
    console.error("auth() failed:", err);
  }

  if (!userId) {
    return <div>Unauthenticated</div>;
  }
  const workflow = await prisma.workflow.findUnique({
    where: {
      id: workflowId,
      userId,
    },
  });

  if(!workflow){
    return(
      <div>Workflow not found</div>
    )
  }

  return (
    <Editor workflow={workflow} />
  )
}

export default page