'use client'

import React, { useState } from 'react';
import { useEffect } from 'react';
import { getPost } from '@/hooks/getPost';
import { Card, CardDescription, CardFooter, CardHeader } from '@/components/ui/card';
import { dateToString } from '@/helper/time';
import { DotFilledIcon } from '@radix-ui/react-icons';
import { useRouter } from 'next/navigation';
import CtaButtons from '@/components/ui/cta-buttons';
import CommentList from '@/components/ui/comment-list';
import Ellipsis from '@/assets/ellipsis.svg'
import axios from 'axios';

export default function PostDetails({params} ) {

  const router = useRouter();
  const [post, setPost] = useState({});
  const [comment, setComment] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPost(params.postId)
        .then((response) => {
            setPost(response);
            setLoading(false);
        });
}, []);

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/posts/updateComment', {args: {title: post[0].title},
       action: 'add', data : {message: comment}}, {
        withCredentials: true,
            headers: {
            'Content-Type': 'application/json',
        }
      });
      console.log(response);
    } catch (error) {
      console.error(error);
    }

  }

 
        
    return (
        <div className="flex w-4/5 justify-center my-8">
          {loading ? <p className='text-text text-2xl'>Loading...</p> :
            <Card className="w-5/6 h-min bg-primary rounded-none border-secondary">
              <CardHeader className="h-8 text-text text-base flex flex-row">
              <button className="text-white text-2xl font-medium bg-primary border border-secondary
               rounded-full mr-2 -my-2 h-10 w-10 hover:bg-secondary" onClick={router.back}> ←</button>
                {post[0].created_by} <DotFilledIcon className="" width={18} height={18}/> {dateToString(post[0].created_at)}
                <Ellipsis className="ml-auto"/>
                </CardHeader>
                <CardHeader>
                  <p className="text-text text-3xl">{post[0].title}</p>
                </CardHeader>
                <CardDescription className="text-gray-300 text-lg mx-6">{post[0].description}</CardDescription>
                <CardFooter className="my-6">
                  <CtaButtons numberOfComments={post[0].comments.length}/>
                </CardFooter>
                <CardFooter className="my-6">
                  <form onSubmit={handleSubmit} className='w-full'>
                    <input type="text" className="w-full bg-black text-text border border-secondary rounded-full py-2 px-4
                    focus:outline-none" placeholder="Add a comment..." 
                    value={comment} onChange={(e) => setComment(e.target.value)}/>
                  </form>
                </CardFooter>
                <CommentList comments={post[0].comments}/>
            </Card>
        }
        </div>
    );
  }
