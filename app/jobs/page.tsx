import JobPostingForm from '@/components/job-form'
import Reviews from '@/components/reviews'
import React from 'react'
import Link from 'next/link'

const page = () => {
  return (
   <>
   <div className='bg-primary p-2 h-24 flex justify-center items-center border-b shadow-sm '>
    <Link href="/">
      Work Dey Here
    </Link>

   </div> 
    <div className='p-4  bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900'>

      <JobPostingForm/>
    </div>
   
   </>
  )
}

export default page