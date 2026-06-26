import { Home, Settings, Users, HelpCircle } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { TooltipProvider, TooltipTrigger } from "./ui/tooltip"
import { Tooltip, TooltipContent } from "./ui/tooltip"

const items = [
  { title: "Home", url: "#", icon: Home },
  { title: "Users", url: "#", icon: Users },
  { title: "Settings", url: "#", icon: Settings },
  { title: "Help", url: "#", icon: HelpCircle },
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
                    <TooltipContent>
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
    </Sidebar>
  )
}
