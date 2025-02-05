"use client"

import { useState } from "react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"

// Mock data for applications
const mockApplications = [
  { id: 1, company: "TechGhana", position: "Software Developer Intern", status: "Pending", appliedDate: "2023-07-15" },
  { id: 2, company: "GhanaMedia", position: "Marketing Intern", status: "Rejected", appliedDate: "2023-07-10" },
  { id: 3, company: "DataSolutions", position: "Data Analyst Intern", status: "Interview", appliedDate: "2023-07-05" },
]

export default function Dashboard() {
  const [applications, setApplications] = useState(mockApplications)

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Student Dashboard</h1>
      <Card>
        <CardHeader>
          <CardTitle>Your Applications</CardTitle>
          <CardDescription>Overview of your recent internship applications.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Position</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Applied Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {applications.map((application) => (
                <TableRow key={application.id}>
                  <TableCell className="font-medium">{application.position}</TableCell>
                  <TableCell>{application.company}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        "default"
                      }
                    >
                      {application.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{application.appliedDate}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}