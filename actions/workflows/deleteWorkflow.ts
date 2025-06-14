"use server"

import prisma from "@/lib/prisma"
import { auth } from "@clerk/nextjs/server"
import { revalidatePath } from "next/cache";

export async function Deleteworkflow(id: string){
  
  let userId: string | null = null;

  try {
    const authResult = auth();
    userId = authResult.userId;
  } catch (err) {
    console.error("auth() failed in Deleteworkflow:", err);
  }

  if (!userId) {
    throw new Error("User not found");
  }


  await prisma.workflow.deleteMany({
    where: {
      id,
      userId,
    }
  });

  revalidatePath('/workflows')
}