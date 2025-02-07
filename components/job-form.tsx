"use client"

import { useState } from "react"
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
import { Tiptap } from "./tiptap"

const JobSchema = z.object({
  position: z.string().min(1, "Position is required"),
  description: z.string().min(1, "Job description is required"),
  companyName: z.string().min(1, "Company name is required"),
  companyLogo: z.string().optional(),
  location: z.string().min(1, "Location is required"),
  locationType: z.array(z.string()).min(1, "At least one location type is required"),
  benefits: z.array(z.string()),
  tags: z.array(z.string()).min(1, "At least one tag is required"),
  employmentType: z.string().min(1, "Employment type is required"),
  email: z.string().email("Invalid email address"),
  applyLink: z.string().url("Invalid URL").optional(),
  salary: z.object({
    min: z.string(),
    max: z.string(),
    currency: z.string(),
    period: z.string(),
  }),
  highlightListing: z.boolean(),
})

type JobFormValues = z.infer<typeof JobSchema>

const locationTypes = ["Remote", "On-site", "Hybrid"]
const benefitOptions = ["Health Insurance", "401(k)", "Paid Time Off", "Remote Work", "Professional Development"]
const employmentTypes = ["Full-time", "Part-time", "Contract", "Internship"]

export default function JobPostingForm() {
  const [preview, setPreview] = useState<JobFormValues | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<JobFormValues>({
    resolver: zodResolver(JobSchema),
    defaultValues: {
      locationType: [],
      benefits: [],
      tags: [],
      highlightListing: false,
      salary: {
        min: "",
        max: "",
        currency: "USD",
        period: "year",
      },
    },
  })

  const onSubmit = async (data: JobFormValues) => {
    try {
      setIsLoading(true)
      setPreview(data)
      // Here you would typically send the data to your backend
      console.log("Form data:", data)
    } catch (error) {
      console.error("Failed to submit job posting:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-4xl">
      <Card>
        <CardHeader>
          <CardTitle className=" font-semibold">Post a New Job</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="position"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job Title</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Senior React Developer" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

                <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job Description</FormLabel>
                    <FormControl>
                      <Tiptap {...field} />
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
                      <Input placeholder="e.g. Acme Inc." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="companyLogo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company Logo URL (optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="https://example.com/logo.png" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. New York, NY or Worldwide" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

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
                name="employmentType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Employment Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
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

              <FormField
                control={form.control}
                name="salary"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Salary Range</FormLabel>
                    <div className="flex items-center space-x-4">
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Min"
                          {...field}
                          value={field.value.min}
                          onChange={(e) => field.onChange({ ...field.value, min: e.target.value })}
                        />
                      </FormControl>
                      <span>-</span>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Max"
                          {...field}
                          value={field.value.max}
                          onChange={(e) => field.onChange({ ...field.value, max: e.target.value })}
                        />
                      </FormControl>
                      <Select
                        value={field.value.currency}
                        onValueChange={(value) => field.onChange({ ...field.value, currency: value })}
                      >
                        <SelectTrigger className="w-[100px]">
                          <SelectValue placeholder="Currency" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="USD">USD</SelectItem>
                          <SelectItem value="EUR">EUR</SelectItem>
                          <SelectItem value="GBP">GBP</SelectItem>
                        </SelectContent>
                      </Select>
                      <Select
                        value={field.value.period}
                        onValueChange={(value) => field.onChange({ ...field.value, period: value })}
                      >
                        <SelectTrigger className="w-[100px]">
                          <SelectValue placeholder="Period" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="hour">Per Hour</SelectItem>
                          <SelectItem value="month">Per Month</SelectItem>
                          <SelectItem value="year">Per Year</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="benefits"
                render={() => (
                  <FormItem>
                    <FormLabel>Benefits</FormLabel>
                    <FormControl>
                      <div className="flex flex-wrap gap-4">
                        {benefitOptions.map((benefit) => (
                          <FormField
                            key={benefit}
                            control={form.control}
                            name="benefits"
                            render={({ field }) => (
                              <FormItem className="flex items-center space-x-2">
                                <Checkbox
                                  checked={field.value?.includes(benefit)}
                                  onCheckedChange={(checked) => {
                                    if (checked) {
                                      field.onChange([...field.value, benefit])
                                    } else {
                                      field.onChange(field.value?.filter((value) => value !== benefit))
                                    }
                                  }}
                                />
                                <FormLabel className="font-normal">{benefit}</FormLabel>
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
                name="tags"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tags (comma-separated)</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g. react, javascript, remote"
                        {...field}
                        onChange={(e) => {
                          const tags = e.target.value.split(",").map((tag) => tag.trim())
                          field.onChange(tags)
                        }}
                        value={field.value.join(", ")}
                      />
                    </FormControl>
                    <FormDescription>Enter relevant skills or keywords</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contact Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="contact@company.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="applyLink"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Application URL (optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="https://company.com/apply" {...field} />
                    </FormControl>
                    <FormDescription>If left blank, applications will be sent to the contact email</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="highlightListing"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
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

              <div className="fixed bottom-0 h-40 bg-background pt-4 pb-2 w-full">
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Submitting..." : "Post Job"}
              </Button>

              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Preview</CardTitle>
          </CardHeader>
      {preview && (
          <CardContent>
            <h2 className="text-2xl font-semibold">{preview.position}</h2>
            <p className="text-sm text-gray-500">
              {preview.companyName} - {preview.location}
            </p>
            <p className="text-sm text-gray-500">
              {preview.employmentType} - {preview.locationType.join(", ")}
            </p>
            <p className="mt-2">
              Salary: {preview.salary.currency} {preview.salary.min} - {preview.salary.max} per {preview.salary.period}
            </p>
            <div className="mt-4">
              <h3 className="font-semibold">Benefits:</h3>
              <ul className="list-disc list-inside">
                {preview.benefits.map((benefit, index) => (
                  <li key={index}>{benefit}</li>
                ))}
              </ul>
            </div>
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
      )}
    </Card>
    </div>
  )
}

