"use client"

import { useState } from "react"
import Link from "next/link"

// Mock data for company internships
const mockInternships = [
  { id: 1, title: "Software Developer Intern", applicants: 15, status: "Active", deadline: "2023-08-31" },
  { id: 2, title: "Marketing Intern", applicants: 8, status: "Closed", deadline: "2023-07-15" },
  { id: 3, title: "Data Analyst Intern", applicants: 12, status: "Active", deadline: "2023-09-30" },
]

export default function CompanyDashboard() {
  const [internships, setInternships] = useState(mockInternships)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Company Dashboard</h1>
        <Link
          href="/company/create-internship"
          className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-blue-700 transition-colors"
        >
          Create New Internship
        </Link>
      </div>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="px-4 py-5 sm:px-6">
          <h2 className="text-lg leading-6 font-medium text-gray-900">Your Internship Listings</h2>
        </div>
        <div className="border-t border-gray-200">
          <ul className="divide-y divide-gray-200">
            {internships.map((internship) => (
              <li key={internship.id} className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium text-blue-600 truncate">{internship.title}</div>
                  <div className="ml-2 flex-shrink-0 flex">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${internship.status === "Active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
                    >
                      {internship.status}
                    </span>
                  </div>
                </div>
                <div className="mt-2 sm:flex sm:justify-between">
                  <div className="sm:flex">
                    <p className="flex items-center text-sm text-gray-500">{internship.applicants} applicants</p>
                  </div>
                  <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                    <p>Deadline: {internship.deadline}</p>
                  </div>
                </div>
                <div className="mt-2 flex space-x-2">
                  <Link
                    href={`/company/internship/${internship.id}`}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    View Details
                  </Link>
                  <Link
                    href={`/company/internship/${internship.id}/applicants`}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    View Applicants
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

