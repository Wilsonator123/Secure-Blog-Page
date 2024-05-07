'use client'
import {
    Card,
    CardContent,
  } from "@/components/ui/card"
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import Bold from "@/assets/bold.svg";
import FontIncrease from "@/assets/fontIncrease.svg";
import FontDecrease from "@/assets/fontDecrease.svg";
import axios from "axios";
export default function CreatePostForm(){
    const router = useRouter();
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = async (data) => {
        try{
            const response = await axios.post('http://localhost:8000/posts/createPost',
                {
                    title: data['title'],
                    description: data['description'],
                },
                {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json',
                    }
                }
            )
            const post = response.data.data?.postId ?? ''
            if(response.status === 200){
                router.push(`/posts/${post}`);
            } else {
                console.log('There was an error creating the post');
            }
        }catch(err){
            console.log(err);
        }
    }

    return(
        <Card className="w-full bg-primary border-secondary mt-8 rounded-none">
            <CardContent className="flex w-full mx-auto justify-center">
                <form className="relative flex flex-col justify-center items-center w-[600px] gap-5" onSubmit={handleSubmit(onSubmit)}>
                    <div className="w-full mt-4">
                        {errors.title?.type === "required" && <p className="text-sm text-error">Title is required</p>}
                        {errors.title?.type === "minLength" && <p className="text-sm text-error">Title must be at least 3 characters</p>}
                        <Input className="h-10 rounded-md border-secondary text-text focus:border-accent placeholder:text-[#B7B7B7]"
                        placeholder="Title" {...register("title", {required:true, minLength:3})}/>
                    </div>
                    <div className="relative">
                        {errors.description?.type === "required" && <p className="text-sm text-error">Description is required</p>}
                        {errors.description?.type === "minLength" && <p className="text-sm text-error">Description must be at least 3 characters</p>}
                        <div className="pl-2 gap-5 text-text text-lg bg-select rounded-t-md h-[50px] flex items-center">
                            <div className="w-[30px] h-[35px] overflow-hidden">
                                <Bold width="35" height="35" fill={"#CCCCCC"} className="cursor-pointer"/>
                            </div>
                            <FontIncrease width="35" height="35" fill={"#CCCCCC"} className="cursor-pointer"/>
                            <FontDecrease width="35" height="35" fill={"#CCCCCC"} className="cursor-pointer"/>
                        </div>
                        <textarea className="p-2 w-[600px] h-[200px] text-text border border-secondary border-t-0 rounded-b-md focus:outline-none focus:border-accent bg-transparent"
                        placeholder="Description" {...register("description", {required:true, minLength:3})} />
                    </div>

                    <input type="submit" value="Post" className="text-text cursor-pointer font-semibold self-end border border-accent px-7 py-2 rounded-full hover:bg-accent/60"/>

                </form>
            </CardContent>
        </Card>
    )
}