"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function Newsletter() {
  const [email, setEmail] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setEmail("")
  }

  return (
    <div className="mt-12 py-8 border-t">
      <div className="max-w-md mx-auto text-center">
        <h2 className="text-2xl font-semibold mb-2">Get new remote jobs sent to your inbox</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4">Be the first to know about new remote opportunities</p>
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            type="email"
            placeholder="Type your email..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="flex-1"
          />
          <Button type="submit">Subscribe</Button>
        </form>
      </div>
    </div>
  )
}

