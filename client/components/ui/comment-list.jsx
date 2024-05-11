import React from 'react';
import { CardHeader, CardFooter } from './card';
import { DotFilledIcon } from '@radix-ui/react-icons';
import { dateToString } from '@/helper/time';
import {convertToString} from '@/helper/user';




export default function CommentList({ comments }){

    

    return (
        <div>
        {comments.map((comment) => (
        <div>
        <hr className=' border-1 border-secondary w-11/12 mx-auto'></hr>
        <CardHeader key={comment.comment_id} className="h-12">
            <div className='flex flex-row text-text'>
                {convertToString(comment.created_by)}<DotFilledIcon width={18} height={18} className='mt-1'/>{dateToString(comment.created_at)}
            </div>
        </CardHeader>
        <CardFooter className='mt-4 mb-8 h-min'>
            <h1 className='text-text'>{comment.message}</h1>    
        </CardFooter>
        
        </div>
        ))}
        </div>
    );
};
