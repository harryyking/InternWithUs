"use server"
import prisma from "@/lib/db"


export async function searchJobs(params: {
  query?: string
  location?: string
  employmentType?: EmploymentType[]
  industryId?: string
  skills?: string[]
  salaryMin?: number
  salaryMax?: number
  page?: number
  limit?: number
}) {
  try {
    const {
      query,
      location,
      employmentType,
      industryId,
      skills,
      salaryMin,
      salaryMax,
      page = 1,
      limit = 10
    } = params

    const where = {
      status: JobStatus.ACTIVE,
      ...(query && {
        OR: [
          { position: { contains: query, mode: 'insensitive' } },
          { description: { contains: query, mode: 'insensitive' } }
        ]
      }),
      ...(location && {
        location: { contains: location, mode: 'insensitive' }
      }),
      ...(employmentType?.length && {
        employmentType: { in: employmentType }
      }),
      ...(industryId && { industryId }),
      ...(skills?.length && {
        requiredSkills: {
          some: {
            id: { in: skills }
          }
        }
      }),
      ...(salaryMin && {
        salary: {
          path: '$.min',
          gte: salaryMin
        }
      }),
      ...(salaryMax && {
        salary: {
          path: '$.max',
          lte: salaryMax
        }
      })
    }

    const [jobs, total] = await Promise.all([
      prisma.job.findMany({
        where,
        include: {
          company: true,
          industry: true,
          requiredSkills: true
        },
        skip: (page - 1) * limit,
        take: limit
      }),
      prisma.job.count({ where })
    ])

    return {
      success: true,
      data: {
        jobs,
        total,
        pages: Math.ceil(total / limit)
      }
    }
  } catch (error) {
    return { success: false, error: "Failed to search jobs" }
  }
}
