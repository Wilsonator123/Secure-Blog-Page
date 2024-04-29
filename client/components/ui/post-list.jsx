import React from "react";
import usePosts from "@/hooks/usePosts";


export default function PostList() {
    const { posts, loading, error} = usePosts();
    

    if (loading) {
        return <div className="text-text text-2xl">Loading...</div>;
    }

    if (error) {
        return <div className="text-text text-2xl">Error loading posts.</div>;
    }

    return (
        <div>
            {posts.map((post) => (
                <Post key={post.id} post={post}/>
            ))}
        </div>
    );
}