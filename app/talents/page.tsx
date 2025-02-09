"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Briefcase, MapPin } from "lucide-react"

// Mock data for job seekers
const jobSeekers = [
  {
    id: 1,
    name: "Alice Johnson",
    title: "Full Stack Developer",
    skills: ["React", "Node.js", "Python", "MongoDB"],
    experience: "5 years",
    location: "San Francisco, CA",
    avatar: "/placeholder.svg?height=400&width=400",
  },
  {
    id: 2,
    name: "Bob Smith",
    title: "UX Designer",
    skills: ["Figma", "Adobe XD", "Sketch", "User Research"],
    experience: "3 years",
    location: "New York, NY",
    avatar: "/placeholder.svg?height=400&width=400",
  },
  {
    id: 3,
    name: "Charlie Brown",
    title: "Data Scientist",
    skills: ["Python", "R", "Machine Learning", "SQL"],
    experience: "4 years",
    location: "Seattle, WA",
    avatar: "/placeholder.svg?height=400&width=400",
  },
  {
    id: 4,
    name: "Diana Prince",
    title: "DevOps Engineer",
    skills: ["Docker", "Kubernetes", "AWS", "CI/CD"],
    experience: "6 years",
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
    <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-4 text-gray-800">Discover Top Talents</h2>
        <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
          Find the perfect candidate for your team from our pool of highly skilled professionals.
        </p>
        <div className="relative max-w-md mx-auto mb-12">
          <Input
            type="text"
            placeholder="Search by name, skill, or job title"
            className="pl-10 pr-4 py-2 w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredJobSeekers.map((seeker) => (
            <Card key={seeker.id} className="overflow-hidden hover:shadow-xl transition-shadow duration-300 bg-white">
              <CardHeader className="p-0">
                <div className="relative h-48 bg-gradient-to-r from-blue-400 to-indigo-500">
                  <Avatar className="absolute left-4 bottom-0 transform translate-y-1/2 h-24 w-24 border-4 border-white">
                    <AvatarImage src={seeker.avatar} alt={seeker.name} />
                    <AvatarFallback>
                      {seeker.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                </div>
              </CardHeader>
              <CardContent className="pt-16 pb-6">
                <CardTitle className="text-xl font-semibold mb-1">{seeker.name}</CardTitle>
                <p className="text-gray-600 mb-3 flex items-center">
                  <Briefcase size={16} className="mr-1" /> {seeker.title}
                </p>
                <p className="text-gray-600 mb-4 flex items-center">
                  <MapPin size={16} className="mr-1" /> {seeker.location}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {seeker.skills.map((skill, index) => (
                    <Badge key={index} variant="secondary" className="bg-blue-100 text-blue-800">
                      {skill}
                    </Badge>
                  ))}
                </div>
                <p className="text-sm text-gray-600 mb-4">Experience: {seeker.experience}</p>
                <Button className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 transition-all duration-300">
                  View Profile
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HireTalents

