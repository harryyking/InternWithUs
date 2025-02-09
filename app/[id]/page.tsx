"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { useSearchParams, useRouter } from "next/navigation"
import UserProfileForm from "@/components/user-form"

type ParamsProps = {
  params: {
    id: string
  }
}

const ProfileSection: React.FC<{ title: string; emoji: string; children: React.ReactNode }> = ({
  title,
  emoji,
  children,
}) => (
  <Card className="mb-6">
    <CardHeader>
      <CardTitle className="flex items-center text-xl">
        <span className="mr-2" role="img" aria-label={title}>
          {emoji}
        </span>
        <span>{title}</span>
      </CardTitle>
    </CardHeader>
    <CardContent>{children}</CardContent>
  </Card>
)

const Page: React.FC<ParamsProps> = ({ params }) => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const isEditMode = searchParams.get("edit") === "true"
  const [expandedSection, setExpandedSection] = useState<string | null>(null)

  // Mock user data (replace with actual data fetching in a real application)
  const user = {
    name: "John Doe",
    title: "Software Engineer",
    location: "San Francisco, CA",
    website: "https://johndoe.com",
    linkedin: "https://linkedin.com/in/johndoe",
    email: "john.doe@example.com",
    company: "Remote OK",
    bio: "Passionate software engineer with 5+ years of experience in web development.",
    skills: ["React", "Node.js", "TypeScript", "Next.js"],
    education: [
      {
        institution: "University of California, Berkeley",
        degree: "Bachelor of Science",
        major: "Computer Science",
        startDate: "2014-09",
        endDate: "2018-05",
      },
    ],
    work: [
      {
        company: "Tech Innovators Inc.",
        position: "Senior Software Engineer",
        startDate: "2020-03",
        endDate: null,
        isCurrently: true,
      },
      {
        company: "StartUp Solutions",
        position: "Full Stack Developer",
        startDate: "2018-06",
        endDate: "2020-02",
        isCurrently: false,
      },
    ],
    projects: [
      {
        name: "E-commerce Platform",
        description: "Developed a scalable e-commerce platform using React and Node.js",
        link: "https://github.com/johndoe/ecommerce-platform",
      },
    ],
    bannerImage: "https://images.pexels.com/photos/1181274/pexels-photo-1181274.jpeg",
    profileImage: "https://via.placeholder.com/150",
  }

  if (isEditMode) {
    return (
      <div className="bg-gray-50 min-h-screen">
        <div className="relative h-64 bg-gray-200 rounded-t-lg overflow-hidden">
          <img src={user.bannerImage || "/placeholder.svg"} alt="Banner" className="w-full h-full object-cover" />
          <div className="absolute bottom-0 left-0 right-0">
            <svg
              viewBox="0 0 1440 120"
              className="w-full h-[60px] fill-white dark:fill-gray-900 transform translate-y-1"
              preserveAspectRatio="none"
            >
              <path d="M0,32L48,37.3C96,43,192,53,288,58.7C384,64,480,64,576,58.7C672,53,768,43,864,42.7C960,43,1056,53,1152,53.3C1248,53,1344,43,1392,37.3L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z" />
            </svg>
          </div>
        </div>
        <UserProfileForm id={params.id} />
      </div>
    )
  }

  const toggleEditMode = () => {
    router.push(`/profile/${params.id}?edit=true`)
  }

  return (
    <div className="bg-gray-50 min-h-screen pb-12">
      {/* Banner */}
      <div className="relative h-64 bg-gray-200 rounded-t-lg overflow-hidden">
        <img src={user.bannerImage || "/placeholder.svg"} alt="Banner" className="w-full h-full object-cover" />
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1440 120"
            className="w-full h-[60px] fill-white dark:fill-gray-900 transform translate-y-1"
            preserveAspectRatio="none"
          >
            <path d="M0,32L48,37.3C96,43,192,53,288,58.7C384,64,480,64,576,58.7C672,53,768,43,864,42.7C960,43,1056,53,1152,53.3C1248,53,1344,43,1392,37.3L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z" />
          </svg>
        </div>
      </div>

      {/* Profile Image and Name */}
      <div className="relative max-w-4xl mx-auto px-4">
        <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
          <img
            src={user.profileImage || "/placeholder.svg"}
            alt="Profile"
            className="w-32 h-32 rounded-full border-4 border-white shadow-lg"
          />
          <h1 className="mt-4 text-3xl font-bold text-center">{user.name}</h1>
          <p className="text-xl text-gray-600">{user.title}</p>
        </div>
      </div>

      {/* Edit Button */}
      <div className="max-w-4xl mx-auto px-4 mt-24 mb-8 flex justify-end">
        <Button onClick={toggleEditMode}>✏️ Edit Profile</Button>
      </div>

      {/* Profile Sections */}
      <div className="max-w-4xl mx-auto px-4">
        <ProfileSection title="Personal Information" emoji="📋">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <p>📍 {user.location}</p>
            <p>
              📧{" "}
              <a href={`mailto:${user.email}`} className="text-blue-500 hover:underline">
                {user.email}
              </a>
            </p>
            <p>
              🌐{" "}
              <a
                href={user.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                {user.website}
              </a>
            </p>
            <p>
              👔{" "}
              <a
                href={user.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                {user.linkedin.split("/").pop()}
              </a>
            </p>
          </div>
          <div className="mt-4">
            <h3 className="font-semibold mb-2">📝 Bio</h3>
            <p>{user.bio}</p>
          </div>
          <div className="mt-4">
            <h3 className="font-semibold mb-2">🛠️ Skills</h3>
            <div className="flex flex-wrap gap-2">
              {user.skills.map((skill) => (
                <Badge key={skill} variant="secondary">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        </ProfileSection>

        <ProfileSection title="Education" emoji="🎓">
          <Accordion type="single" collapsible>
            {user.education.map((edu, index) => (
              <AccordionItem value={`education-${index}`} key={index}>
                <AccordionTrigger>
                  <span>🏫 {edu.institution}</span>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="pl-7">
                    <p>
                      🎓 <strong>Degree:</strong> {edu.degree}
                    </p>
                    <p>
                      📚 <strong>Major:</strong> {edu.major}
                    </p>
                    <p>
                      🗓️ <strong>Duration:</strong> {edu.startDate} - {edu.endDate || "Present"}
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </ProfileSection>

        <ProfileSection title="Work Experience" emoji="💼">
          <Accordion type="single" collapsible>
            {user.work.map((work, index) => (
              <AccordionItem value={`work-${index}`} key={index}>
                <AccordionTrigger>
                  <span>🏢 {work.company}</span>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="pl-7">
                    <p>
                      👨‍💼 <strong>Position:</strong> {work.position}
                    </p>
                    <p>
                      🗓️ <strong>Duration:</strong> {work.startDate} - {work.isCurrently ? "Present" : work.endDate}
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </ProfileSection>

        <ProfileSection title="Projects" emoji="🚀">
          <Accordion type="single" collapsible>
            {user.projects.map((project, index) => (
              <AccordionItem value={`project-${index}`} key={index}>
                <AccordionTrigger>
                  <span>📁 {project.name}</span>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="pl-7">
                    <p>{project.description}</p>
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline flex items-center mt-2"
                      >
                        🔗 View Project
                      </a>
                    )}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </ProfileSection>
      </div>
    </div>
  )
}

export default Page

