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
    description: "No studio needed – create perfect headshots from your laptop or phone. Get noticed 230% more by recruiters!",
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
          className="w-full"
        >
          <Card className="p-4 md:p-6 hover:shadow-lg transition-shadow overflow-hidden">
            <div className="flex flex-row items-start gap-4">
              <img
                src={job.logo || "/placeholder.svg"}
                alt={`${job.company} logo`}
                className="w-10 h-10 md:w-12 md:h-12 rounded-full self-center md:self-start"
              />
              <div className="flex-1 w-full text-center md:text-left">
                <div className="flex flex-row items-center gap-2 justify-start">
                  <h3 className="text-base md:text-lg font-semibold truncate max-w-full">
                    {job.title}
                  </h3>
                  {job.isVerified && (
                    <Badge variant="secondary" className="text-xs md:text-sm">
                      Verified
                    </Badge>
                  )}
                </div>
                <div className="flex flex-wrap gap-2 mt-2 justify-start items-center">
                  {job.tags.map((tag) => (
                    <Badge 
                      key={tag} 
                      variant="outline" 
                      className="text-[10px] md:text-xs"
                    >
                      {tag}
                    </Badge>
                  ))}
                  {job.salary && (
                    <Badge 
                      variant="secondary" 
                      className="text-[10px] md:text-xs"
                    >
                      {job.salary}
                    </Badge>
                  )}
                </div>
              </div>
              {job.cta && (
                <Button 
                  variant={job.isAd ? "default" : "secondary"} 
                  className="w-auto text-xs md:text-sm mt-2 md:mt-0"
                >
                  {job.cta}
                </Button>
              )}
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}