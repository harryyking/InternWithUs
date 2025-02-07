"use server"
import prisma from "@/lib/db"

export async function markNotificationAsRead(
  notificationId: string
) {
  try {
    const notification = await prisma.notification.update({
      where: { id: notificationId },
      data: { read: true }
    })
    return { success: true, data: notification }
  } catch (error) {
    return { success: false, error: "Failed to update notification" }
  }
}

export async function createJobAlert(
  userId: string,
  data: {
    query?: string
    location?: string
    industryIds?: string[]
  }
) {
  try {
    const preferences = await prisma.userPreference.upsert({
      where: { userId },
      update: {
        jobAlerts: true,
        ...data
      },
      create: {
        userId,
        jobAlerts: true,
        ...data
      }
    })
    return { success: true, data: preferences }
  } catch (error) {
    return { success: false, error: "Failed to create job alert" }
  }
}