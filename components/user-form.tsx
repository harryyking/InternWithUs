"use client"
import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, useFieldArray } from "react-hook-form"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Checkbox } from "@/components/ui/checkbox"
import { z } from "zod"
import { Plus, Trash, X } from "lucide-react"
import { updateEducation, updateProject, updateUserProfile, updateWork } from "@/actions/userAction"
import { Textarea } from "./ui/textarea"
import { UploadDropzone } from "@/lib/uploadthing"
import { Badge } from "@/components/ui/badge"

// Define schemas for individual entries
const EducationSchema = z.object({
  institution: z.string().min(1, "Institution name is required"),
  location: z.string().min(1, "Location is required"),
  degree: z.string().min(1, "Degree is required"),
  major: z.string().min(1, "Major is required"),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().optional(),
  isCurrently: z.boolean().default(false),
})

const WorkSchema = z.object({
  company: z.string().min(1, "Company name is required"),
  location: z.string().min(1, "Location is required"),
  position: z.string().min(1, "Position is required"),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().optional(),
  isCurrently: z.boolean().default(false),
})

const ProjectSchema = z.object({
  name: z.string().min(1, "Project name is required"),
  description: z.string().min(1, "Description is required"),
  link: z.string().url("Invalid URL").optional(),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().optional(),
  isCurrently: z.boolean().default(false),
})

export type EducationInput = z.infer<typeof EducationSchema>
export type WorkInput = z.infer<typeof WorkSchema>
export type ProjectInput = z.infer<typeof ProjectSchema>

// Define the main form schema
const ProfileSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  username: z.string().min(1, "Username is required"),
  location: z.string().min(1, "Location is required"),
  portfolio: z.string().url("Invalid URL").optional(),
  linkedin: z.string().url("Invalid URL").optional(),
  instagram: z.string().url("Invalid URL").optional(),
  facebook: z.string().url("Invalid URL").optional(),
  bio: z.string(),
  logo: z.array(z.string()),
  banner: z.array(z.string()),
  skills: z.array(z.string()),
  telegram: z.string().url("Invalid URL").optional(),
  education: z.array(EducationSchema),
  work: z.array(WorkSchema),
  projects: z.array(ProjectSchema),
})

export type ProfileFormValues = z.infer<typeof ProfileSchema>

// Add this type definition at the top of the file, after the other type definitions
type FormSection = "education" | "work" | "projects" 

const UserProfileForm = ({ username }: {username: string}) => {
  const [isLoading, setIsLoading] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [newSkill, setNewSkill] = useState("")

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(ProfileSchema),
    defaultValues: {
      name: "",
      email: "",
      location: "",
      portfolio: "",
      linkedin: "",
      instagram: "",
      facebook: "",
      bio: "",
      logo: [],
      banner: [],
      skills: [],
      telegram: "",
      education: [],
      work: [],
      projects: [],
    },
  })

  const {
    fields: educationFields,
    append: appendEducation,
    remove: removeEducation,
  } = useFieldArray<ProfileFormValues>({
    control: form.control,
    name: "education",
  })

  const {
    fields: workFields,
    append: appendWork,
    remove: removeWork,
  } = useFieldArray<ProfileFormValues>({
    control: form.control,
    name: "work",
  })

  const {
    fields: projectFields,
    append: appendProject,
    remove: removeProject,
  } = useFieldArray<ProfileFormValues>({
    control: form.control,
    name: "projects",
  })


  const onSubmit = async (data: ProfileFormValues) => {
    try {
      setIsLoading(true)

      await updateUserProfile(username, {
        name: data.name,
        email: data.email,
        location: data.location,
        portfolio: data.portfolio,
        username: data.username,
        linkedin: data.linkedin,
        instagram: data.instagram,
        facebook: data.facebook,
        bio: data.bio,
        telegram: data.telegram,
        logo: data.logo,
        banner: data.banner,
        skills: data.skills,
      })

      await Promise.all([
        ...data.education.map((edu) => updateEducation(username, edu)),
        ...data.work.map((work) => updateWork(username, work)),
        ...data.projects.map((project) => updateProject(username, project)),
      ])

      // Add a success message or notification here
      console.log("Profile updated successfully")
    } catch (error) {
      console.error("Error updating profile:", error)
      // Add an error message or notification here
    } finally {
      setIsLoading(false)
    }
  }

  // Update the renderDurationFields function
  const renderDurationFields = (index: number, basePath: FormSection) => {

    return (
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name={`${basePath}.${index}.startDate` as const}
            render={({ field }) => (
              <FormItem>
                <FormLabel>🗓️ Start Date</FormLabel>
                <FormControl>
                  <Input type="month" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {!form.watch(`${basePath}.${index}.isCurrently` as const) && (
            <FormField
              control={form.control}
              name={`${basePath}.${index}.endDate` as const}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>🏁 End Date</FormLabel>
                  <FormControl>
                    <Input type="month" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
        </div>

        <FormField
          control={form.control}
          name={`${basePath}.${index}.isCurrently` as const}
          render={({ field }) => (
            <FormItem className="flex items-center space-x-2">
              <FormControl>
                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
              <FormLabel className="mt-0">
                {basePath === "education" && "🎓 Currently Studying Here"}
                {basePath === "work" && "💼 Currently Working Here"}
                {basePath === "projects" && "🚧 Ongoing Project"}
              </FormLabel>
            </FormItem>
          )}
        />
      </div>
    )
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto p-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Personal Information Card */}
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>👤 Full Name</FormLabel>
                    <FormControl>
                      <Input  {...field} />
                    </FormControl>
                    <FormMessage />
                    <p className="text-sm text-muted-foreground">
                      Your legal name as it appears on official documents.
                    </p>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>📧 Email Address</FormLabel>
                    <FormControl>
                      <Input type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                    <p className="text-sm text-muted-foreground">
                      Your primary email for account-related communications.
                    </p>
                  </FormItem>
                )}
              />

                <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>🙍‍♂️ Username</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                    <p className="text-sm text-muted-foreground">
                      A unique name for your profile
                    </p>
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
                    form.setValue("logo", newImageUrls)
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
              <div className="space-y-2">
                <p className="font-semibold text-sm">🏞️ Banner Photo</p>
                <UploadDropzone
                  className="h-52 p-4"
                  endpoint="userProfile"
                  onUploadBegin={() => {
                    setIsUploading(true)
                  }}
                  onClientUploadComplete={(res) => {
                    const newImageUrls = res.map((fileData) => fileData.url)
                    form.setValue("banner", newImageUrls)
                    setIsUploading(false)
                  }}
                  onUploadError={(error: Error) => {
                    setIsUploading(false)
                  }}
                />
                <p className="text-sm text-muted-foreground">
                  Upload a banner image for your profile (recommended size: 1500x500px).
                </p>
              </div>
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>📍 Location</FormLabel>
                    <FormControl>
                      <Input  {...field} />
                    </FormControl>
                    <FormMessage />
                    <p className="text-sm text-muted-foreground">Your current city and country of residence.</p>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="portfolio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>🌐 Portfolio Website</FormLabel>
                    <FormControl>
                      <Input type="url"  {...field} />
                    </FormControl>
                    <FormMessage />
                    <p className="text-sm text-muted-foreground">Link to your personal website or portfolio.</p>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="linkedin"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>💼 LinkedIn Profile</FormLabel>
                    <FormControl>
                      <Input type="url" {...field} />
                    </FormControl>
                    <FormMessage />
                    <p className="text-sm text-muted-foreground">Your LinkedIn profile URL.</p>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="instagram"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>📸 Instagram Profile</FormLabel>
                    <FormControl>
                      <Input type="url" {...field} />
                    </FormControl>
                    <FormMessage />
                    <p className="text-sm text-muted-foreground">Your Instagram profile URL.</p>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="facebook"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>👥 Facebook Profile</FormLabel>
                    <FormControl>
                      <Input type="url"  {...field} />
                    </FormControl>
                    <FormMessage />
                    <p className="text-sm text-muted-foreground">Your Facebook profile URL.</p>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="telegram"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>✈️ Telegram</FormLabel>
                    <FormControl>
                      <Input type="url" {...field} />
                    </FormControl>
                    <FormMessage />
                    <p className="text-sm text-muted-foreground">Your Telegram profile URL or username.</p>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>📝 Bio</FormLabel>
                    <FormControl>
                      <Textarea {...field} />
                    </FormControl>
                    <FormMessage />
                    <p className="text-sm text-muted-foreground">
                      A brief description of yourself, your experiences, and your goals.
                    </p>
                  </FormItem>
                )}
              />

                <FormField
                control={form.control}
                name="skills"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>🎓 Skills</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                    <p className="text-sm text-muted-foreground">Skills must comma separated.</p>
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {/* Education Card */}
          <Card>
            <CardHeader>
              <CardTitle>Education</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {educationFields.map((field, index) => (
                <div key={field.id} className="space-y-4 border p-4 rounded-lg">
                  <FormField
                    control={form.control}
                    name={`education.${index}.institution`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>🏫 Institution Name</FormLabel>
                        <FormControl>
                          <Input placeholder="University or School Name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`education.${index}.location`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>📍 Location</FormLabel>
                        <FormControl>
                          <Input placeholder="City, Country" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`education.${index}.degree`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>🎓 Degree</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Bachelor of Science" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`education.${index}.major`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>📚 Major</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Computer Science" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {renderDurationFields(index, "education")}
                  <Button type="button" variant="destructive" onClick={() => removeEducation(index)}>
                    <Trash className="w-4 h-4 mr-2" /> Remove
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={() =>
                  appendEducation({
                    institution: "",
                    location: "",
                    degree: "",
                    major: "",
                    startDate: "",
                    endDate: "",
                    isCurrently: false,
                  })
                }
              >
                <Plus className="w-4 h-4 mr-2" /> Add Education
              </Button>
            </CardContent>
          </Card>

          {/* Work Experience Card */}
          <Card>
            <CardHeader>
              <CardTitle>Work Experience</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {workFields.map((field, index) => (
                <div key={field.id} className="space-y-4 border p-4 rounded-lg">
                  <FormField
                    control={form.control}
                    name={`work.${index}.company`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>🏢 Company Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter company name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`work.${index}.location`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>📍 Location</FormLabel>
                        <FormControl>
                          <Input placeholder="City, Country" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`work.${index}.position`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>💼 Position</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Software Engineer" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {renderDurationFields(index, "work")}
                  <Button type="button" variant="destructive" onClick={() => removeWork(index)}>
                    <Trash className="w-4 h-4 mr-2" /> Remove
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={() =>
                  appendWork({
                    company: "",
                    location: "",
                    position: "",
                    startDate: "",
                    endDate: "",
                    isCurrently: false,
                  })
                }
              >
                <Plus className="w-4 h-4 mr-2" /> Add Work Experience
              </Button>
            </CardContent>
          </Card>

          {/* Projects Card */}
          <Card>
            <CardHeader>
              <CardTitle>Projects</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {projectFields.map((field, index) => (
                <div key={field.id} className="space-y-4 border p-4 rounded-lg">
                  <FormField
                    control={form.control}
                    name={`projects.${index}.name`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>🚀 Project Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter project name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`projects.${index}.description`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>📝 Description</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Briefly describe your project" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`projects.${index}.link`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>🔗 Project Link</FormLabel>
                        <FormControl>
                          <Input type="url" placeholder="https://yourproject.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {renderDurationFields(index, "projects")}
                  <Button type="button" variant="destructive" onClick={() => removeProject(index)}>
                    <Trash className="w-4 h-4 mr-2" /> Remove
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={() =>
                  appendProject({
                    name: "",
                    description: "",
                    link: "",
                    startDate: "",
                    endDate: "",
                    isCurrently: false,
                  })
                }
              >
                <Plus className="w-4 h-4 mr-2" /> Add Project
              </Button>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="flex justify-end">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Submitting..." : "Submit Profile"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default UserProfileForm

