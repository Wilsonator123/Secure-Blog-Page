import React from 'react';
import { useState } from 'react';
import { CardHeader, CardFooter } from './card';
import { DotFilledIcon } from '@radix-ui/react-icons';
import { dateToString } from '@/helper/time';
import { convertToString } from '@/helper/user';
import Ellipsis from '@/assets/ellipsis.svg';
import Modal from './modal';
import UserPFP from './user-pfp';
import { useDeleteComment } from '@/hooks/useDeleteComment';
//import EditComment from './edit-comment';





export default function CommentList({ comments }) {
  const [hiddenDelete, setHiddenDelete] = useState(true);

  const toggleHiddenDelete = () => {
    setHiddenDelete(!hiddenDelete);
  };

  //const [isModalOpen, setModalOpen] = useState(false);
  //const [loading, setLoading] = useState(true);

  /*const toggleModal = () => {
  setModalOpen(!isModalOpen);
};*/

  async function handleDelete(commentId) {

    try {
      const response = await useDeleteComment(commentId)
      if (response) {
        window.location.reload();
      }

    } catch (error) {
      console.error(error)
    }
  }

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
                        <li className="text-red-500 text-lg cursor-pointer" onClick={() => setHiddenDelete(false)}>Delete</li>
                          { hiddenDelete ? (
                              null
                          ) : (
                              <div className='ml-auto mt-4'>
                                <p className='text-text'>Are you sure you want to delete this comment?</p>
                                <input type="submit" value="Yes" className="bg-red-500 text-white rounded-full py-2 px-4 mr-4 cursor-pointer"
                                       onClick={() => handleDelete(comment.comment_id)}/>
                                <input type="submit" value="No" className="bg-green-500 text-white rounded-full py-2 px-4 cursor-pointer"
                                       onClick={() => setHiddenDelete(true)}/>
                              </div>
                          )}
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
}
