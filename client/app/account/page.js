'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import Settings from '@/assets/settings.svg'
import PostsCard from '@/components/ui/posts-card'
import UserPFP from '@/components/ui/user-pfp'

export default function Account(){


    return (

        <main className="flex min-h-screen flex-col items-center bg-background">

            <div className="flex items-center justify-center mt-10">

                {/* avatar on the left */}
                <UserPFP/>

                {/* settings button */}
                <div className="-mt-[-100px] ml-[-30px] z-10">
                    <Button variant="outline" className=" bg-primary border-secondary rounded-full p-1">
                        <Settings fill={'#ffff'} width={30} height={30} />
                    </Button>
                    
                </div>

                {/* text on the right */}
                <div className="flex flex-col ml-20">
                    <h1 className="text-5xl text-text font-bold mb-2">Placeholder Name</h1>
                    <h2 className="text-xl text-text">@placeholderat</h2>
                </div>
            </div>

            <div class="w-3/5 mx-auto border-t border-grey-700 m-10"></div>

            <div className="flex flex-col items-center mt-5 mb-5">
                <h1 className="text-2xl text-text font-bold mb-1">Your Content</h1>
                <div class="w-3/5 mx-auto border-t-2 border-secondary "></div>
            </div>

            <br/>

            {/* example cards */}

            <PostsCard/>

            <PostsCard/>
        </main>
    )
}