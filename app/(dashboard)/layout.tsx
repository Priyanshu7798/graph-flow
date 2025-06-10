import BreadcrumbHeader from '@/components/BreadcrumbHeader'
import DesktopSidebar from '@/components/DesktopSidebar'
import { ModeToggle } from '@/components/ThemeModeToggle'
import { Separator } from '@/components/ui/separator'
import { SignedIn, UserButton } from '@clerk/nextjs'
import React from 'react'

const layout = ({children} : {children : React.ReactNode}) => {
  return (
    <div className='flex h-screen'>
      <DesktopSidebar />
      <div className='flex flex-1 flex-col min-h-screen'>
        <header className='flex h-[50px] container items-center px-6 py-4 justify-between'>
          <BreadcrumbHeader />
          <div className='gap-1 flex items-center'>
            <ModeToggle />
            <SignedIn>
              <UserButton  />
            </SignedIn>
          </div>
        </header>
        <Separator />
        <div className='overflow-auto'>
          <div className='container py-4 text-accent-foreground flex-1'>
            {children }
          </div>
        </div>
      </div>
    </div>
  )
}

export default layout