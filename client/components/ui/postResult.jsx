'use client'

import React from 'react'
import { Card, CardDescription, CardFooter, CardHeader, CardTitle, } from "@/components/ui/card"
import { DotFilledIcon } from '@radix-ui/react-icons';
import { dateToString } from '@/helper/time';
import { useRouter } from 'next/navigation';



export default function Post({ post }) {

  const router = useRouter();

  return (
    <Card className="bg-primary w-6/6 max-h-96 my-4 mx-auto rounded-2xl border-secondary cursor-pointer"
      onClick={() => router.push(`/posts/${post._id}`)}>
      <CardHeader className="h-1 -my-2 text-text text-md flex flex-row">
        <div className='flex justify-between w-full'>
          <div>{post.title}</div>
          <div>{post.created_by}</div>
        </div>
      </CardHeader>
      <CardHeader>
        <CardDescription className="text-text overflow-hidden">{post.content}</CardDescription>
      </CardHeader>
    </Card>
  )
}