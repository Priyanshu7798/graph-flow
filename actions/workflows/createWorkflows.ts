"use server"

import prisma from "@/lib/prisma";
import { createWorkflowSchema, createWorkflowSchemaType } from "@/schema/workflow"
import { WorkflowStatus } from "@/types/workflow";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { AppNode } from "@/types/appNode";
import { Edge } from "@xyflow/react";
import { CreateFlowNode } from "@/lib/workflow/createFlowNode";
import { TaskType } from "@/types/task";

export async function CreateWorkflows(form : createWorkflowSchemaType) {
  const {success,data} = createWorkflowSchema.safeParse(form);

  if(!success){
    throw new Error("Inavlid from data")
  }

  const {userId} = auth();

  if(!userId) {
    throw new Error("User not found")
  }

  const initialFlow : {nodes:AppNode[]; edges: Edge[] } = {
    nodes: [],
    edges: [],
  }

  initialFlow.nodes.push(CreateFlowNode(TaskType.LAUNCH_BROWSER))

  const result = await prisma.workflow.create({
    data: {
      userId,
      status: WorkflowStatus.DRAFT,
      definition: JSON.stringify(initialFlow),
      ...data,
      description: data.description ?? "",
    },
  });

  if(!result){
    throw new Error("Failed to create workflow")  
  }

  redirect(`/workflow/editor/${result.id}`)
}