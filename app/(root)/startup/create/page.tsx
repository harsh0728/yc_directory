import { auth } from '@/auth';
import StartupForm from '@/components/StartupForm'
import { redirect } from 'next/navigation';
import React from 'react'

const page = async () => {
    const session=await auth();
    if (!session) redirect('/');
    

  return (
    <>
        <section className='pink_container !min-h-[230px]'>
            <h1 className='heading'>Submit Your Startup</h1>
            {/* <p className='sub-heading'>Submit your startup idea and get feedback from our community.</p> */}
        </section>
        <StartupForm/>

    </>
  )
}

export default page