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
import Modal from '@/components/ui/modal';
import { useDeletePost } from '@/hooks/useDeletePost';





export default function PostDetails({params} ) {

  const router = useRouter();
  const [post, setPost] = useState({});
  const [comment, setComment] = useState([]);
  const [loading, setLoading] = useState(true);
  const [owner, setOwner] = useState(false);
  const [error, setError] = useState(null);
  const [hidden, setHidden] = useState(true);
  

  const toggleHidden = () => {
		setHidden(!hidden);
	};

  useEffect(() => {
    getPost(params.postId)
        .then((response) => {
            setPost(response);
            setOwner(response[0].owner);
            setLoading(false);
        });
}, []);

  

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/comments/createComment', {postId: post[0]._id, comment: comment}, {
        withCredentials: true,
            headers: {
            'Content-Type': 'application/json',
        }
      });
      window.location.reload();
      
    } catch (error) {
      setError(error.response.data.message);
    }

  }

  async function handleDelete(event) {
    event.preventDefault(); 

    try {

      const response = await useDeletePost(post[0]._id);
      if (response) {
        router.push('/');
      }
    }
    catch (error) {
      console.log(error);
      setError(error.response);
  }
  }


        
    return (
        <div className="flex w-4/5 justify-center my-8">
          {loading ? <p className='text-text text-2xl'>Loading...</p> :
            <Card className="w-5/6 h-min bg-primary rounded-2xl border-secondary">
              <CardHeader className="h-8 text-text text-base flex flex-row">
              <button className="text-white text-2xl font-medium bg-primary border border-secondary
               rounded-full mr-2 -my-2 h-10 w-10 hover:bg-secondary" onClick={router.back}> ←</button>
                {post[0].created_by} <DotFilledIcon className="" width={18} height={18}/> {dateToString(post[0].created_at)}
                <div className='ml-auto'>
                  <ul>
                  {
                    owner ? (
                      <>
                      <li className="text-red-500 text-lg cursor-pointer" onClick={toggleHidden}>Delete</li>
                      </>
                    ) : (
                      null
                    )
                  }
                  </ul>
                </div>
                </CardHeader>
                <CardHeader>
                  <p className="text-text text-3xl">{post[0].title}</p>
                  { hidden ? (
                    null
                  ) : (
                    <div className='ml-auto'>
                      <p className='text-text'>Are you sure you want to delete this post?</p>
                      <input type="submit" value="Yes" className="bg-red-500 text-white rounded-full py-2 px-4 mr-4 cursor-pointer"
                       onClick={handleDelete}/>
                      <input type="submit" value="No" className="bg-green-500 text-white rounded-full py-2 px-4 cursor-pointer"
                       onClick={toggleHidden}/>
                    </div>
                  )}
                </CardHeader>
                <CardDescription className="text-gray-300 text-lg mx-6">{post[0].content}</CardDescription>
                <CardFooter className="my-6">
                  <CtaButtons numberOfComments={post[0].comments.length}/>
                </CardFooter>
                <CardFooter className="my-6">
                  <form onSubmit={handleSubmit} className='w-full'>
                    <input type="text" className="w-full bg-black text-text border border-secondary rounded-full py-2 px-4
                    focus:outline-none" placeholder="Add a comment..." 
                    value={comment} onChange={(e) => setComment(e.target.value)}/>
                  </form>
                  {error ? <p className='text-red-500'>{error}</p> : null}
                </CardFooter>
                <CommentList comments={post[0].comments}/>
            </Card>
        }
        </div>
    );
  }
