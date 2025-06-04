"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { BarChart, Star, User, Settings, LogOut, Menu, X } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface StoreLayoutProps {
  children: React.ReactNode
}

export default function StoreLayout({ children }: StoreLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const { toast } = useToast()

  const handleLogout = () => {
    toast({
      title: "Logged out",
      description: "You have been logged out successfully.",
    })
    router.push("/login")
  }

  const navItems = [
    {
      name: "Dashboard",
      href: "/store/dashboard",
      icon: BarChart,
    },
    {
      name: "Ratings",
      href: "/store/ratings",
      icon: Star,
    },
    {
      name: "Profile",
      href: "/store/profile",
      icon: User,
    },
    {
      name: "Settings",
      href: "/store/settings",
      icon: Settings,
    },
  ]

  return (
    <div className="flex min-h-screen bg-muted/50">
      {/* Main content */}
      <div className="flex-1 md:mr-64">
        <div className="container py-6 md:py-8">{children}</div>
      </div>

      {/* Mobile sidebar toggle */}
      <Button
        variant="outline"
        size="icon"
        className="fixed right-4 top-4 z-50 md:hidden"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 right-0 z-40 w-64 transform bg-background shadow-lg transition-transform duration-200 ease-in-out md:translate-x-0 ${
          isSidebarOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex h-16 items-center border-b px-6">
          <h1 className="text-lg font-semibold">StoreApp Dashboard</h1>
        </div>
        <nav className="space-y-1 px-3 py-4">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center rounded-md px-3 py-2 text-sm font-medium ${
                pathname === item.href
                  ? "bg-teal-600 text-white"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              <item.icon className="mr-3 h-5 w-5" />
              {item.name}
            </Link>
          ))}
        </nav>
        <div className="absolute bottom-0 w-full border-t p-4">
          <Button variant="outline" className="w-full justify-start" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </div>
    </div>
  )
}
