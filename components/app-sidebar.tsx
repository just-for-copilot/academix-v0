import { Home, Settings, Users, HelpCircle } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { TooltipProvider, TooltipTrigger } from "./ui/tooltip"
import { Tooltip, TooltipContent } from "./ui/tooltip"
import { LogoutButton } from "./logout-button"

const items = [
  { title: "Home", url: "/", icon: Home },
  { title: "Settings", url: "/settings", icon: Settings }
]

export function AppSidebar() {
  return (
    // Crucial: Set collapsible to "icon"
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton asChild>
                          <a href={item.url}>
                            <item.icon />
                            {/* Text must be wrapped in a span to hide cleanly */}
                            <span>{item.title}</span>
                          </a>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    </TooltipTrigger>
                    <TooltipContent side="right">
                      <Tooltip>
                        <p>{item.title}</p>
                      </Tooltip>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <LogoutButton />
      </SidebarFooter>
    </Sidebar>
  )
}
