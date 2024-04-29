'use client'

import React from 'react'
import {Card,CardDescription,CardFooter,CardHeader,CardTitle,} from "@/components/ui/card"


export default function Post({post}){

    const numberOfComments = post.comments && Object.keys(post.comments).length;

    
    return (
        <Card className="bg-primary w-4/5 max-h-96 my-4 mx-auto border-secondary">
            <CardHeader >
                <CardTitle className="text-xl text-text" >{post.title}</CardTitle>
                <CardDescription className="text-text">{post.content}</CardDescription>
            </CardHeader>
            <CardFooter className='text-text '>
                <p>Comments: {numberOfComments}</p>
            </CardFooter>
        </Card>
    )
}