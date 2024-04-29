import React, {useEffect, useState} from "react";
import { usePosts } from "@/hooks/usePosts";


export default function PostList() {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        usePosts()
            .then((response) => {
                setPosts(response);
                setLoading(false);
            });
    }, []);

    return (
        <div>
            {loading ? <p>Loading...</p> :
                <>
                    {posts.map((post) => (
                        <div key={post.id} className="flex flex-col my-4 p-4 bg-primary border-border border-secondary">
                            <p className="text-text text-2xl">{post.title}</p>
                            <p className="text-text text-lg">{post.content}</p>
                            <p className="text-text text-lg">Votes: test</p>
                        </div>
                    ))}
                </>
            }
        </div>
    );
}