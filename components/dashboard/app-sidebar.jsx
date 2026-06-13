"use client"

import * as React from "react"

import { NavDocuments } from "./nav-documents"
import { NavMain } from "./nav-main"
import { NavSecondary } from "./nav-secondary"
import { NavUser } from "./nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./ui/sidebar"
import { LayoutDashboardIcon, ListIcon, ChartBarIcon, FolderIcon, UsersIcon, CameraIcon, FileTextIcon, Settings2Icon, CircleHelpIcon, SearchIcon, DatabaseIcon, FileChartColumnIcon, FileIcon, CommandIcon } from "lucide-react"

const data = {
  user: {
    name: "Mitch",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      roles: ["admin", "staff", "client"],
      icon: (
        <LayoutDashboardIcon
        />
      ),
    },
    {
      title: "Lifecycle",
      url: "#",
      roles: ["admin", "staff"],
      icon: (
        <ListIcon
        />
      ),
    },
    {
      title: "Analytics",
      url: "/analytics",
      roles: ["admin"],
      icon: (
        <ChartBarIcon
        />
      ),
    },
    {
      title: "Leads",
      url: "/leads",
      roles: ["admin", "staff"],
      icon: (
        <UsersIcon
        />
      ),
    },
    {
      title: "Clients",
      url: "/clients",
      roles: ["admin", "staff"],
      icon: (
        <UsersIcon
        />
      ),
    },
    {
      title: "Orders",
      url: "/orders",
      roles: ["admin", "staff", "client"],
      icon: (
        <ListIcon
        />
      ),
    },
    {
      title: "Products",
      url: "/products",
      roles: ["admin", "staff"],
      icon: (
        <FolderIcon
        />
      ),
    },
    {
      title: "Inventory",
      url: "/inventory",
      roles: ["admin", "staff"],
      icon: (
        <DatabaseIcon
        />
      ),
    },
    {
      title: "Projects",
      url: "#",
      roles: ["admin", "staff", "client"],
      icon: (
        <FolderIcon
        />
      ),
    },
    {
      title: "Team",
      url: "#",
      roles: ["admin", "staff"],
      icon: (
        <UsersIcon
        />
      ),
    },
  ],
  navClouds: [
    {
      title: "Capture",
      roles: ["admin", "staff"],
      icon: (
        <CameraIcon
        />
      ),
      isActive: true,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
    {
      title: "Proposal",
      roles: ["admin", "staff"],
      icon: (
        <FileTextIcon
        />
      ),
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
    {
      title: "Prompts",
      roles: ["admin", "staff"],
      icon: (
        <FileTextIcon
        />
      ),
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "settings",
      roles: ["admin", "staff", "client"],
      icon: (
        <Settings2Icon
        />
      ),
    },
    {
      title: "Get Help",
      url: "#",
      roles: ["admin", "staff", "client"],
      icon: (
        <CircleHelpIcon
        />
      ),
    },
    {
      title: "Search",
      url: "#",
      roles: ["admin", "staff", "client"],
      icon: (
        <SearchIcon
        />
      ),
    },
  ],
  documents: [
    {
      name: "Analytics",
      url: "/analytics",
      roles: ["admin"],
      icon: (
        <DatabaseIcon
        />
      ),
    },
    {
      name: "Reports",
      url: "/Reports",
      roles: ["admin", "staff", "client"],
      icon: (
        <FileChartColumnIcon
        />
      ),
    },
    {
      name: "Word Assistant",
      url: "#",
      roles: ["admin", "staff"],
      icon: (
        <FileIcon
        />
      ),
    },
  ],
}

export function AppSidebar({ role = "admin", ...props }) {
  const prefixUrl = (items) => items.map(item => ({
    ...item,
    url: item.url?.startsWith('/') ? `/${role}${item.url}` : item.url,
    items: item.items ? prefixUrl(item.items) : undefined
  }));

  const filteredNavMain = prefixUrl(data.navMain.filter(item => item.roles?.includes(role)));
  const filteredDocuments = prefixUrl(data.documents.filter(item => item.roles?.includes(role)));
  const filteredNavSecondary = prefixUrl(data.navSecondary.filter(item => item.roles?.includes(role)));

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:p-1.5!"
            >
              <a href="/">
                <CommandIcon className="size-5!" />
                <span className="text-base font-semibold">Mad Graphix</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        {filteredNavMain.length > 0 && <NavMain items={filteredNavMain} />}
        {filteredDocuments.length > 0 && <NavDocuments items={filteredDocuments} />}
        {filteredNavSecondary.length > 0 && <NavSecondary items={filteredNavSecondary} className="mt-auto" />}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
