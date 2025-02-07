// "use server"
// import prisma from "@/lib/db"
// import { revalidatePath } from "next/cache"



// export async function createCompany(
//   userId: string,
//   data: {
//     name: string
//     description: string
//     logo?: string
//     website?: string
//     industryId: string
//     size: string
//     founded?: number
//     location: string
//   }
// ) {
//   try {
//     const company = await prisma.company.create({
//       data: {
//         ...data,
//         admins: {
//           connect: { id: userId }
//         }
//       }
//     })
//     revalidatePath('/companies')
//     return { success: true, data: company }
//   } catch (error) {
//     return { success: false, error: "Failed to create company" }
//   }
// }
