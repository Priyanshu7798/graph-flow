"use client"
export const dynamic = "force-dynamic"; // ⬅️ Add this

import React, { useState } from 'react'
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
 } from '@/components/ui/alert-dialog'
import { Input } from '@/components/ui/input';
import { useMutation } from '@tanstack/react-query';
import { Deleteworkflow } from '@/actions/workflows/deleteWorkflow';
import { toast } from 'sonner';

 interface Props {
  open : boolean;
  setOpen : (open: boolean) =>void;
  workflowName : string;
  workflowId : string
 }

function DeleteWorkflowDialog({open,setOpen , workflowName , workflowId}: Props) {
  const [confirmText , setConfirmText] = useState('');

  const deleteMutation = useMutation({
    mutationFn: Deleteworkflow,
    onSuccess: () => {
      toast.success("Workflow deleted successfully", {id : 'delete-workflow'})
      setConfirmText('');
    },
    onError : () => {
      toast.error("Failed to delete workflow", {id : 'delete-workflow'})
    },
  });

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className='text-center font-bold text-xl text-red-600'>Are you absolutely sure ?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your workflow and remove your data from our servers.
            <div className='flex flex-col py-4 gap-2'>
              <p>If you are sure,enter <b className='text-red-600 capitalize text-lg'>{workflowName}</b> to confirm</p>

              <Input 
                value={confirmText}
                onChange={(e)=>setConfirmText(e.target.value)}
              />
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel onClick={()=> setConfirmText('')}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction disabled={confirmText !== workflowName || deleteMutation.isPending} className='bg-destructive text-destructive-foreground hover:bg-destructive/90'
          onClick={()=>{
            toast.loading("Deleting workflow", {id: workflowId});
            deleteMutation.mutate(workflowId);
          }}>
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default DeleteWorkflowDialog