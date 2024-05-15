import React, { useEffect, useState } from "react";
import { usePosts } from "@/hooks/usePosts";
import Post from "@/components/ui/post";


export default function PostList({ args, className }) {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        usePosts(args)
            .then((response) => {
                setPosts(response);
                setLoading(false);
            });
    }, []);



    return (
        <div className={`${className}`} >
            {loading ? <p>Loading...</p> :
                <>
                    {posts.map((post) => (
                        <Post key={post._id} post={post} />
                    ))}
                </>
            }
        </div>
    );
}