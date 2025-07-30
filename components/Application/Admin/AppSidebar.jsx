"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from "@/components/ui/sidebar";
import Image from "next/image";
import logoBlack from '@/public/assets/images/Rachnika_Logo.png';
import logoWhite from '@/public/assets/images/Rachnika_Logo.png';
import { Button } from "@/components/ui/button";
import { LuChevronRight } from "react-icons/lu";
import { IoMdClose } from "react-icons/io";
import { adminAppSidebarMenu } from "@/lib/AdminSidebarMenu";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import Link from "next/link";

const AppSideBar = () => {
    const {toggleSidebar}=useSidebar()
  return (
    <Sidebar className="z-50">
      <SidebarHeader className="border-b h-20 p-0">
        <div className="flex justify-between items-center px-4">
            <Image src={logoBlack.src} height={50} width={logoBlack.width} className="block dark:hidden h-[100px] w-auto" alt="logo-black"/>
            <Image src={logoWhite.src} height={50} width={logoWhite.width} className="hidden dark:block h-[100px] w-auto" alt="logo-white"/>
            
            <Button onClick={toggleSidebar} type="button" size="icon" className="md:hidden">
                <IoMdClose/>
            </Button>
            
        </div>
      </SidebarHeader>

      <SidebarContent className="p-3">
        <SidebarMenu>
            {adminAppSidebarMenu.map((menu,index)=>(
                <Collapsible key={index} className="group/collapsible">
                    <SidebarMenuItem>
                        <CollapsibleTrigger asChild> 
                            <SidebarMenuButton asChild className="font-semibold px-2 py-5">
                    
                                <Link href={menu?.url}>
                                    <menu.icon/> 
                                    {menu.titie}

                                    {menu.submenu && menu.submenu.length>0 && 
                                        <LuChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90"/>
                                    }
                                </Link>
                                
                            </SidebarMenuButton>
                        </CollapsibleTrigger>
                        
                        {menu.submenu && menu.submenu.length>0 &&
                         <CollapsibleContent>
                                    <SidebarMenuSub>
                                        {menu.submenu.map((submenuItem,subMenuIndex)=>(
                                            <SidebarMenuSubItem key={subMenuIndex}>
                                                <SidebarMenuSubButton asChild className="px-2 py-5">
                                                    <Link href={submenuItem.url}>
                                                        {submenuItem.title}
                                                    </Link>
                                                </SidebarMenuSubButton>
                                            </SidebarMenuSubItem>
                                            ))}
                                    </SidebarMenuSub>
                         </CollapsibleContent>
                        }

                    </SidebarMenuItem>
                </Collapsible>
            ))}
        </SidebarMenu>
      </SidebarContent>
      
    </Sidebar>
  );
};

export default AppSideBar;
