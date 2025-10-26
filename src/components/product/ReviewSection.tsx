import { useState } from "react"
import { motion } from "framer-motion"
import { Star, ThumbsUp, HelpCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { StarRating } from "@/components/common/StarRating"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

interface Review {
  id: string
  userName: string
  rating: number
  date: string
  comment: string
  verified: boolean
  helpful: number
}

const mockReviews: Review[] = [
  {
    id: "1",
    userName: "Ahmet Yılmaz",
    rating: 5,
    date: "15 days ago",
    comment: "Excellent quality! The noise cancellation is outstanding and the battery life is great. Very comfortable to wear for long periods.",
    verified: true,
    helpful: 12,
  },
  {
    id: "2",
    userName: "Mehmet Kaya",
    rating: 4,
    date: "1 month ago",
    comment: "Good headphones overall. Sound quality is clear and balanced. The only downside is the price is a bit high, but worth it for the quality.",
    verified: true,
    helpful: 8,
  },
  {
    id: "3",
    userName: "Ayşe Demir",
    rating: 5,
    date: "2 months ago",
    comment: "Love these headphones! The design is stylish and the functionality is top-notch. Would definitely recommend!",
    verified: false,
    helpful: 5,
  },
  {
    id: "4",
    userName: "Can Özkan",
    rating: 3,
    date: "2 months ago",
    comment: "Decent headphones but the build quality could be better. Sound is good though.",
    verified: true,
    helpful: 3,
  },
]

export function ReviewSection({ reviewCount }: { reviewCount: number }) {
  const [selectedFilter, setSelectedFilter] = useState<number | null>(null)
  const [isWriting, setIsWriting] = useState(false)
  const [newReview, setNewReview] = useState({
    rating: 5,
    comment: "",
  })

  const filteredReviews =
    selectedFilter === null
      ? mockReviews
      : mockReviews.filter((r) => r.rating === selectedFilter)

  const ratingDistribution = {
    5: mockReviews.filter((r) => r.rating === 5).length,
    4: mockReviews.filter((r) => r.rating === 4).length,
    3: mockReviews.filter((r) => r.rating === 3).length,
    2: mockReviews.filter((r) => r.rating === 2).length,
    1: mockReviews.filter((r) => r.rating === 1).length,
  }

  const averageRating =
    mockReviews.reduce((sum, r) => sum + r.rating, 0) / mockReviews.length

  return (
    <div className="space-y-6">
      {/* Rating Summary */}
      <div className="rounded-lg border p-6 bg-muted/30">
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <div className="mb-4">
              <div className="text-5xl font-bold mb-2">{averageRating.toFixed(1)}</div>
              <StarRating rating={averageRating} maxRating={5} />
              <p className="text-sm text-muted-foreground mt-2">
                Based on {reviewCount} reviews
              </p>
            </div>
          </div>

          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map((star) => {
              const count = ratingDistribution[star as keyof typeof ratingDistribution]
              const percentage = (count / mockReviews.length) * 100

              return (
                <button
                  key={star}
                  onClick={() => setSelectedFilter(selectedFilter === star ? null : star)}
                  className="flex items-center gap-2 w-full text-left hover:bg-muted p-2 rounded transition-colors"
                >
                  <div className="flex items-center gap-1 w-20">
                    <span className="text-sm font-medium">{star}</span>
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  </div>
                  <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-yellow-400 transition-all"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span className="text-sm text-muted-foreground w-12">{count}</span>
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Write Review Button */}
      {!isWriting && (
        <Button onClick={() => setIsWriting(true)} className="w-full sm:w-auto">
          Write a Review
        </Button>
      )}

      {/* Write Review Form */}
      {isWriting && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-lg border p-6 space-y-4"
        >
          <h3 className="font-semibold mb-4">Write Your Review</h3>
          
          <div>
            <label className="text-sm font-medium mb-2 block">Rating</label>
            <StarRating
              rating={newReview.rating}
              maxRating={5}
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Your Review</label>
            <Textarea
              placeholder="Share your experience..."
              value={newReview.comment}
              onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
              rows={4}
            />
          </div>

          <div className="flex gap-2">
            <Button onClick={() => setIsWriting(false)} variant="outline">
              Cancel
            </Button>
            <Button onClick={() => setIsWriting(false)}>Submit Review</Button>
          </div>
        </motion.div>
      )}

      {/* Reviews List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">
            Customer Reviews {selectedFilter && `(${selectedFilter} Stars)`}
          </h3>
          {selectedFilter && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSelectedFilter(null)}
            >
              Clear Filter
            </Button>
          )}
        </div>

        {filteredReviews.map((review, index) => (
          <motion.div
            key={review.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="rounded-lg border p-4 space-y-3"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {review.userName.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-semibold">{review.userName}</p>
                    {review.verified && (
                      <Badge variant="secondary" className="text-xs">
                        Verified Purchase
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <StarRating rating={review.rating} maxRating={5} />
                    <span className="text-sm text-muted-foreground">{review.date}</span>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-sm">{review.comment}</p>

            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                className="h-8 text-xs"
                onClick={() => {
                  // Handle helpful
                }}
              >
                <ThumbsUp className="mr-1 h-3 w-3" />
                Helpful ({review.helpful})
              </Button>
              {review.verified && (
                <Badge variant="outline" className="text-xs">
                  <HelpCircle className="mr-1 h-3 w-3" />
                  Verified
                </Badge>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

