// "use server"
// import prisma from "@/lib/db"
// import { revalidatePath } from "next/cache"

// export async function updateUserProfile(
//   userId: string,
//   data: {
//     name?: string
//     phone?: string
//     location?: string
//     portfolio?: string
//   }
// ) {
//   try {
//     const user = await prisma.user.update({
//       where: { id: userId },
//       data: data
//     })
//     revalidatePath('/profile')
//     return { success: true, data: user }
//   } catch (error) {
//     return { success: false, error: "Failed to update profile" }
//   }
// }

// export async function addUserSkill(
//   userId: string,
//   data: {
//     skillId: string
//     level: SkillLevel
//   }
// ) {
//   try {
//     const skill = await prisma.userSkill.create({
//       data: {
//         userId,
//         skillId: data.skillId,
//         level: data.level
//       }
//     })
//     revalidatePath('/profile')
//     return { success: true, data: skill }
//   } catch (error) {
//     return { success: false, error: "Failed to add skill" }
//   }
// }

// export async function updateUserPreferences(
//   userId: string,
//   data: {
//     jobAlerts?: boolean
//     alertFrequency?: string
//     desiredSalaryMin?: number
//     desiredSalaryMax?: number
//     preferredLocation?: string
//     preferredJobTypes?: string[]
//     preferredIndustries?: string[]
//   }
// ) {
//   try {
//     const preferences = await prisma.userPreference.upsert({
//       where: { userId },
//       update: data,
//       create: {
//         userId,
//         ...data
//       }
//     })
//     return { success: true, data: preferences }
//   } catch (error) {
//     return { success: false, error: "Failed to update preferences" }
//   }
// }


