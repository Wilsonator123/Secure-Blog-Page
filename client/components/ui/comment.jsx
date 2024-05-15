

import { useState } from 'react';
import { CardHeader, CardFooter } from './card';
import { DotFilledIcon } from '@radix-ui/react-icons';
import { dateToString } from '@/helper/time';
import {convertToString} from '@/helper/user';
import Ellipsis from '@/assets/ellipsis.svg';
import { useDeleteComment } from '@/hooks/useDeleteComment';


export default function Comment({comment}){

    const [hiddenDelete, setHiddenDelete] = useState(true);

    const toggleHiddenDelete = () => {
		setHiddenDelete(!hiddenDelete);
	};
    


    async function handleDelete(event){
        event.preventDefault();

        try {
            const response = await useDeleteComment(comment.comment_id)
            if(response){
                window.location.reload();
            }
            
        } catch (error) {
            console.error(error)
        }


    }

    return(
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
                      <li className="text-red-500 text-lg cursor-pointer" onClick={toggleHiddenDelete}>Delete</li>
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
            { hiddenDelete ? (
                    null
                  ) : (
                    <div className='ml-auto mt-4'>
                      <p className='text-text'>Are you sure you want to delete this comment?</p>
                      <input type="submit" value="Yes" className="bg-red-500 text-white rounded-full py-2 px-4 mr-4 cursor-pointer"
                       onClick={handleDelete}/>
                      <input type="submit" value="No" className="bg-green-500 text-white rounded-full py-2 px-4 cursor-pointer"
                       onClick={toggleHiddenDelete}/>
                    </div>
                  )}
        </CardFooter>
        
        </div>     
    )
}