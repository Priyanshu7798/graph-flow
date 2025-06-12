"use client"
import { HomeIcon, Layers2Icon, ShieldCheckIcon, CoinsIcon, MenuIcon } from 'lucide-react';
import { usePathname } from 'next/navigation'
import React from 'react'
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import { Button, buttonVariants } from './ui/button';
import Logo from './Logo';
import Link from 'next/link';


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

function MobileSidebar() {
  const [isOpen, setOpen] = React.useState(false);

  const path = usePathname();
  const activeRoute = routes.find(
    (route) => route.href.length > 0 && path.includes(route.href)
  ) || routes[0];

  return (
    <div className='block border-separate bg-background md:hidden'>
      <nav>
        <Sheet open={isOpen} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant={'ghost'} size={'icon'}>
              <MenuIcon />
            </Button>
          </SheetTrigger>
          <SheetContent className='w-[400px] sm:w-[540px] space-y-4' side={"left"}>
            <Logo />
            <div className='flex flex-col p-2 gap-1'>
              {""}
              {routes.map((route)=>(
                <Link 
                  key={route.label} 
                  href={route.href}
                  className={buttonVariants({
                    variant:
                      activeRoute.href === route.href ? "sidebarActiveItem" : "sidebarItem",
                  })}
                  onClick={() => setOpen((prev)=>!prev)}
                >
                  <route.icon size={20} />
                  {route.label}
                </Link>
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </div>
  )
}

export default MobileSidebar