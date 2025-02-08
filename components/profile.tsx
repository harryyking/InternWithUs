import React from 'react'
import Image from 'next/image'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator, DropdownMenuLabel } from "@/components/ui/dropdown-menu"



const Profile = () => {
  return (
    <div>
        <DropdownMenu>
  <DropdownMenuTrigger>
            <Image 
            src=""
            alt=''
            />
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>Your Profile</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem>My Profile</DropdownMenuItem>
    <DropdownMenuItem>Frontpage</DropdownMenuItem>
    <DropdownMenuItem>Hire Talents</DropdownMenuItem>
    <DropdownMenuItem>Jobs</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>


    </div>
  )
}

export default Profile