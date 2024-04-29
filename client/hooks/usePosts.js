'use server'
import axios from 'axios';

export const usePosts = async () => {
    'use server'
    try {
        const response = await axios.post('http://localhost:8000/posts/getPosts')
        return response.data.data
    } catch (error) {
        console.error(error)
        return []
    }
}
