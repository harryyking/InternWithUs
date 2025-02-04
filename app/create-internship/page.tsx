"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function CreateInternship() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    duration: "",
    deadline: "",
    requirements: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the form data to your backend
    console.log("Internship created:", formData)
    alert("Internship created successfully!")
    router.push("/company/dashboard")
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Create New Internship</h1>
      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Internship Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            required
            value={formData.title}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-600 focus:ring focus:ring-blue-600 focus:ring-opacity-50"
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows={4}
            required
            value={formData.description}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-600 focus:ring focus:ring-blue-600 focus:ring-opacity-50"
          ></textarea>
        </div>
        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-700">
            Location
          </label>
          <input
            type="text"
            id="location"
            name="location"
            required
            value={formData.location}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-600 focus:ring focus:ring-blue-600 focus:ring-opacity-50"
          />
        </div>
        <div>
          <label htmlFor="duration" className="block text-sm font-medium text-gray-700">
            Duration
          </label>
          <input
            type="text"
            id="duration"
            name="duration"
            required
            value={formData.duration}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-600 focus:ring focus:ring-blue-600 focus:ring-opacity-50"
          />
        </div>
        <div>
          <label htmlFor="deadline" className="block text-sm font-medium text-gray-700">
            Application Deadline
          </label>
          <input
            type="date"
            id="deadline"
            name="deadline"
            required
            value={formData.deadline}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-600 focus:ring focus:ring-blue-600 focus:ring-opacity-50"
          />
        </div>
        <div>
          <label htmlFor="requirements" className="block text-sm font-medium text-gray-700">
            Requirements
          </label>
          <textarea
            id="requirements"
            name="requirements"
            rows={4}
            required
            value={formData.requirements}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-600 focus:ring focus:ring-blue-600 focus:ring-opacity-50"
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-blue-700 transition-colors"
        >
          Create Internship
        </button>
      </form>
    </div>
  )
}

