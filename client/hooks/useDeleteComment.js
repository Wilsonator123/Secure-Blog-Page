'use server'
const axios = require('axios');
const { cookies } = require('next/headers');

export const useDeleteComment = async (comment_id) => {
    'use server'
    try {
        const id = cookies().get('id');
        if (!id) return false;

        const response = await axios.post('http://127.0.0.1:8000/comments/deleteComment', {commentId: comment_id}, {
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