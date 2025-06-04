"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface StoreCardProps {
  store: {
    id: number
    name: string
    address: string
    rating: number
    userRating: number | null
  }
}

export function StoreCard({ store }: StoreCardProps) {
  const [userRating, setUserRating] = useState<number | null>(store.userRating)
  const [tempRating, setTempRating] = useState<number | null>(store.userRating)
  const [hoverRating, setHoverRating] = useState<number | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const { toast } = useToast()

  const handleRatingSubmit = () => {
    setUserRating(tempRating)
    setIsDialogOpen(false)

    toast({
      title: "Rating submitted",
      description: `You rated ${store.name} ${tempRating} out of 5 stars.`,
    })
  }

  const gradients = [
    "from-teal-500 to-cyan-600",
    "from-cyan-500 to-sky-600",
    "from-sky-500 to-blue-600",
    "from-emerald-500 to-teal-600",
    "from-blue-500 to-indigo-600",
    "from-teal-500 to-emerald-600",
  ]

  const randomGradient = gradients[store.id % gradients.length]

  return (
    <Card className="overflow-hidden border-0 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:translate-y-[-5px] group">
         <CardContent className="p-6">
        <div className="flex justify-between items-center">
          <div>
            <div className="text-sm font-medium text-gray-500 mb-1">Overall Rating</div>
            <div className="flex items-center">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg
                  key={i}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className={`h-6 w-6 ${
                    i < Math.round(store.rating) ? "text-yellow-500" : "text-gray-200"
                  }`}
                >
                  <path
                    fillRule="evenodd"
                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 
                    5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 
                    1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 
                    7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273
                    -4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 
                    2.082-5.007z"
                    clipRule="evenodd"
                  />
                </svg>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
      <div className={`h-32 bg-gradient-to-r ${randomGradient} relative`}>
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
        <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/60 to-transparent">
          <h3 className="text-xl font-bold text-white truncate">{store.name}</h3>
          <div className="flex items-center text-white/80 text-sm mt-1">
            <MapPin className="h-4 w-4 mr-1" />
            <span className="truncate">{store.address}</span>
          </div>
        </div>
      </div>
    </Card>
  )
}
