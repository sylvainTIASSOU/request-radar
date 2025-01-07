"use client"

import * as React from "react"
import {
  ArrowDownUp,
  BetweenVerticalStart,
  BoomBox,
  DatabaseZap,
  FilePenLine,
  LayoutDashboard,
  ShieldBan,
  UsersRound,
} from "lucide-react"


import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { NavMain } from "./nav-main"


// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },

  teams: [
    // {
    //   name: "Acme Inc",
    //   logo: GalleryVerticalEnd,
    //   plan: "Enterprise",
    // },
    
  ],

  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
      isActive: false,
      items: [
      
      ],
    },
    {
      title: "données métriques",
      url: "/dashboard/metric_data",
      icon: DatabaseZap,
      items: [
        {
          title: "Genesis",
          url: "#",
        },
        {
          title: "Explorer",
          url: "#",
        },
        {
          title: "Quantum",
          url: "#",
        },
      ],
    },
   


    // {
    //   title: "Limitaion",
    //   url: "/dashboard/limitation",
    //   icon: ShieldBan,
    //   items: [
    //     {
    //       title: "General",
    //       url: "#",
    //     },
    //     {
    //       title: "Team",
    //       url: "#",
    //     },
    //     {
    //       title: "Billing",
    //       url: "#",
    //     },
    //     {
    //       title: "Limits",
    //       url: "#",
    //     },
    //   ],
    // },

    // {
    //   title: "Recharge simple",
    //   url: "/dashboard/add_simple_recharge",
    //   icon: BoomBox,
    //   items: [
        
    //   ],
    // },



    // {
    //   title: "Ordres de recharge",
    //   url: "/dashboard/add_recharge_order",
    //   icon: ArrowDownUp,
    //   items: [
        
    //   ],
    // },

    // {
    //   title: "Compte de recharge",
    //   url: "/dashboard/recharge_account",
    //   icon: BetweenVerticalStart,
    //   items: [
       
    //   ],
    // },
  ],
  
  
  // projects: [
  //   {
  //     name: "Compte de recharge admin",
  //     url: "#",
  //     icon: Frame,
  //   },
  //   {
  //     name: "Sales & Marketing",
  //     url: "#",
  //     icon: PieChart,
  //   },
  //   {
  //     name: "Travel",
  //     url: "#",
  //     icon: Map,
  //   },
  // ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        {/* <TeamSwitcher teams={data.teams} /> */}
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        {/* <NavProjects projects={data.projects} /> */}
      </SidebarContent>
      <SidebarFooter>
        {/* <NavUser user={data.user} /> */}
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
