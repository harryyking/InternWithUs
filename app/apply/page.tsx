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



  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Internship Application</CardTitle>
          <CardDescription>
            Please fill in all the required fields to submit your application
          </CardDescription>
        </CardHeader>
        
        <form>
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
                  />
                </FormControl>
              
              </FormItem>

              <div className="grid gap-4 sm:grid-cols-2">
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="your.email@example.com"
                      name="email"
                      
                    />
                  </FormControl>
                 
                </FormItem>

                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input
                      type="tel"
                      placeholder="+233 XX XXX XXXX"
                      name="phone"
                  
                    />
                  </FormControl>
                
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
              
                  />
                </FormControl>
           
              </FormItem>

              <div className="grid gap-4 sm:grid-cols-2">
                <FormItem>
                  <FormLabel>Course of Study</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Your course/program"
                      name="course"
                    />
                  </FormControl>
                </FormItem>

                <FormItem>
                  <FormLabel>Expected Graduation Year</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="YYYY"
                      name="graduationYear"
                    />
                  </FormControl>
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
                  />
                </FormControl>
            
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
                      />
                    </label>
                  </div>
                </FormControl>
             
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