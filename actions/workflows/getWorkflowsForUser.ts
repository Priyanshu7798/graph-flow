"use server";

import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function GetWorkflowsForUser() {
  try {
    const { userId } = auth();
    if (!userId) {
      console.warn("No user ID found during build or SSR");
      return [];
    }

    return await prisma.workflow.findMany({
      where: { userId },
      orderBy: { createdAt: "asc" },
    });
  } catch (error) {
    console.error("Error in GetWorkflowsForUser:", error);
    return []; // Return empty array to prevent build crash
  }
}
