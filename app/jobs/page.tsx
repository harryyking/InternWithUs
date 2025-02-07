import JobPostingForm from '@/components/job-form'
import Reviews from '@/components/reviews'
import React from 'react'

const page = () => {
  return (
   
    <div className='p-4  bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900'>
      <div className="grid grid-cols-1 lg:grid-cols-2">
      <JobPostingForm/>
      <Reviews/>

      </div>
    </div>
  )
}

export default page