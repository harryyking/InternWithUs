import Link from "next/link"

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
    <div className="border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p className="text-gray-600 mb-2">
        {company} - {location}
      </p>
      <p className="text-sm text-gray-500 mb-4">{description}</p>
      <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
        <span>Duration: {duration}</span>
        <span>Deadline: {deadline}</span>
      </div>
      <Link
        href={`/apply?id=${id}`}
        className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-blue-700 transition-colors inline-block"
      >
        Apply Now
      </Link>
    </div>
  )
}

