"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"

export default function Apply() {
  const searchParams = useSearchParams()
  const internshipId = searchParams.get("id")

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    university: "",
    course: "",
    graduationYear: "",
    coverLetter: "",
    resume: null as File | null,
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData((prev) => ({ ...prev, resume: e.target.files![0] }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    if (!formData.name) newErrors.name = "Name is required"
    if (!formData.email) newErrors.email = "Email is required"
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = "Invalid email format"
    if (!formData.phone) newErrors.phone = "Phone number is required"
    if (!formData.university) newErrors.university = "University is required"
    if (!formData.course) newErrors.course = "Course is required"
    if (!formData.graduationYear) newErrors.graduationYear = "Graduation year is required"
    if (!formData.coverLetter) newErrors.coverLetter = "Cover letter is required"
    if (!formData.resume) newErrors.resume = "Resume is required"
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      // Here you would typically send the form data to your backend
      console.log("Form submitted:", { ...formData, internshipId })
      alert("Application submitted successfully!")
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Apply for Internship</h1>
      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Full Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-600 focus:ring focus:ring-blue-600 focus:ring-opacity-50"
          />
          {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-600 focus:ring focus:ring-blue-600 focus:ring-opacity-50"
          />
          {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-600 focus:ring focus:ring-blue-600 focus:ring-opacity-50"
          />
          {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
        </div>
        <div>
          <label htmlFor="university" className="block text-sm font-medium text-gray-700">
            University
          </label>
          <input
            type="text"
            id="university"
            name="university"
            value={formData.university}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-600 focus:ring focus:ring-blue-600 focus:ring-opacity-50"
          />
          {errors.university && <p className="mt-1 text-sm text-red-600">{errors.university}</p>}
        </div>
        <div>
          <label htmlFor="course" className="block text-sm font-medium text-gray-700">
            Course of Study
          </label>
          <input
            type="text"
            id="course"
            name="course"
            value={formData.course}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-600 focus:ring focus:ring-blue-600 focus:ring-opacity-50"
          />
          {errors.course && <p className="mt-1 text-sm text-red-600">{errors.course}</p>}
        </div>
        <div>
          <label htmlFor="graduationYear" className="block text-sm font-medium text-gray-700">
            Expected Graduation Year
          </label>
          <input
            type="text"
            id="graduationYear"
            name="graduationYear"
            value={formData.graduationYear}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-600 focus:ring focus:ring-blue-600 focus:ring-opacity-50"
          />
          {errors.graduationYear && <p className="mt-1 text-sm text-red-600">{errors.graduationYear}</p>}
        </div>
        <div>
          <label htmlFor="coverLetter" className="block text-sm font-medium text-gray-700">
            Cover Letter
          </label>
          <textarea
            id="coverLetter"
            name="coverLetter"
            rows={4}
            value={formData.coverLetter}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-600 focus:ring focus:ring-blue-600 focus:ring-opacity-50"
          ></textarea>
          {errors.coverLetter && <p className="mt-1 text-sm text-red-600">{errors.coverLetter}</p>}
        </div>
        <div>
          <label htmlFor="resume" className="block text-sm font-medium text-gray-700">
            Resume (PDF)
          </label>
          <input
            type="file"
            id="resume"
            name="resume"
            accept=".pdf"
            onChange={handleFileChange}
            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700"
          />
          {errors.resume && <p className="mt-1 text-sm text-red-600">{errors.resume}</p>}
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-blue-700 transition-colors"
        >
          Submit Application
        </button>
      </form>
    </div>
  )
}

