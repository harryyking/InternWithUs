import { Button } from '@/components/ui/button'
import prisma from '@/lib/db'
import React from 'react'

type Paramprops = {
  params: {
    id: string
  }
}

  

const page = async({params}: Paramprops) => {
  const jobId = await prisma.job.findUnique({
    where: {id: params.id}
  })

  if(!jobId) return null

 

  return (
    <div className='max-w-6xl mx-auto bg-gray-50 min-h-screen px-2 py-6'>
      <h1 className='mb-8'>
      <span className='text-4xl font-semibold'>{jobId.companyName}</span> is hiring a {jobId.position}
      </h1>

      <p className='prose mb-10'>{jobId.description}</p>


      <Button size={"lg"} className='m-auto'>Apply for this job</Button>


    </div>
  )
}

export default page