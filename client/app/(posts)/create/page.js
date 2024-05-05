'use client';
import CreatePostForm from "@/components/ui/create-post-form";
import { useRouter } from "next/navigation";

export default function create(){
    const router = useRouter();
    return(
        <div className="flex flex-col h-max w-full justify-center relative">
            <button className="text-white absolute top-5 left-5 border rounded-full px-2 py-1" onClick={router.back}> ← Back</button>
            <div className="w-[750px] my-[80px] m-auto">
                <p className="text-text text-3xl">Create a post</p>
                <hr className="rounded-none border-1 border-secondary"></hr>
                <CreatePostForm/>
            </div>
        </div>
    )
}