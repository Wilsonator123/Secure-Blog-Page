'use server'
const axios = require('axios');
const { cookies } = require('next/headers');

export const useDeletePost = async (postId) => {
    'use server'
    try {
        const id = cookies().get('id');
        if (!id) return false;

        const response = await axios.post('http://localhost:8000/posts/deletePost', {postId: postId}, {
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