"use client"

import { useState } from "react"
import Header from "@/components/Header"
import { InternshipCard } from "@/components/Internship"

// Mock data for internships
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
  // Add more internships as needed
]

const locations = [...new Set(allInternships.map((internship) => internship.location))]
const companies = [...new Set(allInternships.map((internship) => internship.company))]

export default function Internships() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedLocation, setSelectedLocation] = useState("")
  const [selectedCompany, setSelectedCompany] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const internshipsPerPage = 5

  const filteredInternships = allInternships.filter(
    (internship) =>
      internship.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedLocation === "" || internship.location === selectedLocation) &&
      (selectedCompany === "" || internship.company === selectedCompany),
  )

  const indexOfLastInternship = currentPage * internshipsPerPage
  const indexOfFirstInternship = indexOfLastInternship - internshipsPerPage
  const currentInternships = filteredInternships.slice(indexOfFirstInternship, indexOfLastInternship)

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Available Internships</h1>

        <div className="mb-6 flex flex-wrap gap-4">
          <input
            type="text"
            placeholder="Search internships..."
            className="flex-grow p-2 border rounded"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            className="p-2 border rounded"
            onChange={(e) => setSelectedLocation(e.target.value)}
            value={selectedLocation}
          >
            <option value="">All Locations</option>
            {locations.map((location) => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </select>
          <select
            className="p-2 border rounded"
            onChange={(e) => setSelectedCompany(e.target.value)}
            value={selectedCompany}
          >
            <option value="">All Companies</option>
            {companies.map((company) => (
              <option key={company} value={company}>
                {company}
              </option>
            ))}
          </select>
        </div>

        <div className="grid gap-6">
          {currentInternships.map((internship) => (
            <InternshipCard key={internship.id} {...internship} />
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          {Array.from({ length: Math.ceil(filteredInternships.length / internshipsPerPage) }, (_, i) => (
            <button
              key={i}
              onClick={() => paginate(i + 1)}
              className={`mx-1 px-3 py-1 rounded ${currentPage === i + 1 ? "bg-blue-600 text-white" : "bg-gray-200"}`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </main>
    </div>
  )
}

