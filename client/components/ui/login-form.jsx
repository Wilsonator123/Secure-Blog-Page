import React, { useState, useRef } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Oauth from './oauth';

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useRouter } from 'next/navigation';
import axios from 'axios';
import ShowPassword from '@/assets/showPassword.svg'
import HidePassword from '@/assets/hidePassword.svg'
import Mail from '@/assets/mail.svg'
import PasswordIcon from '@/assets/password.svg'



export default function LoginForm({toggle}) {
    const passwordBox = useRef();
  //form data states

  const [showPassword, setShowPassword] = useState("password");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();



  async function handleSubmit(event){
    event.preventDefault();

    try {
      
      const response = await axios.post('http://localhost:8000/login/loginChecker', {
        email: email,
        password: password
      })
      console.log(response);
      if (response.status === 401){
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
      <Card className="h-3/5 w-1/2 bg-primary border-accent mt-8 rounded-3xl">
        <CardHeader >
          <CardTitle className="text-3xl m-auto mt-16 text-text">Sign In</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center w-full">
          <form onSubmit={handleSubmit} className="relative flex flex-col justify-center w-full items-center">
            <div className="relative flex flex-col w-3/5 justify-center items-center pb-6">
              <p className='text-text absolute -top-2 left-1'>E-mail</p>
              <Input id="login-email" type="email" className="my-4 h-14 bg-black border-secondary text-text
              pl-12 focus:border-accent"
              required value={email} autoComplete="email"
              onChange={(e) => setEmail(e.target.value)} />
              <div className="text-text absolute left-2 z-10">
                <Mail width={30} height={30} fill={'#fff'}/>
              </div>
            </div>
            <div className="relative flex flex-col w-3/5 justify-center items-center">
                <p className='text-text absolute -top-2 left-1'>Password</p>
                <Input id="login-password" type={`${showPassword}`} className="my-4 h-14 bg-black border-secondary text-text
                pl-12 focus:border-accent"
                required value={password} autoComplete="current-password"
                onChange={(e) => setPassword(e.target.value)}
                ref={passwordBox}
                />
                <div className="text-text absolute left-2 z-10">
                  <PasswordIcon  fill={'#fff'}/>
                </div> 
              <div onClick={() => {
                  setShowPassword(prev => prev === 'text' ? 'password' : 'text')
                  passwordBox.current.focus();

              }} className="text-text absolute right-2 z-10">
                  {showPassword === 'password' ? <HidePassword width={30} height={30} fill={'#fff'}/> : <ShowPassword width={30} height={30} fill={'#fff'}/>}
              </div>
          </div>
          <div className='flex flex-row w-3/5 -mt-3 mb-8 justify-end'>
            <a onClick={forgottenPassword} className='text-text 
             underline self-end'>Forgot your password?</a>
          </div>
          <div className="flex justify-center items-center">
              <Button variant='secondary' className="h-12 bg-secondary text-text text-xl w-96 max-w-xs
               hover:border hover:border-accent" type="submit" onSubmit={handleSubmit}>Sign In</Button>
          </div>
            {error && <Alert className="mt-4 text-white"><AlertDescription id="error-result">{error}</AlertDescription></Alert>}
          </form>
        </CardContent>
        <div className='flex flex-row items-center'>
          <hr className='border-text w-96 ml-16'/><p className='text-text m-4'>Or</p><hr className='border-text w-96'/>
        </div>
        <CardFooter className="flex flex-col items-center space-y-4 mb-32">
            <Oauth />
            <div>
              <p onClick={toggle} className='text-text'>Don't have an account? <a onClick={toggle}
               className='text-text underline hover:border-accent'>Signup.</a> </p>
            </div>
        </CardFooter>
        
      </Card>
  );
}
