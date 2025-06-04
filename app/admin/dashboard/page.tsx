"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Users, Store, Star, Search, PlusCircle } from "lucide-react"
import AdminLayout from "@/components/layouts/admin-layout"
import { DataTable } from "@/components/data-table"
import type { ColumnDef } from "@tanstack/react-table"

// Mock data
const mockUsers = [
  {
    id: 1,
    name: "John Alexander Thompson",
    email: "john@example.com",
    address: "123 Main St, New York, NY",
    role: "User",
  },
  {
    id: 2,
    name: "Sarah Elizabeth Williams",
    email: "sarah@example.com",
    address: "456 Oak Ave, Los Angeles, CA",
    role: "User",
  },
  {
    id: 3,
    name: "Michael Christopher Davis",
    email: "michael@store.com",
    address: "789 Pine Rd, Chicago, IL",
    role: "Store Owner",
    rating: 4.5,
  },
  {
    id: 4,
    name: "Jennifer Katherine Johnson",
    email: "jennifer@store.com",
    address: "101 Maple Dr, Houston, TX",
    role: "Store Owner",
    rating: 3.8,
  },
  {
    id: 5,
    name: "Robert Benjamin Anderson",
    email: "robert@admin.com",
    address: "202 Cedar Ln, Phoenix, AZ",
    role: "Admin",
  },
]

const mockStores = [
  {
    id: 1,
    name: "Grocery Supermarket Plus",
    email: "grocery@store.com",
    address: "123 Market St, San Francisco, CA",
    rating: 4.7,
  },
  {
    id: 2,
    name: "Electronics Megastore Central",
    email: "electronics@store.com",
    address: "456 Tech Blvd, Seattle, WA",
    rating: 4.2,
  },
  {
    id: 3,
    name: "Fashion Boutique Collection",
    email: "fashion@store.com",
    address: "789 Style Ave, Miami, FL",
    rating: 4.8,
  },
  {
    id: 4,
    name: "Home Improvement Warehouse",
    email: "home@store.com",
    address: "101 Builder St, Denver, CO",
    rating: 3.9,
  },
  {
    id: 5,
    name: "Gourmet Restaurant Deluxe",
    email: "gourmet@store.com",
    address: "202 Food Ln, New Orleans, LA",
    rating: 4.5,
  },
]

// Column definitions
const userColumns: ColumnDef<any>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "address",
    header: "Address",
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => {
      const role = row.original.role
      return (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            role === "Admin"
              ? "bg-purple-100 text-purple-800"
              : role === "Store Owner"
                ? "bg-blue-100 text-blue-800"
                : "bg-green-100 text-green-800"
          }`}
        >
          {role}
        </span>
      )
    },
  },
  {
    accessorKey: "rating",
    header: "Rating",
    cell: ({ row }) => {
      const rating = row.original.rating
      if (!rating) return "N/A"

      return (
        <div className="flex items-center">
          <span className="font-medium mr-1">{rating.toFixed(1)}</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-4 w-4 text-yellow-500"
          >
            <path
              fillRule="evenodd"
              d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      )
    },
  },
  {
    id: "actions",
    cell: () => (
      <Button variant="ghost" size="sm" className="hover:bg-teal-50 text-teal-600 hover:text-teal-700">
        View
      </Button>
    ),
  },
]

const storeColumns: ColumnDef<any>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "address",
    header: "Address",
  },
  {
    accessorKey: "rating",
    header: "Rating",
    cell: ({ row }) => {
      const rating = row.original.rating
      return (
        <div className="flex items-center">
          <span className="font-medium mr-1">{rating.toFixed(1)}</span>
          <div className="flex">
            {Array.from({ length: 5 }).map((_, i) => (
              <svg
                key={i}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className={`h-4 w-4 ${i < Math.round(rating) ? "text-yellow-500" : "text-gray-300"}`}
              >
                <path
                  fillRule="evenodd"
                  d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                  clipRule="evenodd"
                />
              </svg>
            ))}
          </div>
        </div>
      )
    },
  },
  {
    id: "actions",
    cell: () => (
      <Button variant="ghost" size="sm" className="hover:bg-teal-50 text-teal-600 hover:text-teal-700">
        View
      </Button>
    ),
  },
]

export default function AdminDashboard() {
  const [searchTerm, setSearchTerm] = useState("")

  // Filter data based on search term
  const filteredUsers = mockUsers.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const filteredStores = mockStores.filter(
    (store) =>
      store.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      store.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      store.address.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <AdminLayout>
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input
            type="search"
            placeholder="Search by name, email, address, or role..."
            className="pl-10 py-6 rounded-xl border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-300"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
          Admin Dashboard
        </h1>
        <div className="flex items-center gap-4">
          <Link href="/admin/add-user">
            <Button className="bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white shadow-md hover:shadow-lg transition-all duration-300">
              <PlusCircle className="mr-2 h-4 w-4" />
              Add User
            </Button>
          </Link>
          <Link href="/admin/add-store">
            <Button className="bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white shadow-md hover:shadow-lg transition-all duration-300">
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Store
            </Button>
          </Link>
        </div>
      </div>

      <Tabs defaultValue="users" className="space-y-6">
        <TabsList className="bg-gray-100 p-1 rounded-xl">
          <TabsTrigger
            value="users"
            className="rounded-lg py-2.5 px-4 data-[state=active]:bg-white data-[state=active]:text-indigo-600 data-[state=active]:shadow-sm transition-all duration-300"
          >
            Users
          </TabsTrigger>
          <TabsTrigger
            value="stores"
            className="rounded-lg py-2.5 px-4 data-[state=active]:bg-white data-[state=active]:text-indigo-600 data-[state=active]:shadow-sm transition-all duration-300"
          >
            Stores
          </TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="space-y-4">
          <Card className="border-0 rounded-2xl shadow-lg overflow-hidden">
            <div className="p-6 border-b">
              <h3 className="text-xl font-bold">All Users</h3>
              <p className="text-gray-500 mt-1">Manage users and their roles in the system</p>
            </div>
            <div className="p-6">
              <DataTable columns={userColumns} data={filteredUsers} />
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="stores" className="space-y-4">
          <Card className="border-0 rounded-2xl shadow-lg overflow-hidden">
            <div className="p-6 border-b">
              <h3 className="text-xl font-bold">All Stores</h3>
              <p className="text-gray-500 mt-1">Manage stores and view their ratings</p>
            </div>
            <div className="p-6">
              <DataTable columns={storeColumns} data={filteredStores} />
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-8">
        <Card className="p-6 border-0 bg-gradient-to-br from-teal-500 to-cyan-600 text-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Total Users</h3>
            <div className="p-3 bg-white/20 rounded-full">
              <Users className="h-6 w-6 text-white" />
            </div>
          </div>
          <div className="flex items-end justify-between">
            <div>
              <p className="text-4xl font-bold">{mockUsers.length}</p>
              <p className="text-sm text-white/80 mt-1">
                <span className="text-green-300">↑ 12%</span> from last month
              </p>
            </div>
            <div className="h-16 flex items-end">
              <div className="w-3 h-8 bg-white/20 rounded-t-md mx-0.5"></div>
              <div className="w-3 h-10 bg-white/20 rounded-t-md mx-0.5"></div>
              <div className="w-3 h-6 bg-white/20 rounded-t-md mx-0.5"></div>
              <div className="w-3 h-12 bg-white/20 rounded-t-md mx-0.5"></div>
              <div className="w-3 h-16 bg-white/40 rounded-t-md mx-0.5"></div>
            </div>
          </div>
        </Card>

        <Card className="p-6 border-0 bg-gradient-to-br from-cyan-500 to-sky-600 text-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Total Stores</h3>
            <div className="p-3 bg-white/20 rounded-full">
              <Store className="h-6 w-6 text-white" />
            </div>
          </div>
          <div className="flex items-end justify-between">
            <div>
              <p className="text-4xl font-bold">{mockStores.length}</p>
              <p className="text-sm text-white/80 mt-1">
                <span className="text-green-300">↑ 8%</span> from last month
              </p>
            </div>
            <div className="h-16 flex items-end">
              <div className="w-3 h-10 bg-white/20 rounded-t-md mx-0.5"></div>
              <div className="w-3 h-8 bg-white/20 rounded-t-md mx-0.5"></div>
              <div className="w-3 h-12 bg-white/20 rounded-t-md mx-0.5"></div>
              <div className="w-3 h-9 bg-white/20 rounded-t-md mx-0.5"></div>
              <div className="w-3 h-16 bg-white/40 rounded-t-md mx-0.5"></div>
            </div>
          </div>
        </Card>

        <Card className="p-6 border-0 bg-gradient-to-br from-sky-500 to-blue-600 text-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Total Ratings</h3>
            <div className="p-3 bg-white/20 rounded-full">
              <Star className="h-6 w-6 text-white" />
            </div>
          </div>
          <div className="flex items-end justify-between">
            <div>
              <p className="text-4xl font-bold">128</p>
              <p className="text-sm text-white/80 mt-1">
                <span className="text-green-300">↑ 24%</span> from last month
              </p>
            </div>
            <div className="h-16 flex items-end">
              <div className="w-3 h-6 bg-white/20 rounded-t-md mx-0.5"></div>
              <div className="w-3 h-9 bg-white/20 rounded-t-md mx-0.5"></div>
              <div className="w-3 h-12 bg-white/20 rounded-t-md mx-0.5"></div>
              <div className="w-3 h-14 bg-white/20 rounded-t-md mx-0.5"></div>
              <div className="w-3 h-16 bg-white/40 rounded-t-md mx-0.5"></div>
            </div>
          </div>
        </Card>
      </div>
    </AdminLayout>
  )
}
