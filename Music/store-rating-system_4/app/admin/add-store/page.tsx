"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import AdminLayout from "@/components/layouts/admin-layout"

export default function AddStorePage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    ownerName: "",
    ownerEmail: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    // Store name validation: Min 20 characters, Max 60 characters
    if (formData.name.length < 20) {
      newErrors.name = "Store name must be at least 20 characters"
    } else if (formData.name.length > 60) {
      newErrors.name = "Store name must not exceed 60 characters"
    }

    // Address validation: Max 400 characters
    if (formData.address.length > 400) {
      newErrors.address = "Address must not exceed 400 characters"
    }

    // Owner name validation: Min 20 characters, Max 60 characters
    if (formData.ownerName.length < 20) {
      newErrors.ownerName = "Owner name must be at least 20 characters"
    } else if (formData.ownerName.length > 60) {
      newErrors.ownerName = "Owner name must not exceed 60 characters"
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid store email address"
    }

    if (!emailRegex.test(formData.ownerEmail)) {
      newErrors.ownerEmail = "Please enter a valid owner email address"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsLoading(true)

    try {
      // In a real app, this would be an API call to create the store
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Store created",
        description: `${formData.name} has been added to the system.`,
      })

      router.push("/admin/dashboard")
    } catch (error) {
      toast({
        title: "Failed to create store",
        description: "There was a problem creating the store.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AdminLayout>
      <div className="mx-auto max-w-2xl">
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">Add New Store</CardTitle>
            <CardDescription>Create a new store in the system</CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Store Name</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Grocery Supermarket Plus"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
                {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Store Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="store@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Store Address</Label>
                <Textarea
                  id="address"
                  name="address"
                  placeholder="123 Main St, City, Country"
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
                {errors.address && <p className="text-sm text-destructive">{errors.address}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="ownerName">Owner Name</Label>
                <Input
                  id="ownerName"
                  name="ownerName"
                  placeholder="John Alexander Thompson"
                  value={formData.ownerName}
                  onChange={handleChange}
                  required
                />
                {errors.ownerName && <p className="text-sm text-destructive">{errors.ownerName}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="ownerEmail">Owner Email</Label>
                <Input
                  id="ownerEmail"
                  name="ownerEmail"
                  type="email"
                  placeholder="owner@example.com"
                  value={formData.ownerEmail}
                  onChange={handleChange}
                  required
                />
                {errors.ownerEmail && <p className="text-sm text-destructive">{errors.ownerEmail}</p>}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button type="button" variant="outline" onClick={() => router.push("/admin/dashboard")}>
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Creating..." : "Create Store"}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </AdminLayout>
  )
}
