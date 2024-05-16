'use client'

import React from 'react'
import { Card, CardDescription, CardFooter, CardHeader, CardTitle, } from "@/components/ui/card"
import CtaButtons from './cta-buttons';
import { DotFilledIcon } from '@radix-ui/react-icons';
import { dateToString } from '@/helper/time';
import { useRouter } from 'next/navigation';



export default function Post({ post }) {


    const router = useRouter();

    const numberOfComments = post.comments.length;

    return (
        <Card className="bg-primary w-6/6 max-h-96 my-4 mx-auto rounded-2xl border-secondary cursor-pointer"
            onClick={() => router.push(`/posts/${post._id}`)}>
            <CardHeader className="h-1 -my-2 text-text text-sm flex flex-row">
                {post.created_by} <DotFilledIcon width={18} height={18} /> {dateToString(post.created_at)}
                
            </CardHeader>
            <CardHeader >
                <CardTitle className="text-xl text-text" >{post.title}</CardTitle>
                <CardDescription className="text-text overflow-hidden">{post.content}</CardDescription>
            </CardHeader>
            <CardFooter className='text-text '>
                <CtaButtons numberOfComments={numberOfComments} />
            </CardFooter>
        </Card>
    )
}