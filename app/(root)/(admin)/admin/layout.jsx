import AppSideBar from '@/components/Application/Admin/AppSidebar'
import { SidebarProvider } from '@/components/ui/sidebar'
import React from 'react'

const layout = ({children}) => {
  return (
    <SidebarProvider>
        <AppSideBar/>
        <main>{children}</main>
    </SidebarProvider>
    
  )
}

export default layout
