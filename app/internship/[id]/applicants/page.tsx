"use client"

import { useState } from "react"
import { useParams } from "next/navigation"

// Mock data for applicants
const mockApplicants = [
  { id: 1, name: "John Doe", email: "john@example.com", university: "University of Ghana", status: "Pending" },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    university: "Kwame Nkrumah University",
    status: "Interviewed",
  },
  { id: 3, name: "Bob Johnson", email: "bob@example.com", university: "Ashesi University", status: "Rejected" },
]

export default function InternshipApplicants() {
  const params = useParams()
  const internshipId = params.id
  const [applicants, setApplicants] = useState(mockApplicants)

  const handleStatusChange = (applicantId: number, newStatus: string) => {
    setApplicants((prevApplicants) =>
      prevApplicants.map((applicant) =>
        applicant.id === applicantId ? { ...applicant, status: newStatus } : applicant,
      ),
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Applicants for Internship #{internshipId}</h1>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                University
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {applicants.map((applicant) => (
              <tr key={applicant.id}>
                <td className="px-6 py-4 whitespace-nowrap">{applicant.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{applicant.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">{applicant.university}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                    ${
                      applicant.status === "Pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : applicant.status === "Interviewed"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-red-100 text-red-800"
                    }`}
                  >
                    {applicant.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <select
                    value={applicant.status}
                    onChange={(e) => handleStatusChange(applicant.id, e.target.value)}
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Interviewed">Interviewed</option>
                    <option value="Rejected">Rejected</option>
                    <option value="Accepted">Accepted</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

