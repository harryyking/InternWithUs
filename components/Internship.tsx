import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardTitle, CardHeader } from "./ui/card"


interface InternshipCardProps {
  id: number
  title: string
  company: string
  location: string
  description: string
  duration: string
  deadline: string
}

export function InternshipCard({ id, title, company, location, description, duration, deadline }: InternshipCardProps) {
  return (
    <Card className="shadow-sm hover:shadow-md transition-shadow">
      <CardHeader>

        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
      <p className="text-gray-600 mb-2">
        {company} - {location}
      </p>
      <p className="text-sm text-gray-500 mb-4">{description}</p>
      <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
        <span>Duration: {duration}</span>
        <span>Deadline: {deadline}</span>
      </div>
      </CardContent>
      <CardFooter>
      <Link
        href={`/apply?id=${id}`}
        className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-blue-700 transition-colors inline-block"
      >
        Apply Now
      </Link>
      </CardFooter>
      
    </Card>
  )
}

