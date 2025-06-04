"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Star, Users } from "lucide-react"
import StoreLayout from "@/components/layouts/store-layout"
import { DataTable } from "@/components/data-table"
import type { ColumnDef } from "@tanstack/react-table"

// Mock data
const mockRatings = [
  { id: 1, userName: "John Alexander Thompson", userEmail: "john@example.com", rating: 5, date: "2023-05-15" },
  { id: 2, userName: "Sarah Elizabeth Williams", userEmail: "sarah@example.com", rating: 4, date: "2023-05-20" },
  { id: 3, userName: "David Christopher Johnson", userEmail: "david@example.com", rating: 3, date: "2023-06-01" },
  { id: 4, userName: "Emily Katherine Brown", userEmail: "emily@example.com", rating: 5, date: "2023-06-10" },
  { id: 5, userName: "Michael Benjamin Davis", userEmail: "michael@example.com", rating: 4, date: "2023-06-15" },
]

// Column definitions
const ratingColumns: ColumnDef<any>[] = [
  {
    accessorKey: "userName",
    header: "User",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <Avatar className="h-8 w-8">
          <AvatarFallback>{row.original.userName.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <div className="font-medium">{row.original.userName}</div>
          <div className="text-sm text-muted-foreground">{row.original.userEmail}</div>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "rating",
    header: "Rating",
    cell: ({ row }) => {
      const rating = row.original.rating
      return (
        <div className="flex items-center">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`h-4 w-4 ${i < rating ? "fill-teal-500 text-teal-500" : "fill-muted text-muted-foreground"}`}
            />
          ))}
          <span className="ml-2 font-medium">{rating}/5</span>
        </div>
      )
    },
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => {
      const date = new Date(row.original.date)
      return date.toLocaleDateString()
    },
  },
]

export default function StoreDashboard() {
  // Calculate average rating
  const averageRating = mockRatings.reduce((acc, curr) => acc + curr.rating, 0) / mockRatings.length

  return (
    <StoreLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Store Dashboard</h1>
      </div>

      <div className="grid gap-4 md:grid-cols-2 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <div className="text-2xl font-bold mr-2">{averageRating.toFixed(1)}</div>
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.round(averageRating) ? "fill-teal-500 text-teal-500" : "fill-muted text-muted-foreground"
                    }`}
                  />
                ))}
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-1">Based on {mockRatings.length} ratings</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Reviewers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockRatings.length}</div>
            <p className="text-xs text-muted-foreground">+2 from last month</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>User Ratings</CardTitle>
          <CardDescription>View all ratings submitted for your store</CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable columns={ratingColumns} data={mockRatings} />
        </CardContent>
      </Card>
    </StoreLayout>
  )
}
