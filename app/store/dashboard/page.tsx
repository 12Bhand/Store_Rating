"use client"

import { useEffect, useState } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Star, Users } from "lucide-react"
import StoreLayout from "@/components/layouts/store-layout"
import { DataTable } from "@/components/data-table"
import type { ColumnDef } from "@tanstack/react-table"

// Table columns remain the same
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
              className={`h-4 w-4 ${
                i < rating ? "fill-teal-500 text-teal-500" : "fill-muted text-muted-foreground"
              }`}
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
  const [ratings, setRatings] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Password form state & status
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [status, setStatus] = useState<null | "pending" | "success" | "rejected">(null)

  // Fetch data from API on mount
  useEffect(() => {
    setLoading(true)
    setError(null)
    fetch("http://localhost:3003/strs") // Replace with your real API endpoint
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok")
        return res.json()
      })
      .then((data) => {
        setRatings(data)
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message || "Failed to fetch data")
        setLoading(false)
      })
  }, [])

  // Handle form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("pending")

    if (password !== confirmPassword) {
      setStatus("rejected")
      return
    }

    try {
      const response = await fetch("http://localhost:3003/strs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      })
      const result = await response.json()
      console.log(result);
      
      if (result.success) {
        setStatus("success")
      } else {
        setStatus("rejected")
      }
    } catch (err) {
      setStatus("rejected")
      console.error("Submission error:", err)
    }
  }


  const averageRating =
    ratings.length > 0
      ? ratings.reduce((acc, curr) => acc + curr.rating, 0) / ratings.length
      : 0

  return (
    <StoreLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Store Dashboard</h1>
      </div>

      <form onSubmit={handleSubmit} className="mb-8 flex flex-wrap gap-2 items-center">
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border px-2 py-1"
          required
        />
        <input
          type="password"
          placeholder="Confirm password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="border px-2 py-1"
          required
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-1 rounded">
          Submit
        </button>
        {status && <p className="mt-2 text-sm">Status: {status}</p>}
      </form>

      {loading && <p>Loading ratings...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}

      {!loading && !error && (
        <>
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
                          i < Math.round(averageRating)
                            ? "fill-teal-500 text-teal-500"
                            : "fill-muted text-muted-foreground"
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Based on {ratings.length} ratings
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Reviewers</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{ratings.length}</div>
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
              <DataTable columns={ratingColumns} data={ratings} />
            </CardContent>
          </Card>
        </>
      )}
    </StoreLayout>
  )
}


