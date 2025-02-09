"use client"

import type React from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

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

const ProfileView: React.FC<{ user: any }> = ({ user }) => {
  const router = useRouter()

  const toggleEditMode = () => {
    router.push(`/${user.username}?edit=true`)
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
              {user.skills.map((skill: string) => (
                <Badge key={skill} variant="secondary">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        </ProfileSection>

        <ProfileSection title="Education" emoji="🎓">
          {user.education.map((edu: any, index: number) => (
            <div key={index} className="mb-4 last:mb-0">
              <h3 className="font-semibold">🏫 {edu.institution}</h3>
              <p>
                🎓 {edu.degree} in {edu.major}
              </p>
              <p>
                🗓️ {edu.startDate} - {edu.endDate || "Present"}
              </p>
            </div>
          ))}
        </ProfileSection>

        <ProfileSection title="Work Experience" emoji="💼">
          {user.work.map((work: any, index: number) => (
            <div key={index} className="mb-4 last:mb-0">
              <h3 className="font-semibold">🏢 {work.company}</h3>
              <p>👨‍💼 {work.position}</p>
              <p>
                🗓️ {work.startDate} - {work.isCurrently ? "Present" : work.endDate}
              </p>
            </div>
          ))}
        </ProfileSection>

        <ProfileSection title="Projects" emoji="🚀">
          {user.projects.map((project: any, index: number) => (
            <div key={index} className="mb-4 last:mb-0">
              <h3 className="font-semibold">📁 {project.name}</h3>
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
          ))}
        </ProfileSection>
      </div>
    </div>
  )
}

export default ProfileView

