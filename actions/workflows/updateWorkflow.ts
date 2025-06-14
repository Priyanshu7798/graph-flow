"use server"

import prisma from "@/lib/prisma";
import { WorkflowStatus } from "@/types/workflow";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function updateWorkflow ({id,definition}: {id: string,definition: string}) {

 let userId: string | null = null;

  try {
    const authResult = auth();
    userId = authResult.userId;
  } catch (err) {
    console.error("auth() failed in updateWorkflow:", err);
  }

  if (!userId) {
    throw new Error("User not found");
  }

  const workflow = await prisma.workflow.findUnique({
    where:{
      id,
      userId,
    },
  });

  if(!workflow){
    throw new Error("Workflow not found")
  }

  if(workflow.status !== WorkflowStatus.DRAFT){
    throw new Error("Workflow is not in draft mode")
  }

  await prisma.workflow.update({
    data: {
      definition,
    },
    where: {
      id,
      userId,
    },
  });

  revalidatePath("/workflows")
}
