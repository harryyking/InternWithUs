"use server"
import { EducationInput, ProfileFormValues, ProjectInput, WorkInput } from "@/components/user-form"
import { authOptions } from "@/lib/auth"
import prisma from "@/lib/db"
import { getServerSession } from "next-auth"
import { revalidatePath } from "next/cache"


export async function updateUserProfile(
  userId: string,
  data: {
        name: string;
        email: string;
        logo: string[];
        banner: string[];
        skills: string[];
        location: string;
        portfolio?: string;
        linkedin?: string;
        instagram?: string;
        facebook?: string;
        bio: string;
        telegram?: string;
  }
) {
  try {
    const user = await prisma.user.update({
      where: { id: userId },
      data: data
    })
    revalidatePath('/profile')
    return { success: true, data: user }
  } catch (error) {
    return { success: false, error: "Failed to update profile" }
  }
}

// Types for the responses
interface ActionResponse<T> {
    success: boolean;
    data?: T;
    error?: string;
  }
  
  // Server Actions
  export async function updateWork(
    userId: string,
    data: WorkInput & { id?: string }
  ): Promise<ActionResponse<any>> {
    try {
      const session = await getServerSession(authOptions);
      if (!session) throw new Error("User not authorized");
  
      const work = await prisma.work.upsert({
        where: { 
          id: data.id || 'new', // Use 'new' as a fallback for new records
          userId 
        },
        update: {
          name: data.company,
          location: data.location,
          position: data.position,
          startDate: data.startDate,
          endDate: data.endDate,
        },
        create: {
          name: data.company,
          location: data.location,
          position: data.position,
          startDate: data.startDate,
          endDate: data.endDate,
          userId
        },
      });
  
      revalidatePath("/profile");
      return { success: true, data: work };
    } catch (error) {
      console.error("Error updating work experience:", error);
      return { success: false, error: "Failed to update work experience" };
    }
  }
  
  export async function updateProject(
    userId: string,
    data: ProjectInput & { id?: string }
  ): Promise<ActionResponse<any>> {
    try {
      const project = await prisma.project.upsert({
        where: { 
          id: data.id || 'new',
          userId 
        },
        update: {
          name: data.name,
          description: data.description,
          link: data.link,
          startDate: data.startDate,
          endDate: data.endDate,
        },
        create: {
          name: data.name,
          description: data.description,
          link: data.link,
          startDate: data.startDate,
          endDate: data.endDate,
          userId
        },
      });
  
      revalidatePath("/profile");
      return { success: true, data: project };
    } catch (error) {
      return { success: false, error: "Failed to update project" };
    }
  }
  
  export async function updateEducation(
    userId: string,
    data: EducationInput & { id?: string }
  ): Promise<ActionResponse<any>> {
    try {
      const education = await prisma.education.upsert({
        where: { 
          id: data.id || 'new',
          userId 
        },
        update: {
          name: data.institution,
          location: data.location,
          degree: data.degree,
          major: data.major,
          startDate: data.startDate,
          endDate: data.endDate,
        },
        create: {
          name: data.institution,
          location: data.location,
          degree: data.degree,
          major: data.major,
          startDate: data.startDate,
          endDate: data.endDate,
          userId
        },
      });
  
      revalidatePath("/profile");
      return { success: true, data: education };
    } catch (error) {
      return { success: false, error: "Failed to update education" };
    }
  }
  
  