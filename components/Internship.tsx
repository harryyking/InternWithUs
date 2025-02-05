import { Badge } from "@/components/ui/badge"
import { Calendar, Building2, MapPin } from "lucide-react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardTitle, CardHeader } from "./ui/card"
import { Button } from "./ui/button"

interface InternshipCardProps {
  id: number
  title: string
  company: string
  location: string
  description: string
  duration: string
  deadline: string
}

export function InternshipCard({
  id,
  title,
  company,
  location,
  description,
  duration,
  deadline,
}: InternshipCardProps) {
  // Calculate days until deadline
  const daysUntilDeadline = Math.ceil(
    (new Date(deadline).getTime() - new Date().getTime()) / (1000 * 3600 * 24)
  )

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 border-gray-200">
      <CardHeader className="space-y-2">
        <div className="flex items-start justify-between">
          <CardTitle className="text-xl font-bold text-gray-900 hover:text-primary">
          <Link href={`/apply?id=${id}`} className="w-full">
            {title}
            </Link>
            </CardTitle>
          <Badge 
            variant={daysUntilDeadline <= 7 ? "destructive" : "secondary"}
            className="ml-2"
          >
            {daysUntilDeadline <= 7 ? "Closing Soon" : "Active"}
          </Badge>
        </div>
        <div className="flex flex-col space-y-1.5">
          <div className="flex items-center text-gray-600">
            <Building2 className="w-4 h-4 mr-2" />
            <span className="font-medium">{company}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <MapPin className="w-4 h-4 mr-2" />
            <span>{location}</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <CardDescription className="text-gray-600 line-clamp-2">
          {description}
        </CardDescription>

        <div className="flex flex-col sm:flex-row sm:justify-between gap-2 text-sm">
          <div className="flex items-center text-gray-600">
            <Calendar className="w-4 h-4 mr-2" />
            <span>Duration: {duration}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Calendar className="w-4 h-4 mr-2" />
            <span>Deadline: {deadline}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}



// why is this important 
// what can i do to make money or i am asking a wrong question.
//  to make money you must something of value the world is demanding 
// So if you have that thing then you will become rich. 
//  Every good and perfect gift comes from the Lord 
