'use client'

import NavBar from '@/components/ui/navbar';
import React, { useState } from 'react'
import {Card,CardDescription,CardFooter,CardHeader,CardTitle,} from "@/components/ui/card"
import {Avatar,AvatarFallback,AvatarImage} from "@/components/ui/avatar"
import { Button } from '@/components/ui/button'
import Settings from '@/assets/settings.svg'

export default function Account(){


    return (

        <main className="flex min-h-screen flex-col items-center bg-background">
            <NavBar/>

            <div className="flex flex-row items-center mt-10 w-full justify-center">

                {/* avatar on the left */}
                <Avatar className="responsive-avatar unselectable border-accent">
                    <AvatarImage src=""/>
                    <AvatarFallback>PFP</AvatarFallback>
                </Avatar>

                <div className="flex">
                    <Button variant="secondary" className="w-full h-full rounded-full border-none hover:bg-primary">
                        <Settings/>
                    </Button>
                </div>

                {/* text on the right */}
                <div className="flex flex-col ml-20">
                    <h1 className="text-5xl text-text font-bold mb-5 ">Placeholder Name</h1>
                    <h2 className="text-xl text-text">@placeholderat</h2>
                </div>

            </div>

            <br/>

            <div className="flex flex-col items-center mt-5 mb-5">
                <h1 className="text-2xl text-text font-bold mb-5 ">Your Content</h1>
            </div>

            {/* example cards */}
            <Card className="h-1/5 w-3/5 bg-primary border-secondary mb-5">
                <CardHeader >
                    <CardTitle className="text-xl text-text" >Card Title</CardTitle>
                    <CardDescription className="text-text">Card Description</CardDescription>
                </CardHeader>
                <CardFooter className='text-text'>
                    <p>Card Footer</p>
                </CardFooter>
            </Card>

            <Card className="h-1/5 w-3/5 bg-primary border-secondary mb-5">
                <CardHeader >
                    <CardTitle className="text-xl text-text" >Card Title</CardTitle>
                    <CardDescription className="text-text">Card Description</CardDescription>
                </CardHeader>
                <CardFooter className='text-text'>
                    <p>Card Footer</p>
                </CardFooter>
            </Card>
        </main>
    )
}