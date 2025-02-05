"use client"

import { useState } from "react"
import Link from "next/link"
import { Plus, Users, Calendar, ExternalLink, Eye, ChevronRight } from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

// Mock data for company internships
const mockInternships = [
  { 
    id: 1, 
    title: "Software Developer Intern", 
    applicants: 15, 
    status: "Active", 
    deadline: "2023-08-31",
    department: "Engineering",
    location: "Accra"
  },
  { 
    id: 2, 
    title: "Marketing Intern", 
    applicants: 8, 
    status: "Closed", 
    deadline: "2023-07-15",
    department: "Marketing",
    location: "Kumasi"
  },
  { 
    id: 3, 
    title: "Data Analyst Intern", 
    applicants: 12, 
    status: "Active", 
    deadline: "2023-09-30",
    department: "Analytics",
    location: "Tema"
  },
]

export default function CompanyDashboard() {
  const [internships, setInternships] = useState(mockInternships)
  
  // Calculate dashboard stats
  const activeInternships = internships.filter(i => i.status === "Active").length
  const totalApplicants = internships.reduce((sum, i) => sum + i.applicants, 0)
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Company Dashboard</h1>
            <p className="text-gray-500 mt-1">Manage your internship listings and applicants</p>
          </div>
          <Link href="/company/create-internship">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create New Internship
            </Button>
          </Link>
        </div>

        {/* Stats Overview */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Internships</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{activeInternships}</div>
              <p className="text-xs text-muted-foreground">
                Currently accepting applications
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Applicants</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalApplicants}</div>
              <p className="text-xs text-muted-foreground">
                Across all internships
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Next Deadline</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Aug 31</div>
              <p className="text-xs text-muted-foreground">
                Software Developer Intern
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Internship Listings */}
        <Card>
          <CardHeader>
            <CardTitle>Your Internship Listings</CardTitle>
            <CardDescription>
              View and manage all your internship postings
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="divide-y divide-gray-200">
              {internships.map((internship) => (
                <div 
                  key={internship.id} 
                  className="py-4 first:pt-0 last:pb-0"
                >
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">{internship.title}</h3>
                        <Badge variant={internship.status === "Active" ? "default" : "secondary"}>
                          {internship.status}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span>{internship.department}</span>
                        <span>•</span>
                        <span>{internship.location}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/company/internship/${internship.id}`}>
                          <Eye className="mr-2 h-4 w-4" />
                          Details
                        </Link>
                      </Button>
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/company/internship/${internship.id}/applicants`}>
                          <Users className="mr-2 h-4 w-4" />
                          Applicants ({internship.applicants})
                        </Link>
                      </Button>
                    </div>
                  </div>
                  <div className="mt-2 flex items-center text-sm text-gray-500">
                    <Calendar className="mr-2 h-4 w-4" />
                    Application Deadline: {internship.deadline}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}