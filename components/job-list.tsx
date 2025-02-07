"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { motion } from "framer-motion"

const jobs = [
  {
    id: 1,
    company: "SafetyWing",
    logo: "/placeholder.svg?height=50&width=50",
    title: "Nomad Health",
    description: "Global health coverage for remote workers and nomads",
    tags: ["Health Insurance", "Remote"],
    cta: "Sign up today",
    isAd: true,
  },
  {
    id: 2,
    company: "LinkedIn Headshots",
    logo: "/placeholder.svg?height=50&width=50",
    title: "Get Professional LinkedIn Headshots",
    description:
      "No studio needed – create perfect headshots from your laptop or phone. Get noticed 230% more by recruiters!",
    tags: ["Photography", "Professional"],
    cta: "Get headshots",
    isAd: true,
  },
  {
    id: 3,
    company: "IAPWE",
    logo: "/placeholder.svg?height=50&width=50",
    title: "Freelance Writer",
    description: "Write content for various clients and projects",
    tags: ["Non Tech", "Content Writing"],
    salary: "$20-45/hr",
    isVerified: true,
  },
]

export default function JobList() {
  return (
    <div className="space-y-4">
      {jobs.map((job, index) => (
        <motion.div
          key={job.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start gap-4">
              <img
                src={job.logo || "/placeholder.svg"}
                alt={`${job.company} logo`}
                className="w-12 h-12 rounded-full"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-semibold">{job.title}</h3>
                  {job.isVerified && <Badge variant="secondary">Verified</Badge>}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{job.description}</p>
                <div className="flex flex-wrap gap-2 mt-3">
                  {job.tags.map((tag) => (
                    <Badge key={tag} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                  {job.salary && <Badge variant="secondary">{job.salary}</Badge>}
                </div>
              </div>
              {job.cta && <Button variant={job.isAd ? "default" : "secondary"}>{job.cta}</Button>}
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}

