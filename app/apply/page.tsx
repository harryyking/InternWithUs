"use client"

import { useState, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { Upload, Loader2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

export default function Apply() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    }>
      <ApplyForm />
    </Suspense>
  )
}

function ApplyForm() {
  const searchParams = useSearchParams()
  const internshipId = searchParams.get("id")
  const [isSubmitting, setIsSubmitting] = useState(false)

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
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        setErrors(prev => ({ ...prev, resume: "File size should be less than 5MB" }))
        return
      }
      setFormData((prev) => ({ ...prev, resume: file }))
      if (errors.resume) {
        setErrors((prev) => {
          const newErrors = { ...prev }
          delete newErrors.resume
          return newErrors
        })
      }
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      setIsSubmitting(true)
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500))
        console.log("Form submitted:", { ...formData, internshipId })
        alert("Application submitted successfully!")
      } catch (error) {
        console.error("Error submitting form:", error)
        alert("There was an error submitting your application. Please try again.")
      } finally {
        setIsSubmitting(false)
      }
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Internship Application</CardTitle>
          <CardDescription>
            Please fill in all the required fields to submit your application
          </CardDescription>
        </CardHeader>
        
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            {/* Personal Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Personal Information</h3>
              
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your full name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={errors.name ? "border-red-500" : ""}
                  />
                </FormControl>
                {errors.name && <FormMessage>{errors.name}</FormMessage>}
              </FormItem>

              <div className="grid gap-4 sm:grid-cols-2">
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="your.email@example.com"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={errors.email ? "border-red-500" : ""}
                    />
                  </FormControl>
                  {errors.email && <FormMessage>{errors.email}</FormMessage>}
                </FormItem>

                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input
                      type="tel"
                      placeholder="+233 XX XXX XXXX"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={errors.phone ? "border-red-500" : ""}
                    />
                  </FormControl>
                  {errors.phone && <FormMessage>{errors.phone}</FormMessage>}
                </FormItem>
              </div>
            </div>

            {/* Education */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Education</h3>
              
              <FormItem>
                <FormLabel>University</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your university name"
                    name="university"
                    value={formData.university}
                    onChange={handleInputChange}
                    className={errors.university ? "border-red-500" : ""}
                  />
                </FormControl>
                {errors.university && <FormMessage>{errors.university}</FormMessage>}
              </FormItem>

              <div className="grid gap-4 sm:grid-cols-2">
                <FormItem>
                  <FormLabel>Course of Study</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Your course/program"
                      name="course"
                      value={formData.course}
                      onChange={handleInputChange}
                      className={errors.course ? "border-red-500" : ""}
                    />
                  </FormControl>
                  {errors.course && <FormMessage>{errors.course}</FormMessage>}
                </FormItem>

                <FormItem>
                  <FormLabel>Expected Graduation Year</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="YYYY"
                      name="graduationYear"
                      value={formData.graduationYear}
                      onChange={handleInputChange}
                      className={errors.graduationYear ? "border-red-500" : ""}
                    />
                  </FormControl>
                  {errors.graduationYear && <FormMessage>{errors.graduationYear}</FormMessage>}
                </FormItem>
              </div>
            </div>

            {/* Application Details */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Application Details</h3>
              
              <FormItem>
                <FormLabel>Cover Letter</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Tell us why you're interested in this internship..."
                    name="coverLetter"
                    value={formData.coverLetter}
                    onChange={handleInputChange}
                    className={`min-h-[150px] ${errors.coverLetter ? "border-red-500" : ""}`}
                  />
                </FormControl>
                {errors.coverLetter && <FormMessage>{errors.coverLetter}</FormMessage>}
              </FormItem>

              <FormItem>
                <FormLabel>Resume (PDF)</FormLabel>
                <FormControl>
                  <div className="flex items-center justify-center w-full">
                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="w-8 h-8 mb-2 text-gray-500" />
                        <p className="mb-2 text-sm text-gray-500">
                          <span className="font-semibold">Click to upload</span> or drag and drop
                        </p>
                        <p className="text-xs text-gray-500">PDF (MAX. 5MB)</p>
                      </div>
                      <input
                        type="file"
                        className="hidden"
                        accept=".pdf"
                        onChange={handleFileChange}
                      />
                    </label>
                  </div>
                </FormControl>
                {formData.resume && (
                  <p className="text-sm text-gray-500">
                    Selected file: {formData.resume.name}
                  </p>
                )}
                {errors.resume && <FormMessage>{errors.resume}</FormMessage>}
              </FormItem>
            </div>
          </CardContent>

          <CardFooter>
            <Button 
              type="submit" 
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                "Submit Application"
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}