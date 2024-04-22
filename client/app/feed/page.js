import Post from "@/components/ui/post"
import Sidebar from "@/components/ui/sidebar"


export default function Feed(){

    
    return (
        <div className="flex h-screen">
            <Sidebar/>
            <div className="flex flex-col h-max w-full ">
                <Post/>
                <Post/>
            </div>
        </div>
    )
}