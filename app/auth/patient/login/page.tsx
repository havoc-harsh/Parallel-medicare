"use client"
import React from 'react'
import { SignUp , SignIn} from '@clerk/nextjs'
const page = () => {
  return (
    <div className='flex items-center justify-center pt-20 bg-black h-screen  w-screen'>
      <SignIn routing='hash'/>
    </div>
  )
}

export default page
