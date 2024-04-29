'use client'

import { Button } from "@/components/ui/button"
import PostList from "@/components/ui/post-list";


export default function Home() {
    

    /*const posts = [ {id: 1, title: "Testing", content: "Testing 1 2 3", votes: 0},
    {id: 2, title: "Bitcoin, more like SHITcoin", content: "See title lmao", votes: -50},
    {id: 3, title: "KEEP HOLD OF YOUR GAMESTOP STONKS", content: "TO THE MOOOOON", votes: 10000} ];*/    

    return (
        <div className="flex flex-col h-max w-full">
            <Button variant="outline" className="my-4 w-3/5 h-16 bg-primary hover:bg-secondary border-border border-secondary mx-auto text-lg text-gray-400">Create New Post</Button>
            <div className="flex flex-col w-4/5 mx-auto">
                <PostList />
            </div>       
        </div>
    );
}

/*{posts.map((post) => (
    <Post key={post.id} post={post} />
))}*/

