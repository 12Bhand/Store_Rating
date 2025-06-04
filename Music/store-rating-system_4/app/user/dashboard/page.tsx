"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import UserLayout from "@/components/layouts/user-layout"
import { StoreCard } from "@/components/store-card"

// Mock data
const mockStores = [
  { id: 1, name: "Grocery Supermarket Plus", address: "123 Market St, San Francisco, CA", rating: 4.7, userRating: 5 },
  { id: 2, name: "Electronics Megastore Central", address: "456 Tech Blvd, Seattle, WA", rating: 4.2, userRating: 4 },
  { id: 3, name: "Fashion Boutique Collection", address: "789 Style Ave, Miami, FL", rating: 4.8, userRating: null },
  { id: 4, name: "Home Improvement Warehouse", address: "101 Builder St, Denver, CO", rating: 3.9, userRating: 3 },
  { id: 5, name: "Gourmet Restaurant Deluxe", address: "202 Food Ln, New Orleans, LA", rating: 4.5, userRating: null },
  { id: 6, name: "Fitness Center & Gym", address: "303 Health Blvd, Boston, MA", rating: 4.3, userRating: null },
]

export default function UserDashboard() {
  const [searchTerm, setSearchTerm] = useState("")

  // Filter stores based on search term
  const filteredStores = mockStores.filter(
    (store) =>
      store.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      store.address.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <UserLayout>
      <div className="relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-0 left-0 -mt-20 -ml-20 w-64 h-64 rounded-full bg-purple-200 opacity-20"></div>
        <div className="absolute bottom-0 right-0 -mb-20 -mr-20 w-80 h-80 rounded-full bg-pink-200 opacity-20"></div>

        <div className="relative z-10">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
            {filteredStores.length > 0 ? (
              filteredStores.map((store) => <StoreCard key={store.id} store={store} />)
            ) : (
              <div className="col-span-full text-center py-16">
                <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <Search className="h-10 w-10 text-gray-400" />
                </div>
                <h3 className="text-xl font-medium text-gray-900">No stores found</h3>
                <p className="text-gray-500 mt-2">Try adjusting your search criteria</p>
                <Button
                  className="mt-6 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white rounded-xl py-5 px-8 shadow-md hover:shadow-lg transition-all duration-300"
                  onClick={() => setSearchTerm("")}
                >
                  Clear Search
                </Button>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
              Discover Stores
            </h1>
          </div>

          <div className="mb-8">
            <Card className="border-0 rounded-2xl shadow-lg overflow-hidden">
              <div className="p-6 bg-gradient-to-r from-teal-500 to-cyan-600 text-white">
                <h3 className="text-xl font-bold">Find Stores</h3>
                <p className="text-violet-100 mt-1">Search for stores by name or address</p>
              </div>
              <div className="p-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    type="search"
                    placeholder="Search stores..."
                    className="pl-10 py-6 rounded-xl border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-all duration-300"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </UserLayout>
  )
}
