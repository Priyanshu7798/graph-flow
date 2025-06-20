export const dynamic = "force-dynamic"; // ⬅️ Add this

import { Workflow } from '@prisma/client'
import { Background, BackgroundVariant, Controls, ReactFlow, useEdgesState, useNodesState, useReactFlow } from '@xyflow/react'
import React, { useCallback, useEffect } from 'react'
import "@xyflow/react/dist/style.css";
import { CreateFlowNode } from '@/lib/workflow/createFlowNode';
import { TaskType } from '@/types/task';
import NodeComponent from './nodes/NodeComponent';
import { AppNode } from '@/types/appNode';



const nodeTypes ={
  Node: NodeComponent,
}

const snapGrid : [number , number] = [50 , 50];
const fitViewOptions = {padding:1};

function FlowEditor({workflow} : {workflow : Workflow}) {

  const [nodes , setNodes , onNodesChange] = useNodesState<AppNode>([]);
  const [edges , setEdges , onEdgesChange] = useEdgesState([]);
  const {setViewport,screenToFlowPosition} = useReactFlow(); 

  useEffect(()=>{
    try {
      const flow = JSON.parse(workflow.definition);
      if(!flow) return;
      setNodes(flow.nodes || []);
      setEdges(flow.edges || []);

      if(!flow.viewport) return;
      const {x=0, y=0 ,zoom=1} = flow.viewport;
      setViewport({x,y,zoom});

    } catch (error) {
      
    }
  },[workflow.description,setEdges,setNodes,setViewport])


  const onDragOver = useCallback((e: React.DragEvent)=>{
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  },[])

  const onDrop = useCallback((e: React.DragEvent)=>{
    e.preventDefault();
    const taskType = e.dataTransfer.getData("application/reactflow");
    if(typeof taskType === undefined || !taskType) return;


    const position = screenToFlowPosition({
      x : e.clientX,
      y : e.clientY
    })

    const newNode = CreateFlowNode(taskType as TaskType , position);
    setNodes(nds => nds.concat(newNode));
  },[]);

  return (

    <main className='h-full w-full'>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onEdgesChange={onEdgesChange}
        onNodesChange={onNodesChange}
        nodeTypes={nodeTypes}
        snapToGrid
        snapGrid={snapGrid}
        fitView
        fitViewOptions={fitViewOptions}
        onDragOver = {onDragOver}
        onDrop = {onDrop}

      >
        <Controls position='top-left' fitViewOptions={fitViewOptions} />
        <Background variant={BackgroundVariant.Dots} gap={12} size={2} />
      </ReactFlow>
    </main>
  )
}

export default FlowEditor