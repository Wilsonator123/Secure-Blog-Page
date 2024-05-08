'use client'

import React, { useState } from 'react';
import { useEffect } from 'react';
import { getPost } from '@/hooks/getPost';

export default function PostDetails({params} ) {

  const [post, setPost] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPost(params.postId)
        .then((response) => {
            setPost(response);
            setLoading(false);
        });
}, []);
        
    return (
        <div className="flex w-full">
          {loading ? <p className='text-text text-2xl'>Loading...</p> :
          <div>
            <h1 className="text-text text-3xl">{post[0].title}</h1>
            <h1 className='text-text text-xl'>{post[0].description}</h1>
          </div>
        }
        </div>
    );
  }
