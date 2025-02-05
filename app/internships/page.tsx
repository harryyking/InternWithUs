"use client"

import { useState } from "react"
import { Search, MapPin, Building2 } from "lucide-react"
import { InternshipCard } from "@/components/Internship"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

// Mock data remains the same
const allInternships = [
  {
    id: 1,
    title: "Software Developer Intern",
    company: "TechGhana",
    location: "Accra",
    description: "Join our team to develop cutting-edge web applications.",
    duration: "3 months",
    deadline: "2023-08-31",
  },
  {
    id: 2,
    title: "Marketing Intern",
    company: "GhanaMedia",
    location: "Kumasi",
    description: "Help us create engaging content for our social media platforms.",
    duration: "6 months",
    deadline: "2023-09-15",
  },
  {
    id: 3,
    title: "Data Analyst Intern",
    company: "DataSolutions",
    location: "Tema",
    description: "Assist in analyzing and visualizing complex datasets.",
    duration: "4 months",
    deadline: "2023-08-20",
  },
  {
    id: 4,
    title: "UX Design Intern",
    company: "DesignHub",
    location: "Accra",
    description: "Create user-centered designs for mobile and web applications.",
    duration: "3 months",
    deadline: "2023-09-30",
  },
  {
    id: 5,
    title: "Finance Intern",
    company: "GhanaBank",
    location: "Accra",
    description: "Gain hands-on experience in financial analysis and reporting.",
    duration: "6 months",
    deadline: "2023-10-15",
  },
]

const locations = [...new Set(allInternships.map((internship) => internship.location))]
const companies = [...new Set(allInternships.map((internship) => internship.company))]

export default function Internships() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedLocation, setSelectedLocation] = useState("")
  const [selectedCompany, setSelectedCompany] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const internshipsPerPage = 6

  const filteredInternships = allInternships.filter(
    (internship) =>
      internship.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedLocation === "" || internship.location === selectedLocation) &&
      (selectedCompany === "" || internship.company === selectedCompany)
  )

  const indexOfLastInternship = currentPage * internshipsPerPage
  const indexOfFirstInternship = indexOfLastInternship - internshipsPerPage
  const currentInternships = filteredInternships.slice(
    indexOfFirstInternship,
    indexOfLastInternship
  )

  const totalPages = Math.ceil(filteredInternships.length / internshipsPerPage)
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

  const clearFilters = () => {
    setSearchTerm("")
    setSelectedLocation("")
    setSelectedCompany("")
    setCurrentPage(1)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-4 py-8 space-y-8">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-gray-900">Available Internships</h1>
          <p className="text-gray-500">Find your perfect internship opportunity</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white p-6 rounded-lg shadow-sm space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                value={searchTerm}
                placeholder="Search by title..."
                className="pl-9 pr-4 py-2"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <Select
              value={selectedLocation}
              onValueChange={setSelectedLocation}
            >
              <SelectTrigger className="w-full md:w-[200px]">
                <MapPin className="mr-2 h-4 w-4" />
                <SelectValue placeholder="All Locations" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Locations</SelectItem>
                {locations.map((location) => (
                  <SelectItem key={location} value={location}>
                    {location}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={selectedCompany}
              onValueChange={setSelectedCompany}
            >
              <SelectTrigger className="w-full md:w-[200px]">
                <Building2 className="mr-2 h-4 w-4" />
                <SelectValue placeholder="All Companies" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Companies</SelectItem>
                {companies.map((company) => (
                  <SelectItem key={company} value={company}>
                    {company}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {(searchTerm || selectedLocation || selectedCompany) && (
              <Button
                variant="outline"
                onClick={clearFilters}
                className="w-full md:w-auto"
              >
                Clear Filters
              </Button>
            )}
          </div>

          <div className="text-sm text-gray-500">
            Showing {currentInternships.length} of {filteredInternships.length} internships
          </div>
        </div>

        {/* Internship Cards */}
        {currentInternships.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {currentInternships.map((internship) => (
              <InternshipCard key={internship.id} {...internship} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-lg font-semibold text-gray-900">No internships found</h3>
            <p className="text-gray-500">Try adjusting your search or filters</p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-2">
            <Button
              variant="outline"
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            
            <div className="flex gap-1">
              {Array.from({ length: totalPages }, (_, i) => (
                <Button
                  key={i}
                  variant={currentPage === i + 1 ? "default" : "outline"}
                  onClick={() => paginate(i + 1)}
                  className="w-10"
                >
                  {i + 1}
                </Button>
              ))}
            </div>

            <Button
              variant="outline"
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        )}
      </main>
    </div>
  )
}