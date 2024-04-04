import React, { useState } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useRouter } from 'next/navigation';
import axios from 'axios';




export default function LoginForm({toggle}) {

  //form data states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleSubmit(event){
    event.preventDefault()
    //set just to check if response is coming back

    try {
      console.log(email, password);
      const response = await axios.post('http://localhost:8000/login/loginChecker', {
        email: email,
        password: password
      })
      console.log(response);
      if (response.status === 400){
        setError("Incorrect username or password");
      }
      if(response.status === 200){
        console.log(response.status);
        router.push('/feed');
      }
      
    } catch (error) {
      console.log(error);
      setError("There was a problem with the server.")
    }

    
    
  }

  function forgottenPassword (){
    router.push('/forgottenPassword');
  }

  return (
      <Card className="h-3/5 w-2/5 bg-primary border-accent mt-24">
        <CardHeader >
          <CardTitle className="text-2xl m-auto text-text">Sign-in</CardTitle>
          <CardDescription className="m-auto text-text">Sign-in to your CryptoBros account.</CardDescription>
        </CardHeader>
        <CardContent className="">
          <form onSubmit={handleSubmit}>
            <Input id="login-email" type="email" className="w-3/5 m-auto my-4 h-14 border-secondary text-text focus:border-accent" 
            required placeholder="E-mail" value={email} autoComplete="email"
            onChange={(e) => setEmail(e.target.value)}/>
            <Input id="login-password" type="password" className="w-3/5 m-auto my-4 h-14 border-secondary text-text
            focus:border-accent placeholder-gray-300"
            required placeholder="Password" value={password} autoComplete="current-password"
            onChange={(e) => setPassword(e.target.value)}/>
            <a className='text-text' onClick={forgottenPassword}>Forgotten Password? Click here</a>
            <div className="flex justify-center items-center">
                <Button className="h-12  bg-secondary text-text hover:border hover:border-accent" type="submit" onSubmit={handleSubmit}>Login</Button>
            </div>
            {error && <Alert className="mt-4"><AlertDescription id="error-result" className="text-text">{error}</AlertDescription></Alert>}
          </form>
        </CardContent>
        <CardFooter>
            <p onClick={toggle} className='text-text'>Don't have an account? Click <a onClick={toggle} className='text-accent'>here</a> to signup.</p>
        </CardFooter>
      </Card>
  );
}
