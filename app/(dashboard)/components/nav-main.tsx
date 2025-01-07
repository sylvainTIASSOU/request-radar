"use client"

import {  ChevronRight,  CreditCard,  FileStack, ShieldX, type LucideIcon } from "lucide-react"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import { useRouter, usePathname } from "next/navigation"
import { RootState } from "@/redux/store"
import { useSelector } from "react-redux"
import Link from "next/link"

export function NavMain({
  items,
}: {
  items: {
    title: string
    url: string
    icon?: LucideIcon
    isActive?: boolean
    items?: {
      title: string
      url: string
    }[]
  }[]
}) {

  const router = useRouter();
  const pathname = usePathname();
  const role = useSelector((state: RootState) => state.auth.role);
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarMenu className="flex flex-col gap-4">
        {items.map((item) => (
          <Collapsible
            key={item.title}
            asChild
            defaultOpen={item.isActive}
            className="group/collapsible hover:bg-colorSecondary rounded-md"
          >
            <SidebarMenuItem className="hover:bg-colorSecondary rounded-md">
              <CollapsibleTrigger asChild>
                <SidebarMenuButton onClick={() => {
                 
                  router.push(item.url);
                }} tooltip={item.title} 
                className={ pathname === item.url ? `bg-colorSecondary text-white rounded-md` : `hover:bg-colorSecondary hover:text-white rounded-md`}
                >
                
                  {item.icon && <item.icon className="size-8" />}
                  <span>{item.title}</span>

                  {/* <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" /> */}

                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                {/* <SidebarMenuSub>
                  {item.items?.map((subItem) => (
                    <SidebarMenuSubItem key={subItem.title}>
                      <SidebarMenuSubButton asChild>
                        <a href={subItem.url}>
                          <span>{subItem.title}</span>
                        </a>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub> */}
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        ))}


{/*      menu & ============================================ 3 */}
{/* 
<Collapsible
            
            asChild
            defaultOpen={false}
            className="group/collapsible"
          >
            <SidebarMenuItem className="">
              <CollapsibleTrigger asChild>
                <SidebarMenuButton onClick={() => {
                  
                }} tooltip={"item.title"}
                className={ pathname === "/dashboard/attribut_card" || pathname === "/dashboard/delivery_card" ? `bg-colorSecondary text-white rounded-md` : `hover:bg-colorSecondary hover:text-white rounded-md`}
                >
                
                  <CreditCard />

                  <span>Carte </span>

                  <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />

                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  
                    <SidebarMenuSubItem >
                      <SidebarMenuSubButton asChild>
                        <Link href={"/dashboard/attribut_card"}>
                          <span>Cartes attribués</span>
                        </Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>

                    <SidebarMenuSubItem >
                      <SidebarMenuSubButton asChild>
                        <Link href={"/dashboard/delivery_card"}>
                          <span>Cartes délivrés</span>
                        </Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>

                    
                 
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>







<Collapsible
            
            asChild
            defaultOpen={false}
            className="group/collapsible"
          >
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton onClick={() => {
                  
                }} tooltip={"item.title"}
                className={ pathname === "/dashboard/history" ? `bg-colorSecondary text-white rounded-md` : `hover:bg-colorSecondary hover:text-white rounded-md`}
                >
                
                  <FileStack />

                  <span>Historiques</span>

                  <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />

                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  
                    <SidebarMenuSubItem >
                      <SidebarMenuSubButton asChild>
                        <Link href={"/dashboard/history"}>
                          <span>Ordres de recharge</span>
                        </Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>

                    <SidebarMenuSubItem >
                      <SidebarMenuSubButton asChild>
                        <Link href={"/dashboard/history"}>
                          <span>Recharges simples</span>
                        </Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>

                    <SidebarMenuSubItem >
                      <SidebarMenuSubButton asChild>
                        <Link href={"/dashboard/history"}>
                          <span>Historique des annulations</span>
                        </Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                 
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>






{
  role == "ADMIN" && 

  <Collapsible
            
            asChild
            defaultOpen={false}
            className="group/collapsible"
          >
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton onClick={() => {
                  
                }} tooltip={"item.title"}
                className={ pathname === "/dashboard/recharge_account_admin" || pathname === "/dashboard/recharge_order_admin" || pathname === "/dashboard/recharge_simple_admin" || pathname === "/dashboard/ordre_validation" ? `bg-colorSecondary text-white rounded-md` : `hover:bg-colorSecondary hover:text-white rounded-md`}
                >
                
                  <ShieldX />

                  <span>Administration</span>

                  <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />

                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  
                    <SidebarMenuSubItem >
                      <SidebarMenuSubButton asChild>
                        <Link href={"/dashboard/recharge_account_admin"}>
                          <span>Compte de recharge</span>
                        </Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>

                    <SidebarMenuSubItem >
                      <SidebarMenuSubButton asChild>
                        <Link href={"/dashboard/recharge_order_admin"}>
                          <span>Orders de recharge</span>
                        </Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>


                    <SidebarMenuSubItem >
                      <SidebarMenuSubButton asChild>
                        <Link href={"/dashboard/recharge_simple_admin"}>
                          <span>Validation Recharges</span>
                        </Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>



                    <SidebarMenuSubItem >
                      <SidebarMenuSubButton asChild>
                        <Link href={"/dashboard/ordre_validation"}>
                          <span>Validation des Orders </span>
                        </Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>


                   
                 
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>



} */}


      </SidebarMenu>
    </SidebarGroup>
  )
}
