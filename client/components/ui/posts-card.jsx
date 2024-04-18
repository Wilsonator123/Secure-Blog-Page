import React, { useState } from 'react'
import {Card,CardDescription,CardFooter,CardHeader,CardTitle,} from "@/components/ui/card"

export default function PostsCard() {
        
    return (
        <div className="h-1/5 w-3/5">
            <Card className="bg-primary border-secondary mb-5">
                <CardHeader >
                    <CardTitle className="text-xl text-text" >Card Title</CardTitle>
                    <CardDescription className="text-text">Card Description</CardDescription>
                </CardHeader>
                <CardFooter className='text-text'>
                    <p>Card Footer</p>
                </CardFooter>
            </Card>
        </div>
    );
}