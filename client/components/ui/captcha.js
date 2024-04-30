import ReCAPTCHA from "react-google-recaptcha";
import { verifyCaptcha } from "@/helper/captcha";

export default function Captcha({setCaptcha}) {
    async function onChange(value) {
        const response = await verifyCaptcha(value);
        setCaptcha(response);
    }

    return (
        <ReCAPTCHA
            sitekey="6Lf7rcYpAAAAAOnGkru4oid3GT3A6Na48Njb9MUV"
            onChange={onChange}
            type="image"
            theme="dark"
        />
    );
}