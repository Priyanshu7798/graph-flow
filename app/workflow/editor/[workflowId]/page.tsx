export const dynamic = "force-dynamic";

import prisma from '@/lib/prisma'
import { auth } from '@clerk/nextjs/server'
import React from 'react'
import Editor from '../../_components/Editor'

async function page({ params }: { params: { workflowId: string } }) {
  const workflowId = params.workflowId
  let userId: string | null = null;

  try {
    const session = auth();
    userId = session.userId;
  } catch (err) {
    console.error("auth() failed:", err);
  }

  if (!userId) {
    console.error("No userId found");
    return <div>Unauthenticated</div>;
  }

  let workflow = null;
  try {
    workflow = await prisma.workflow.findUnique({
      where: {
        id: workflowId,
        userId,
      },
    });
  } catch (err) {
    console.error("prisma.workflow.findUnique failed:", err);
  }

  if (!workflow) {
    console.error("Workflow not found for id:", workflowId, "and userId:", userId);
    return <div>Workflow not found</div>;
  }

  return <Editor workflow={workflow} />
}

export default page