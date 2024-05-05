'use client'

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  import { Input } from "@/components/ui/input";
  import { Textarea } from "./textarea";
  import { useState } from "react";
  import { Button } from "./button";
  

export default function CreatePostForm(){

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [error, setError] = useState("");

    async function handleSubmit(e){
        e.preventDefault();
        console.log(title, content);

        /*try {
            const response = await axios.post('http://localhost:8000/posts/create', {
                title: title,
                content: content
            })

            if(response.status === 200){
                console.log("Post created successfully");
            }
            
          } catch (error) {
              if (error.status === 401){
                  setError("Post creation failed.");
              }
              else{
                  setError("There was a problem with the server.")
              }
          }*/
    }



    return(
        <Card className="w-full bg-primary border-secondary mt-8 ">
            <CardContent className="flex  w-7/8 mx-auto">
                <form className="relative flex flex-col justify-center w-full items-center" onSubmit={handleSubmit}>
                <div className="relative flex flex-col w-full justify-center items-center pb-6">
                    <Input className="my-4 h-14 w-10/12 bg-black border-secondary text-text text-xl focus:border-accent"
                    placeholder="Title" value={title} onChange={(e)=>setTitle(e.target.value)} />
                </div>
                <div className="relative flex flex-col w-full justify-center items-center pb-6">
                    <Textarea className="h-96 w-10/12 bg-black border-secondary text-text text-base focus:border-accent"
                    value={content} onChange={(e)=>setContent(e.target.value)}></Textarea>
                </div>
                <div className="flex justify-end">
                    <Button className="h-12 bg-secondary text-text text-xl hover:border hover:border-accent" type="submit">Submit</Button>
                </div>
                </form>
        </CardContent>
        </Card>
    )
}