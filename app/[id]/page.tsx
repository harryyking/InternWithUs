import ProfileView from "./_component/profileView"
import UserProfileForm from "@/components/user-form"
import prisma from "@/lib/db"
import { notFound } from "next/navigation"


type ParamsProps = {
  params: {
    id: string
  }
  searchParams: {
    edit?: string
  }
}

async function getUser(id: string) {
  const user = await prisma.user.findUnique({
    where: { id },
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
  const user = await getUser(params.id)
  const isEditMode = searchParams.edit === "true"

  if (isEditMode) {
    return (
      <div className="bg-gray-100">
        

        <UserProfileForm id={user.id} />
      </div>
    )
  }

  return <ProfileView user={user} />
}

