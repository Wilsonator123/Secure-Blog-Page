import CreatePostForm from "@/components/ui/create-post-form";


export default function create(){
    return(
        <div className="flex flex-col h-max w-full justify-center">
            <div className="w-3/5 my-8 m-auto">
                <p className="text-text text-3xl">Create a post</p>
                <hr className="rounded-none border-1 border-secondary"></hr>
                <CreatePostForm/>
            </div>
        </div>
    )
}