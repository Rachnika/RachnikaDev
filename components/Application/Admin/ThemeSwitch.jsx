"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { GoSun } from "react-icons/go";
import { FiMoon } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes"

const ThemeSwitch = () => {
    const { setTheme } = useTheme()
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button type="button" variant="ghost" className="cursor-pointer">
           <GoSun className="dark:hidden"/>
           <FiMoon className="hidden dark:block"/> 
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={()=>setTheme('light')}>Light</DropdownMenuItem>
        <DropdownMenuItem onClick={()=>setTheme('dark')}>Dark</DropdownMenuItem>
        <DropdownMenuItem onClick={()=>setTheme('system')}>System</DropdownMenuItem>
        
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ThemeSwitch;
