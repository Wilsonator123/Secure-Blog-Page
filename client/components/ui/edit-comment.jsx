
import React from 'react';
import { Card } from './card';
import axios from 'axios';
import { useState } from 'react';
import { useUpdateComment } from '@/hooks/useUpdateComment';


const EditComment = ({ commentId, message }) => {

    
    const [newMessage, setNewMessage] = useState(message);
    const [error, setError] = useState(null);

    console.log(commentId);
    
    async function handleSubmit(event) {
        event.preventDefault();

        try {
            const id = cookies().get('id');
            if (!id) return false;

            const response = await useEditComment(commentId, message)
            window.location.reload();
        } catch (error) {
            setError(error.response);
            console.log(error.response);
        }


        
    };
    


    return (
        <Card className="bg-primary h-20">
            <form onSubmit={handleSubmit}>
                <textarea className=''
                value={newMessage} onChange={(e) => setNewMessage(e.target.value)} />
                <p className="text-text">{commentId}</p>
                <button type="submit">Submit</button>
            </form>
        </Card>
    );
};

export default EditComment;