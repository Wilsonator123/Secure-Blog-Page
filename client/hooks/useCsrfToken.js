import { useState, useEffect } from "react";
import axios from "axios";

const useCsrfToken = () => {
	const [csrfToken, setCsrfToken] = useState("");

	useEffect(() => {
		const fetchCsrfToken = async () => {
			try {
				const response = await axios.get("http://localhost:8000/", {
					withCredentials: true,
				});
				setCsrfToken(response.data.csrfToken);
			} catch (error) {
				console.error("Failed to fetch CSRF token:", error);
			}
		};

		fetchCsrfToken();
	}, []);

	return csrfToken;
};

export default useCsrfToken;

/* 
'use server'


request 

get header 
return the value

useEffect
await getCsrfToken((res) => {
  setState(res)
  setShowForm(true)
  
})
*/
