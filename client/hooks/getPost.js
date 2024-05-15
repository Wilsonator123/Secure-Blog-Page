'use server'
import axios from 'axios';
import { cookies } from 'next/headers';

export const getPost = async (postId) => {
    'use server'
    try {
        const id = cookies().get('id');
        if (!id) return false;

        const response = await axios.post('http://localhost:8000/posts/getPosts', {args: {_id: postId}
        }, {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
                Cookie: 'id=' + id.value,
            }})
        return response.data.data
    } catch (error) {
        console.error(error)
        return []
    }
}