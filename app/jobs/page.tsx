import JobPostingForm from '@/components/job-form'
import Reviews from '@/components/reviews'
import React from 'react'
import Link from 'next/link'

const page = () => {
  return (
   <>
   <div className='bg-background p-2 h-24 flex justify-center items-center border border-b '>
    <Link href="/">
      Work Dey Here
    </Link>

   </div> 
    <div className='p-4  bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900'>

       
      <div className="flex lg:flex-row flex-col lg:justify-between gap-6">
      <JobPostingForm/>
      <Reviews/>

      </div>
    </div>
   
   </>
  )
}

export default page