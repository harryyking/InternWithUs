"use client"

import { useState } from "react"
import Image from "next/image"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Checkbox } from "@/components/ui/checkbox"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Tiptap } from "./tiptap"
import { UploadDropzone } from "@/lib/uploadthing"
import { ArrowRight, DollarSign, MapPin, Briefcase, Tags, Mail, Link, Star } from "lucide-react"
import React from "react"
import { createJob } from "@/actions/job"

const JobSchema = z.object({
  position: z.string().min(1, "Position is required"),
  description: z.string().min(1, "Job description is required"),
  companyName: z.string().min(1, "Company name is required"),
  companyLogo: z.array(z.string()).optional(),
  location: z.string().min(1, "Location is required"),
  locationType: z.array(z.string()).min(1, "At least one location type is required"),
  tags: z.array(z.string()).min(1, "At least one tag is required"),
  employmentType: z.array(z.string()),
  email: z.string().email("Invalid email address"),
  link: z.string().url("Invalid URL").optional(),
  region: z.array(z.string()),
  salary: z.object({
    range: z.string(),
    period: z.string(),
  }),
  highlightListing: z.boolean(),
  apply: z.string()
})

type JobFormValues = z.infer<typeof JobSchema>

const locationTypes = ["Remote", "On-site", "Hybrid"]
const employmentTypes = ["Full-time", "Part-time", "Contract", "Internship"]
const salaryRanges = [
  { label: "Below GH₵ 2,000", value: "0-2000" },
  { label: "GH₵ 2,000 - GH₵ 5,000", value: "2000-5000" },
  { label: "GH₵ 5,000 - GH₵ 10,000", value: "5000-10000" },
  { label: "GH₵ 10,000 - GH₵ 15,000", value: "10000-15000" },
  { label: "GH₵ 15,000 - GH₵ 20,000", value: "15000-20000" },
  { label: "Above GH₵ 20,000", value: "20000+" }
]

export default function JobPostingForm() {
  const [preview, setPreview] = useState<JobFormValues | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [step, setStep] = useState(1)

  const form = useForm<JobFormValues>({
    resolver: zodResolver(JobSchema),
    defaultValues: {
      locationType: [],
      tags: [],
      highlightListing: false,
      salary: {
        range: "",
        period: "month",
      },
    },
  })

  const onSubmit = async (data: JobFormValues) => {
    try {
      setIsLoading(true)
      setPreview(data)
      await createJob({
        position : data.position,
        description: data.description,
        companyName : data.companyName,
        employmentType: data.employmentType,
        location : data.location,
        locationType: data.locationType,
        tags: data.tags,
        salary: data.salary,     
        email: data.email,
        link: data.link,
        region: data.region,
        apply: data.apply
      }
      )
    } catch (error) {
      console.error("Failed to submit job posting:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const companyLogo = form.watch("companyLogo") as string[];
  const moveToNextStep = () => {
    if (step < 3) setStep(step + 1)
  }

  const moveToPreviousStep = () => {
    if (step > 1) setStep(step - 1)
  }

  const renderFormStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <FormField
                control={form.control}
                name="position"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job Title</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Briefcase className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input className="pl-10" placeholder="e.g. Senior React Developer" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="companyName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company Name</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Star className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input className="pl-10" placeholder="e.g. Acme Inc." {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Description</FormLabel>
                  <FormControl>
                    <div className="border rounded-lg">
                      <Tiptap {...field} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

<div className="space-y-2">
                <p className="font-semibold text-sm">🖼️ Logo</p>
                <UploadDropzone
                  className="h-52 p-4"
                  endpoint="userProfile"
                  onUploadBegin={() => {
                    setIsUploading(true)
                  }}
                  onClientUploadComplete={(res) => {
                    const newImageUrls = res.map((fileData) => fileData.url)
                    form.setValue("companyLogo", newImageUrls)
                    setIsUploading(false)
                  }}
                  onUploadError={(error: Error) => {
                    setIsUploading(false)
                  }}
                />
                <p className="text-sm text-muted-foreground">
                  Upload a logo or profile picture (recommended size: 200x200px).
                </p>
              </div>
              <div>
                {companyLogo?.map((logo) => (
                  <div className="overflow-hidden rounded-md" key={logo}>
                    <Image src={logo} alt="product image" width={100} height={100} />
                  </div>
                ))}
              </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input className="pl-10" placeholder="e.g. Accra, Ghana" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="employmentType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Employment Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value?.[0]}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select employment type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {employmentTypes.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="locationType"
              render={() => (
                <FormItem>
                  <FormLabel>Location Type</FormLabel>
                  <FormControl>
                    <div className="flex flex-wrap gap-4">
                      {locationTypes.map((type) => (
                        <FormField
                          key={type}
                          control={form.control}
                          name="locationType"
                          render={({ field }) => (
                            <FormItem className="flex items-center space-x-2">
                              <Checkbox
                                checked={field.value?.includes(type)}
                                onCheckedChange={(checked) => {
                                  if (checked) {
                                    field.onChange([...field.value, type])
                                  } else {
                                    field.onChange(field.value?.filter((value) => value !== type))
                                  }
                                }}
                              />
                              <FormLabel className="font-normal">{type}</FormLabel>
                            </FormItem>
                          )}
                        />
                      ))}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="salary"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Salary Range</FormLabel>
                  <div className="grid gap-4 md:grid-cols-2">
                    <Select
                      value={field.value.range}
                      onValueChange={(value) => field.onChange({ ...field.value, range: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select salary range" />
                      </SelectTrigger>
                      <SelectContent>
                        {salaryRanges.map((range) => (
                          <SelectItem key={range.value} value={range.value}>
                            {range.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Select
                      value={field.value.period}
                      onValueChange={(value) => field.onChange({ ...field.value, period: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select period" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="month">Per Month</SelectItem>
                        <SelectItem value="year">Per Year</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Skills & Requirements</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Tags className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        className="pl-10"
                        placeholder="e.g. react, javascript, python"
                        {...field}
                        onChange={(e) => {
                          const tags = e.target.value.split(",").map((tag) => tag.trim())
                          field.onChange(tags)
                        }}
                        value={field.value.join(", ")}
                      />
                    </div>
                  </FormControl>
                  <FormDescription>Enter required skills or keywords, separated by commas</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid gap-6 md:grid-cols-2">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contact Email</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input className="pl-10" type="email" placeholder="contact@company.com" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="link"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Application URL (optional)</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Link className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input className="pl-10" placeholder="https://company.com/apply" {...field} />
                      </div>
                    </FormControl>
                    <FormDescription>If left blank, applications will be sent to the contact email</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="highlightListing"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 shadow-sm">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Highlight Listing</FormLabel>
                    <FormDescription>
                      Promote your job posting for more visibility (additional fee may apply)
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="container mx-auto py-6 max-w-3xl">
      <Card className="border-none shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Post a New Job</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    {[1, 2, 3].map((stepNumber) => (
                      <React.Fragment key={stepNumber}>
                        <div
                          className={`h-8 w-8 rounded-full flex items-center justify-center ${
                            step >= stepNumber ? "bg-primary text-primary-foreground" : "bg-muted"
                          }`}
                        >
                          {stepNumber}
                        </div>
                        {stepNumber < 3 && <Separator className="w-12" />}
                      </React.Fragment>
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    Step {step} of 3
                  </span>
                </div>
  
                {renderFormStep()}
  
                <div className="flex justify-between mt-8">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={moveToPreviousStep}
                    disabled={step === 1}
                  >
                    Previous
                  </Button>
                  {step < 3 ? (
                    <Button
                      type="button"
                      onClick={moveToNextStep}
                    >
                      Next
                    </Button>
                  ) : (
                    <Button type="submit" disabled={isLoading}>
                      {isLoading ? "Submitting..." : "Submit"}
                    </Button>
                  )}
                </div>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
  
      {preview && (
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Preview</CardTitle>
          </CardHeader>
          <CardContent>
            <h2 className="text-2xl font-semibold">{preview.position}</h2>
            <p className="text-sm text-gray-500">
              {preview.companyName} - {preview.location}
            </p>
            <p className="text-sm text-gray-500">
              {preview.employmentType} - {preview.locationType.join(", ")}
            </p>
            <p className="mt-2">
              Salary: {preview.salary.range} per {preview.salary.period}
            </p>
            <div className="mt-4">
              <h3 className="font-semibold">Tags:</h3>
              <div className="flex flex-wrap gap-2">
                {preview.tags.map((tag, index) => (
                  <span key={index} className="bg-gray-200 px-2 py-1 rounded-full text-sm">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="mt-4">
              <h3 className="font-semibold">Job Description:</h3>
              <div className="prose" dangerouslySetInnerHTML={{ __html: preview.description }} />
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
