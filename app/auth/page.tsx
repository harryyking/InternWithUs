import React from 'react'
import Register from '@/components/register'
import { Header } from '@/components/header'

const page = () => {
  return (
    <div 
    className="relative min-h-screen overflow-hidden"
          style={{
            backgroundImage: "url(https://images.pexels.com/photos/1181274/pexels-photo-1181274.jpeg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
    >
      <Header/>
      <Register id={''}/>
    </div>
  )
}

export default page