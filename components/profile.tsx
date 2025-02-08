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
    <DropdownMenuItem>Profile</DropdownMenuItem>
    <DropdownMenuItem>Billing</DropdownMenuItem>
    <DropdownMenuItem>Team</DropdownMenuItem>
    <DropdownMenuItem>Subscription</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>


    </div>
  )
}

export default Profile