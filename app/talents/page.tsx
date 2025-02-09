"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

// Mock data for job seekers
const jobSeekers = [
  {
    id: 1,
    name: "Alice Johnson",
    title: "Full Stack Developer",
    skills: ["React", "Node.js", "Python", "MongoDB"],
    location: "San Francisco, CA",
    avatar: "/placeholder.svg?height=400&width=400",
  },
  {
    id: 2,
    name: "Bob Smith",
    title: "UX Designer",
    skills: ["Figma", "Adobe XD", "Sketch", "User Research"],
    location: "New York, NY",
    avatar: "/placeholder.svg?height=400&width=400",
  },
  {
    id: 3,
    name: "Charlie Brown",
    title: "Data Scientist",
    skills: ["Python", "R", "Machine Learning", "SQL"],
    location: "Seattle, WA",
    avatar: "/placeholder.svg?height=400&width=400",
  },
  {
    id: 4,
    name: "Diana Prince",
    title: "DevOps Engineer",
    skills: ["Docker", "Kubernetes", "AWS", "CI/CD"],
    location: "Austin, TX",
    avatar: "/placeholder.svg?height=400&width=400",
  },
]

const HireTalents: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredJobSeekers = jobSeekers.filter(
    (seeker) =>
      seeker.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      seeker.skills.some((skill) => skill.toLowerCase().includes(searchTerm.toLowerCase())) ||
      seeker.title.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <section className="py-16 bg-rose-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-4 text-rose-900">🌟 Discover Top Talents</h2>
        <p className="text-center text-rose-700 mb-8 max-w-2xl mx-auto">
          Find the perfect candidate for your team from our pool of highly skilled professionals.
        </p>
        <div className="relative max-w-md mx-auto mb-12">
          <Input
            type="text"
            placeholder="Search by name, skill, or job title"
            className="pl-10 pr-4 py-2 w-full border-rose-300 focus:border-rose-500 focus:ring-rose-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-rose-400">🔍</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredJobSeekers.map((seeker) => (
            <Card
              key={seeker.id}
              className="overflow-hidden hover:shadow-lg transition-shadow duration-300 bg-white border-rose-200"
            >
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Avatar className="h-16 w-16 mr-4">
                    <AvatarImage src={seeker.avatar} alt={seeker.name} />
                    <AvatarFallback>
                      {seeker.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-lg font-semibold text-rose-900">{seeker.name}</h3>
                    <p className="text-rose-600">{seeker.title}</p>
                  </div>
                </div>
                <p className="text-rose-700 mb-4 flex items-center">
                  <span className="mr-2">📍</span> {seeker.location}
                </p>
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-rose-800 mb-2">Skills:</h4>
                  <div className="flex flex-wrap gap-2">
                    {seeker.skills.map((skill, index) => (
                      <Badge key={index} variant="secondary" className="bg-rose-100 text-rose-800">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
                <Button className="w-full bg-rose-500 hover:bg-rose-600 text-white">View Profile</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HireTalents

