"use client"
import { CoinsIcon, HomeIcon, Layers2Icon, ShieldCheckIcon } from 'lucide-react'
import React from 'react'
import Logo from '@/components/Logo'
import Link from 'next/link'
import { buttonVariants } from './ui/button'
import { usePathname } from 'next/navigation'


const routes = [
  {
    href : "",
    label : "Home",
    icon : HomeIcon
  },
  {
    href : "workflows",
    label : "workflows",
    icon : Layers2Icon
  },
  {
    href : "credentials",
    label : "Credentials",
    icon : ShieldCheckIcon
  },
  {
    href : "billing",
    label : "Billing",
    icon : CoinsIcon
  },
];

function DesktopSidebar() {
  const pathname = usePathname();
  const activeRoute = routes.find(
    (route)=>route.href.length > 0 && pathname.includes(route.href)
  ) || routes[0];


  return (
    <div className='hidden md:block relative min-w-[280px] max-w-[280px] h-screen overflow-hidden w-full bg-primary/5 dark:bg-secondary/30 dark:text-foreground text-muted-foreground border-r-2 border-separate'>
      <div className='flex items-center justify-center gap-2 border-b-[1px] border-separate p-4'>
        <Logo />
      </div>
      <div className='p-2'>TODO Credits</div>
      <div className='flex flex-col p-2 gap-1'>
        {routes.map((route)=>(
          <Link 
            key={route.label} 
            href={route.href}
            className={buttonVariants({
              variant :
                activeRoute.href === route.href ? "sidebarActiveItem" : "sidebarItem",
            })}          
          >
            <route.icon size={20} />
            {route.label}
          </Link>
        ))}
      </div>
    </div>
  )
}


export default DesktopSidebar