"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { motion, AnimatePresence } from "framer-motion"
import { CheckCircle, ExternalLink } from "lucide-react"

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
    createdAt: "2d",
  },
]

export default function JobList() {
  const [expandedJob, setExpandedJob] = useState<number | null>(null)

  return (
    <div className="space-y-4 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Job Listings</h2>
      <AnimatePresence>
        {jobs.map((job, index) => (
          <motion.div
            key={job.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ delay: index * 0.1 }}
            className="w-full relative"
          >
            <Card
              className={`p-4 md:p-6 transition-all duration-300 ${
                job.isAd
                  ? "bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20"
                  : "bg-background"
              } ${expandedJob === job.id ? "shadow-lg" : "hover:shadow-md"}`}
            >
              <div className="flex flex-col md:flex-row items-start gap-4">
                <img
                  src={job.logo || "/placeholder.svg"}
                  alt={`${job.company} logo`}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div className="flex-1 w-full">
                  <div className="flex flex-col md:flex-row md:items-center gap-2 justify-between">
                    <div>
                      <h3 className="text-lg md:text-xl font-semibold">{job.title}</h3>
                      <p className="text-sm text-muted-foreground">{job.company}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      {job.isVerified && (
                        <Badge variant="secondary" className="text-xs">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Verified
                        </Badge>
                      )}
                      {job.createdAt && <p className="text-sm text-muted-foreground">{job.createdAt}</p>}
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {job.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                    {job.salary && (
                      <Badge variant="secondary" className="text-xs">
                        {job.salary}
                      </Badge>
                    )}
                  </div>
                  <AnimatePresence>
                    {expandedJob === job.id && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="text-sm mt-2 text-muted-foreground"
                      >
                        {job.description}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              </div>
              <div className="mt-4 flex justify-between items-center">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setExpandedJob(expandedJob === job.id ? null : job.id)}
                >
                  {expandedJob === job.id ? "Less info" : "More info"}
                </Button>
                <Button className="ml-auto">
                  {job.isAd ? job.cta : "Apply"}
                  {job.isAd && <ExternalLink className="w-4 h-4 ml-2" />}
                </Button>
              </div>
            </Card>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

