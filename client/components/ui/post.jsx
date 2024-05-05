'use client'

import React from 'react'
import {Card,CardDescription,CardFooter,CardHeader,CardTitle,} from "@/components/ui/card"
import Ellipsis from '@/assets/ellipsis.svg'
import CtaButtons from './cta-buttons';
import { DotFilledIcon } from '@radix-ui/react-icons';



export default function Post({post}){

    const numberOfComments = post.comments && Object.keys(post.comments).length;

    var postTime = new Date(post.created_at);
    var current = new Date();
    var str = current.toISOString();
    var timeSincePost = current - postTime;
    
    if (timeSincePost < 60000){
        timeSincePost = Math.floor(timeSincePost/1000);
        timeSincePost = timeSincePost.toString() + " seconds ago";
        if (timeSincePost[0] === "1"){
            timeSincePost = "1 second ago";
        }
    } else if (timeSincePost < 3600000){
        timeSincePost = Math.floor(timeSincePost/60000);
        timeSincePost = timeSincePost.toString() + " minutes ago";
        if (timeSincePost[0] === "1"){
            timeSincePost = "1 minute ago";
        }
    } else if (timeSincePost < 86400000){
        timeSincePost = Math.floor(timeSincePost/3600000);
        timeSincePost = timeSincePost.toString() + " hours ago";
        if (timeSincePost[0] === "1"){
            timeSincePost = "1 hour ago";
        }
    } else if (timeSincePost < 604800000){
        timeSincePost = Math.floor(timeSincePost/86400000);
        timeSincePost = timeSincePost.toString() + " days ago";
        if (timeSincePost[0] === "1"){
            timeSincePost = "1 day ago";
        }
    }
    else if (timeSincePost < 2592000000){
        timeSincePost = Math.floor(timeSincePost/604800000);
        timeSincePost = timeSincePost.toString() + " weeks ago";
        if (timeSincePost[0] === "1"){
            timeSincePost = "1 week ago";
        }
    }

    return (
        <Card className="bg-primary w-6/6 max-h-96 my-4 mx-auto rounded-none border-secondary cursor-pointer">
            <CardHeader className="h-1 -my-2 text-text text-sm flex flex-row">
                Post Authour {typeof timeSincePost === "string" ? <><DotFilledIcon width={18} height={18}/> {timeSincePost} </> : ""}
                <Ellipsis className="ml-auto"/>
            </CardHeader>
            <CardHeader >
                <CardTitle className="text-xl text-text" >{post.title}</CardTitle>
                <CardDescription className="text-text overflow-hidden">{post.content}</CardDescription>
            </CardHeader>
            <CardFooter className='text-text '>
                <CtaButtons numberOfComments={numberOfComments}/>
            </CardFooter>
        </Card>
    )
}