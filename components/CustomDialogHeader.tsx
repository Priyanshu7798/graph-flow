"use client"

import React from 'react'
import { DialogHeader, DialogTitle } from './ui/dialog';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Separator } from './ui/separator';

interface Props{
  title?: string;
  subtitles?: string;
  icon?: LucideIcon;

  iconClassName?: string;
  titleClassName?: string;
  subtitlesClassName?: string;
}
function CustomDialogHeader(props: Props) {


  return (
    <DialogHeader className='py-6'>
      <DialogTitle asChild>
        <div className='flex flex-col items-center gap-2 mb-2'>
          {props.icon &&  (
            <props.icon 
              size={30}
              className={cn("stroke-primary", props.iconClassName)}
            />
          )}

          {props.title && (
            <h3 className={cn("text-xl text-primary", props.titleClassName)}>
              {props.title}
            </h3>
          )}
          {props.subtitles && (
            <p className={cn("text-sm text-muted-foreground", props.subtitlesClassName)}>
              {props.subtitles}
            </p>
          )}
        </div>
      </DialogTitle>
      <Separator />
    </DialogHeader>
  )
}

export default CustomDialogHeader