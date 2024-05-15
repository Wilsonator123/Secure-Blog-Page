import React from 'react';
import { useState } from 'react';
import { CardHeader, CardFooter } from './card';
import { DotFilledIcon } from '@radix-ui/react-icons';
import { dateToString } from '@/helper/time';
import {convertToString} from '@/helper/user';
import Ellipsis from '@/assets/ellipsis.svg';
import Modal from './modal';
//import EditComment from './edit-comment';





export default function CommentList({ comments }){

    //const [isModalOpen, setModalOpen] = useState(false);
    //const [loading, setLoading] = useState(true);

    /*const toggleModal = () => {
		setModalOpen(!isModalOpen);
	};*/

    return (
        
        <div>
            
        {comments.map((comment) => (
        <div key={comment.comment_id}>
        <hr className=' border-1 border-secondary w-11/12 mx-auto'></hr>
        <CardHeader  className="h-12">
            <div className='flex flex-row text-text'>
                {convertToString(comment.created_by)}<DotFilledIcon width={18} height={18} className='mt-1'/>{dateToString(comment.created_at)}
                <div className='ml-auto'>
                  <Ellipsis className='dropdown'/>
                  <ul>
                  {
                    comment.owner ? (
                      <>
                      <li className="text-text text-lg cursor-pointer" onClick={toggleModal}>Edit</li>
                      <li className="text-red-500 text-lg cursor-pointer">Delete</li>
                      </>
                    ) : (
                      null
                    )
                  }
                  </ul>
                </div>
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
