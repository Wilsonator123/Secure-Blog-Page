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
import ShowPassword from '@/assets/showPassword.svg'
import HidePassword from '@/assets/hidePassword.svg'


export default function LoginForm({toggle}) {
  //form data states

  const [showPassword, setShowPassword] = useState("password");
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
      <Card className="h-3/5 w-1/2 bg-primary border-accent mt-24">
        <CardHeader >
          <CardTitle className="text-2xl m-auto text-text">Sign-in</CardTitle>
          <CardDescription className="m-auto text-text">Sign-in to your CryptoBros account.</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center w-full">
          <form onSubmit={handleSubmit} className=" relative flex flex-col justify-center w-full items-center">
            <Input id="login-email" type="email" className="w-3/5 my-4 h-14 border-secondary text-text focus:border-accent"
            required placeholder="E-mail" value={email} autoComplete="email"
            onChange={(e) => setEmail(e.target.value)} />
            <div className="relative flex w-3/5 justify-center items-center">
                <Input id="login-password" type={`${showPassword}`} className="my-4 h-14 border-secondary text-text placeholder-gray-300 focus:border-accent"
                required placeholder="Password" value={password} autoComplete="current-password"
                onChange={(e) => setPassword(e.target.value)}
                />
              <div onClick={() => setShowPassword(prev => prev === 'text' ? 'password' : 'text')} className="text-text absolute right-2 z-10">
                  {showPassword === 'password' ? <ShowPassword width={30} height={30} fill={'#fff'}/> : <HidePassword width={30} height={30} fill={'#fff'}/>}
              </div>
            </div>
            <div className="flex justify-center items-center">
                <Button variant='secondary' className="h-12 bg-secondary text-text hover:border hover:border-accent" type="submit" onSubmit={handleSubmit}>Login</Button>
            </div>
            {error && <Alert className="mt-4 text-white"><AlertDescription id="error-result">{error}</AlertDescription></Alert>}
          </form>
        </CardContent>
        <CardFooter>
            <p onClick={toggle} className='text-text'>Don't have an account? Click <a onClick={toggle} className='text-accent'>here</a> to signup.</p>
        </CardFooter>
      </Card>
  );
}
