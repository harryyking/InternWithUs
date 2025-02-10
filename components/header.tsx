
import { getServerSession } from "next-auth"
import { Button } from "./ui/button"
import Link from "next/link"
import { authOptions } from "@/lib/auth"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator, DropdownMenuLabel } from "@/components/ui/dropdown-menu"
import Image from "next/image"
import prisma from "@/lib/db"


export async function Header() {
  const session =  await getServerSession(authOptions)

  if(!session) return (
    <header
    className="relative bg-transparent z-10"
    >
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <a href="/" className="text-lg font-semibold text-primary">
            Work Dey Here
          </a>
        </div>

        <div className="flex items-center gap-4">
        <Link href="/jobs">
          <Button>Post job</Button>
          </Link>

          
          <Link href="/auth">
          <Button variant={"secondary"}>Log in</Button>
          </Link>
          
         
        </div>
      </div>
    </header>
  )

  const profile = session.user.image!

  const user = await prisma.user.findUnique({
    where: {email: session.user.email},
    select: {id: true}
  })

  if(!user) return 

  return (
    <header
    className="relative bg-transparent z-10"
    >
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <a href="/" className="text-lg font-semibold text-primary">
            Work Dey Here
          </a>
        </div>

        <div className="flex items-center gap-4">
        <Link href="/jobs">
          <Button>Post job</Button>
          </Link>

          
          <DropdownMenu>
  <DropdownMenuTrigger>
            <img 
            src={profile}
            alt='profile pic'
            width={40}
            height={40}
            className="rounded-full"
            />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Your Profile</DropdownMenuLabel>
          <DropdownMenuSeparator />

          <Link href={`/${user}`}>
          <DropdownMenuItem>👤 My Profile</DropdownMenuItem>
          </Link>
          
          <Link href='/'>
          <DropdownMenuItem>🖥 Frontpage</DropdownMenuItem>
          </Link>
          <Link href='/talents'>
          <DropdownMenuItem>👔 Hire Talents</DropdownMenuItem>
          </Link>
          <Link href="/">
          <DropdownMenuItem>🛠 Jobs</DropdownMenuItem>
          </Link>
        </DropdownMenuContent>
      </DropdownMenu>
          
         
        </div>
      </div>
    </header>
  )
}

