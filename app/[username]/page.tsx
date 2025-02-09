import ProfileView from "./_component/profileView"
import UserProfileForm from "@/components/user-form"
import prisma from "@/lib/db"
import { notFound } from "next/navigation"


type ParamsProps = {
  params: {
    username: string
  }
  searchParams: {
    edit?: string
  }
}

async function getUser(username: string) {
  const user = await prisma.user.findUnique({
    where: { username },
    include: {
      education: true,
      work: true,
      project: true,
    },
  })

  if (!user) {
    notFound()
  }

  return user
}

export default async function Page({ params, searchParams }: ParamsProps) {
  const user = await getUser(params.username)
  const isEditMode = searchParams.edit === "true"

  if (isEditMode) {
    return <UserProfileForm username={user.username} />
  }

  return <ProfileView user={user} />
}

