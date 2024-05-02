'use client'

import React from 'react'
import {Card,CardDescription,CardFooter,CardHeader,CardTitle,} from "@/components/ui/card"
import Ellipsis from '@/assets/ellipsis.svg'



export default function Post({post}){

    const numberOfComments = post.comments && Object.keys(post.comments).length;

    var postTime = new Date(post.created_at);
    var current = new Date();
    var str = current.toISOString();
    var timeSincePost = current - postTime;
    
    if (timeSincePost < 60000){
        timeSincePost = Math.floor(timeSincePost/1000);
        timeSincePost = timeSincePost.toString() + " seconds ago";
    } else if (timeSincePost < 3600000){
        timeSincePost = Math.floor(timeSincePost/60000);
        timeSincePost = timeSincePost.toString() + " minutes ago";
    } else if (timeSincePost < 86400000){
        timeSincePost = Math.floor(timeSincePost/3600000);
        timeSincePost = timeSincePost.toString() + " hours ago";
    } else if (timeSincePost < 604800000){
        timeSincePost = Math.floor(timeSincePost/86400000);
        timeSincePost = timeSincePost.toString() + " days ago";
    }
    else if (timeSincePost < 2592000000){
        timeSincePost = Math.floor(timeSincePost/604800000);
        timeSincePost = timeSincePost.toString() + " weeks ago";
    }

    

    


    return (
        <Card className="bg-primary w-4/5 max-h-96 my-4 mx-auto rounded-none border-secondary">
            <CardHeader className="h-1 -my-2 text-text text-sm ">
                Post Authour | {timeSincePost}
                <Ellipsis className="float-right" fill={'#ffffff'}/> 
            </CardHeader>
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