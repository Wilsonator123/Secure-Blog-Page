import React from 'react';
import { useState } from 'react';
import { CardHeader, CardFooter } from './card';
import { DotFilledIcon } from '@radix-ui/react-icons';
import { dateToString } from '@/helper/time';
import {convertToString} from '@/helper/user';
import Ellipsis from '@/assets/ellipsis.svg';
import Modal from './modal';
//import EditComment from './edit-comment';
import Comment from './comment';





export default function CommentList({ comments }){

    //const [isModalOpen, setModalOpen] = useState(false);
    //const [loading, setLoading] = useState(true);

    /*const toggleModal = () => {
		setModalOpen(!isModalOpen);
	};*/

    return (
        
        <div>
            
        {comments.map((comment) => (
            <Comment key={comment.comment_id} comment={comment} />
        
        ))}
        </div>
    );
};
