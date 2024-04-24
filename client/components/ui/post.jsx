import React from 'react'
import {Card,CardDescription,CardFooter,CardHeader,CardTitle,} from "@/components/ui/card"


export default function Post({authour, title, content, votes}){

    const posts = [ {
        "title": "Post Title",
        "authour": "Post Puy",
        "content": "This is the content of the post",
        "votes": 0,
    }]

    return (
        <Card className="bg-primary w-4/5 max-h-96 my-4 mx-auto border-secondary">
            <CardHeader >
                <CardTitle className="text-xl text-text" >{posts[0].title}</CardTitle>
                <CardDescription className="text-text">{posts[0].content}</CardDescription>
            </CardHeader>
            <CardFooter className='text-text '>
                <p>Votes: {posts[0].votes}</p>
            </CardFooter>
        </Card>
    )
}