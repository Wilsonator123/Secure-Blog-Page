import React from 'react';
import { useState } from 'react';
import { CardHeader, CardFooter } from './card';
import { DotFilledIcon } from '@radix-ui/react-icons';
import { dateToString } from '@/helper/time';
import { convertToString } from '@/helper/user';
import Ellipsis from '@/assets/ellipsis.svg';
import Modal from './modal';
import UserPFP from './user-pfp';
//import EditComment from './edit-comment';





export default function CommentList({ comments }) {

  //const [isModalOpen, setModalOpen] = useState(false);
  //const [loading, setLoading] = useState(true);

  /*const toggleModal = () => {
  setModalOpen(!isModalOpen);
};*/

  return (

    <div>

      {comments.map((comment) => (
        <div key={comment.comment_id}>
          <hr className=' border-1 border-secondary w-full mx-auto'></hr>
          <CardHeader className="h-12 mb-5">
            <div className="h-10 text-text text-base flex flex-row items-center gap-2 relative">

              <div className='w-7'>
                <UserPFP containerClassName="sm-avatar" identiconClassName="scale-down" user={comment.created_by} />
              </div>
              <div
                className="flex flex-row items-center cursor-pointer justify-center h-8 font-semibold underline"
                onClick={() =>
                  router.push(
                    `${URL}account/${comment.created_by}`
                  )
                }
              >
                {comment.created_by}
              </div>
              <DotFilledIcon
                className=""
                width={18}
                height={18}
              />
              <div>{dateToString(comment.created_at)}</div>

              <div className='ml-auto'>
                <Ellipsis className='dropdown' />
                <ul>
                  {
                    comment.owner ? (
                      <>
                        <li className="text-text text-lg cursor-pointer" >Edit</li>
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
          <CardFooter className='mt-4 mb-8 h-min mx-10'>
            <h1 className='text-text'>{comment.message}</h1>
          </CardFooter>
        </div>
      ))}
    </div>
  );
};
