import { Button } from "@/components/ui/button"
import Post from "@/components/ui/post"



export default function Home(){

    
    return (
            <div className="flex flex-col h-max w-full">
                <Button variant="outline" className="my-4 w-3/5 h-16 bg-primary hover:bg-secondary border-border border-secondary mx-auto text-lg text-gray-400">Create New Post</Button>
                <Post/>
                <Post/>
                <Post/>
                <Post/>
                <Post/>
                <Post/>
            </div>  
    )
}