import { LayoutDashboard, Film, BarChart3, DollarSign, Rocket, Users, Settings, Sparkles } from "lucide-react";
import { NavLink } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const menuItems = [
  { title: "Overview", url: "/dashboard", icon: LayoutDashboard },
  { title: "Universes", url: "/dashboard/universes", icon: Film },
  { title: "Analytics", url: "/dashboard/analytics", icon: BarChart3 },
  { title: "Monetization", url: "/dashboard/monetization", icon: DollarSign },
  { title: "Workflow", url: "/dashboard/workflow", icon: Rocket },
  { title: "Collaboration", url: "/dashboard/collaboration", icon: Users },
  { title: "Settings", url: "/dashboard/settings", icon: Settings },
];

export function DashboardSidebar() {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <Sidebar collapsible="icon" className="border-r border-white/10">
      <SidebarContent className="bg-[#0a0b1a]/95 backdrop-blur-xl">
        {/* Logo */}
        <div className="p-6 border-b border-white/10">
          {!isCollapsed ? (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#00eaff] to-[#a24df6] flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="font-display text-xl font-bold bg-gradient-to-r from-[#00eaff] to-[#a24df6] bg-clip-text text-transparent">
                CineVerse
              </span>
            </div>
          ) : (
            <div className="w-8 h-8 mx-auto rounded-lg bg-gradient-to-br from-[#00eaff] to-[#a24df6] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
          )}
        </div>

        <SidebarGroup>
          <SidebarGroupLabel className="text-white/40 px-6">
            {!isCollapsed && "Studio"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end={item.url === "/dashboard"}
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-6 py-3 transition-all ${
                          isActive
                            ? "bg-gradient-to-r from-[#00eaff]/20 to-[#a24df6]/20 border-l-2 border-[#00eaff] text-[#00eaff]"
                            : "text-white/60 hover:text-white hover:bg-white/5"
                        }`
                      }
                    >
                      {({ isActive }) => (
                        <>
                          <item.icon className={`w-5 h-5 ${isActive ? "text-[#00eaff]" : ""}`} />
                          {!isCollapsed && <span className="font-medium">{item.title}</span>}
                        </>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
