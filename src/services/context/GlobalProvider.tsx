import React from 'react'
import { UiProvider, DarkModeProvider, ColorsProvider } from "@/services/theme"
import { ReactQueryProvider } from "@/services/api"
import { SidebarProvider } from "./SidebarContext"

const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ReactQueryProvider >
      <DarkModeProvider>
        <ColorsProvider >
          <UiProvider>
            <SidebarProvider>


              {children}
            </SidebarProvider>
          </UiProvider>
        </ColorsProvider>
      </DarkModeProvider>
    </ReactQueryProvider>
  )
}

export default GlobalProvider