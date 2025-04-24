"use client"
import { RegisterScheme } from '@/schemas'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'
import * as z from 'zod'

const UserPage = () => {

    const [user , setUser] = useState<z.infer<typeof RegisterScheme>>()
    const router = useRouter();

    useEffect(() => {
        const userResponse = localStorage.getItem("user")
        if(!userResponse){
            toast.error("No user exists Please sign in")
            router.push("/register")
        }
        const user =  JSON.parse(userResponse as string)
        setUser(user)
    },[router])

  return (
    <div className='h-full border border-gray-300 relative' >
        <nav className='bg-white h-16 flex px-4 items-center' >
            Accounts Settings
        </nav>
        <div className='flex flex-col gap-4'>
            <div className='flex mx-5 mt-6 gap-4'>
                <div className='rounded-full w-fit h-fit relative'>
                    <Image src="/Ellipse 114.png" alt="img" width={96} height={96} className='size-16' />
                    <Image src="/Group 1585.svg" alt='img2' width={16} height={16} className='absolute bottom-0 right-0' />
                </div>
                <div className='flex flex-col'>
                    <h1 className='font-semibold text-sm'>{user?.Full_Name}</h1>
                    <p>{user?.Email_Address}</p>
                </div>
            </div>
            <p className='m-5'>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sunt, rerum deleniti dignissimos adipisci perspiciatis Lorem ipsum dolor sit.
            </p>
        </div>
        <div className='h-[0.5px] w-full border-dashed border-b-[2px] border-[#CBCBCB]'/>
        <div className='h-[0.5px] absolute bottom-8 w-full border-dashed border-b-[2px] border-[#CBCBCB]'/>
    </div>
  )
}

export default UserPage
