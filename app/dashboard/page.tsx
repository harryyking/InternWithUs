"use client"

import { useState } from "react"

// Mock data for applications
const mockApplications = [
  { id: 1, company: "TechGhana", position: "Software Developer Intern", status: "Pending", appliedDate: "2023-07-15" },
  { id: 2, company: "GhanaMedia", position: "Marketing Intern", status: "Rejected", appliedDate: "2023-07-10" },
  { id: 3, company: "DataSolutions", position: "Data Analyst Intern", status: "Interview", appliedDate: "2023-07-05" },
]

export default function Dashboard() {
  const [applications, setApplications] = useState(mockApplications)

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Student Dashboard</h1>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="px-4 py-5 sm:px-6">
          <h2 className="text-lg leading-6 font-medium text-gray-900">Your Applications</h2>
        </div>
        <div className="border-t border-gray-200">
          <ul className="divide-y divide-gray-200">
            {applications.map((application) => (
              <li key={application.id} className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium text-blue-600 truncate">
                    {application.position} at {application.company}
                  </div>
                  <div className="ml-2 flex-shrink-0 flex">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${
                        application.status === "Pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : application.status === "Rejected"
                            ? "bg-red-100 text-red-800"
                            : "bg-green-100 text-green-800"
                      }`}
                    >
                      {application.status}
                    </span>
                  </div>
                </div>
                <div className="mt-2 sm:flex sm:justify-between">
                  <div className="sm:flex">
                    <p className="flex items-center text-sm text-gray-500">Applied on {application.appliedDate}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

