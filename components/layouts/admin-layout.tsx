"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { BarChart, Users, Store, Settings, LogOut, Menu, X } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface AdminLayoutProps {
  children: React.ReactNode
}

export default function AdminLayout({ children }: AdminLayoutProps) {
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
      href: "/admin/dashboard",
      icon: BarChart,
    },
    {
      name: "Users",
      href: "/admin/users",
      icon: Users,
    },
    {
      name: "Stores",
      href: "/admin/stores",
      icon: Store,
    },
    {
      name: "Settings",
      href: "/admin/settings",
      icon: Settings,
    },
  ]

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Main content */}
      <div className="flex-1 md:ml-72">
        <div className="container py-8">{children}</div>
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
        className={`fixed inset-y-0 right-0 z-40 w-72 transform bg-white shadow-xl transition-transform duration-300 ease-in-out md:translate-x-0 md:right-auto md:left-0 ${
          isSidebarOpen ? "translate-x-0" : "translate-x-full md:translate-x-0"
        }`}
      >
        <div className="flex h-full flex-col justify-between pb-6">
          <div>
            <div className="flex h-20 items-center bg-gradient-to-r from-teal-600 to-cyan-600 px-6">
              <h1 className="text-xl font-bold text-white">StoreApp Admin</h1>
            </div>
            <nav className="mt-6 px-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`mb-3 flex items-center rounded-xl px-4 py-3.5 text-sm font-medium transition-all duration-200 ${
                    pathname === item.href ? "bg-teal-50 text-teal-700" : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <item.icon className={`mr-3 h-5 w-5 ${pathname === item.href ? "text-teal-600" : "text-gray-500"}`} />
                  {item.name}
                  {pathname === item.href && <div className="ml-auto h-2 w-2 rounded-full bg-teal-600"></div>}
                </Link>
              ))}
            </nav>
          </div>
          <div className="px-4">
            <div className="mb-4 rounded-xl bg-teal-50 p-4">
              <div className="flex items-center">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-100">
                  <Users className="h-5 w-5 text-teal-600" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">Admin User</p>
                  <p className="text-xs text-gray-500">admin@example.com</p>
                </div>
              </div>
            </div>
            <Button
              variant="outline"
              className="w-full justify-start rounded-xl border-gray-200 py-3"
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-4 w-4 text-gray-500" />
              Logout
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
