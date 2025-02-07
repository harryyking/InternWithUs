// app/actions/job.ts
"use server"
import prisma from "@/lib/db"
import { revalidatePath } from "next/cache"


export async function createJob(
  userId: string,
  data: {
    position: string
    description: string
    companyId: string
    employmentType: EmploymentType
    location: string
    locationType: LocationType
    benefits: string[]
    requirements: string[]
    responsibilities: string[]
    salary: { min: number; max: number }
    email: string
    industryId: string
    requiredSkills: string[]
  }
) {
  try {
    const job = await prisma.job.create({
      data: {
        ...data,
        posterId: userId,
        status: JobStatus.ACTIVE,
        requiredSkills: {
          connect: data.requiredSkills.map(id => ({ id }))
        }
      }
    })
    revalidatePath('/jobs')
    return { success: true, data: job }
  } catch (error) {
    return { success: false, error: "Failed to create job" }
  }
}

export async function updateJobStatus(
  jobId: string,
  status: JobStatus
) {
  try {
    const job = await prisma.job.update({
      where: { id: jobId },
      data: { status }
    })
    revalidatePath('/jobs')
    return { success: true, data: job }
  } catch (error) {
    return { success: false, error: "Failed to update job status" }
  }
}

export async function applyForJob(
  userId: string,
  data: {
    jobId: string
    coverLetter?: string
    resume: string
  }
) {
  try {
    const application = await prisma.jobApplication.create({
      data: {
        jobId: data.jobId,
        applicantId: userId,
        coverLetter: data.coverLetter,
        resume: data.resume
      }
    })
    
    // Create notification for job poster
    const job = await prisma.job.findUnique({
      where: { id: data.jobId },
      select: { posterId: true, position: true }
    })
    
    if (job) {
      await prisma.notification.create({
        data: {
          userId: job.posterId,
          type: "APPLICATION_UPDATE",
          title: "New Job Application",
          message: `New application received for ${job.position}`,
          data: { applicationId: application.id }
        }
      })
    }
    
    revalidatePath('/applications')
    return { success: true, data: application }
  } catch (error) {
    return { success: false, error: "Failed to submit application" }
  }
}

