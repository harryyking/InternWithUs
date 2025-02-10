import { getJob } from "@/actions/job"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { CheckCircle, ExternalLink } from "lucide-react"
import Link from "next/link"

export default async function JobList() {
  const jobs = await getJob()

  return (
    <div className="space-y-4 max-w-6xl mx-auto">
      {jobs.map((job) => (
        <Card 
          key={job.id} 
          className={"p-4 md:p-6 bg-background"}
        >
          <div className="flex flex-col md:flex-row items-start gap-4">
            <img
              src={job.companyLogo[0] || "/placeholder.svg"}
              alt={`${job.companyName} logo`}
              className="w-16 h-16 rounded-full object-cover"
            />
            <div className="flex-1 w-full">
              <div className="flex flex-col md:flex-row md:items-center gap-2 justify-between">
                <div>
                  <h3 className="text-lg md:text-xl font-semibold">{job.position}</h3>
                  <p className="text-sm text-muted-foreground">{job.companyName}</p>
                </div>
                <div className="flex items-center gap-2">
                  {job.featured && (
                    <Badge variant="secondary" className="text-xs">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Verified
                    </Badge>
                  )}
                  {job.createdAt && <p className="text-sm text-muted-foreground">{job.createdAt.toLocaleDateString()}</p>}
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
                    {job.salary.toString()}
                  </Badge>
                )}
              </div>
             
              <div className="mt-4 flex justify-between items-center">
                <Link href={`/apply/${job.id}`}>
                <Button className="ml-auto">
                  {"Apply" && <ExternalLink/>}
                </Button>
                </Link>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}