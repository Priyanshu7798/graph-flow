"use client"
export const dynamic = "force-dynamic"; // ⬅️ Add this

import { Input } from '@/components/ui/input'
import { TaskParam, TaskParamType } from '@/types/task'
import React, { useCallback } from 'react'
import StringParam from './param/StringParam';
import { useReactFlow } from '@xyflow/react';
import { AppNode } from '@/types/appNode';

function NodeParamField({param , nodeId}:{param : TaskParam, nodeId:string}) {

  const {updateNodeData , getNode} = useReactFlow();
  const node = getNode(nodeId) as AppNode;
  const value = node?.data.inputs?.[param.name];

  const updateNodeParamValue = useCallback((newVal : string)=>{
    updateNodeData(nodeId ,{
      inputs:{
        ...node?.data.inputs,
        [param.name]:newVal,
      },
    });
  },[
    nodeId ,updateNodeData , param.name , node?.data.inputs
  ])

  switch (param.type){
    case TaskParamType.STRING:
      return <StringParam param={param} value= {value} updateNodeParamValue ={updateNodeParamValue} />;
    default:
      return (
        <div className='w-full'>
          <p className='text-muted-foreground text-xs'>Not Implemented</p>
        </div>
      )
  }
}

export default NodeParamField