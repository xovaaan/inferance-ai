"use client"

import {
    Image as ImageIcon,
    Video,
    Mic,
    History,
    CreditCard,
    LayoutDashboard,
    LogOut,
    User,
} from "lucide-react"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "@/components/ui/sidebar"
import { CreditCounter } from "@/components/credit-counter"
import Link from "next/link"
import { usePathname } from "next/navigation"

const items = [
    {
        title: "Dashboard",
        url: "/dashboard",
        icon: LayoutDashboard,
    },
    {
        title: "Text to Image",
        url: "/dashboard/image",
        icon: ImageIcon,
    },
    {
        title: "Text to Video",
        url: "/dashboard/video",
        icon: Video,
    },
    {
        title: "Text to Speech",
        url: "/dashboard/tts",
        icon: Mic,
    },
    {
        title: "History",
        url: "/dashboard/history",
        icon: History,
    },
    {
        title: "Billing",
        url: "/dashboard/billing",
        icon: CreditCard,
    },
]

export function AppSidebar() {
    const pathname = usePathname()

    return (
        <Sidebar collapsible="icon">
            <SidebarHeader className="h-16 flex items-center justify-center border-b">
                <Link href="/dashboard" className="flex items-center gap-2 font-bold text-xl px-2">
                    <img src="/logo.svg" alt="Logo" className="w-8 h-8 flex-shrink-0" />
                    <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent group-data-[collapsible=icon]:hidden">
                        Inference AI
                    </span>
                </Link>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Menu</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton
                                        asChild
                                        isActive={pathname === item.url}
                                        tooltip={item.title}
                                    >
                                        <Link href={item.url}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter className="border-t p-4">
                <CreditCounter />
                <SidebarMenu className="mt-4">
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild tooltip="Profile">
                            <Link href="/dashboard/profile">
                                <User />
                                <span>Profile</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <SidebarMenuButton tooltip="Logout">
                            <LogOut />
                            <span>Logout</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    )
}
