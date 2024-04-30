'use server'
import axios from "axios";

export const verifyCaptcha = async (captcha) => {
    'use server'
    try {
        const response = await axios.get(`https://www.google.com/recaptcha/api/siteverify?secret=${process.env.CAPTCHA_SECRET}&response=${captcha}`,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        return response.data?.success === true;

    } catch (error) {
        console.log(error)
        return false;
    }
}