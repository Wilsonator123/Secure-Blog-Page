'use client'

import React, { useState } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { zxcvbn, zxcvbnOptions, zxcvbnAsync } from "@zxcvbn-ts/core";
import * as zxcvbnCommonPackage from '@zxcvbn-ts/language-common'
import * as zxcvbnEnPackage from '@zxcvbn-ts/language-en'
import { matcherPwnedFactory } from '@zxcvbn-ts/matcher-pwned'
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useRouter } from 'next/navigation';
import axios from 'axios';

const matcherPwned = matcherPwnedFactory(fetch, zxcvbnOptions);
const options = {
    translations: zxcvbnEnPackage.translations,
    graphs: zxcvbnCommonPackage.adjacencyGraphs,
    dictionary: {
        ...zxcvbnCommonPackage.dictionary,
        ...zxcvbnEnPackage.dictionary,
    },
}
zxcvbnOptions.setOptions(options);
zxcvbnOptions.addMatcher('pwned', matcherPwned);

export default function LoginForm({toggle}) {
  //form data states
  const [passwordStrength, setPasswordStrength] = useState(null);
  const [showPassword, setShowPassword] = useState("password");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

    const checkPasswordStrength = (password) => {
        if(password === "") {
            setError("");
            setPasswordStrength(null)
            return;
        }
        zxcvbnAsync(password).then((result) => {
            console.log("Score", result.score);
            setPasswordStrength(result.score);
            setPasswordBar();
            if(result.feedback.warning != null){
                setError(result.feedback.warning);
            }else{
                setError("");
            }
        });
    }

    const setPasswordBar = () => {
        console.log(passwordStrength)
        if(passwordStrength === 0) {
            return <div className="flex flex-col justify-center text-sm w-2/3 text-white">
                Password Strength: Weak
                <div className="w-1/4 h-5 bg-red-800"/>
            </div>

        } else if (passwordStrength === 1) {
            return <div className="flex flex-col justify-center text-sm w-2/3 text-white">
                Password Strength: Weak
                <div className="w-1/4 h-5 bg-red-800"/>
            </div>
        } else if (passwordStrength === 2) {
            return <div className="flex flex-col justify-center text-sm w-2/3 text-white">
                Password Strength: Fair
                <div className="w-1/2 h-5 bg-yellow-200"/>
            </div>
        } else if (passwordStrength === 3) {
            return <div className="flex flex-col justify-center text-sm w-2/3 text-white">
                Password Strength: Good
                <div className="w-3/4 h-5 bg-blue-500"/>
            </div>
        }
        else {
            return <div className="flex flex-col justify-center text-sm w-2/3 text-white">
                Password Strength: Strong
                <div className="w-4/4 h-5 bg-green-800"/>
            </div>
        }
    }

  async function handleSubmit(event){
    event.preventDefault()
    
    try {
        //successful login
        const response = await axios.post('/loginCheck', 
        { 
            email: email, 
            password: password 
        },
        {
            headers: {
            'Content-Type': 'application/json'
        }
        });
        console.log(response)
        router.push('/feed');

    } catch(error){

        if (error.status){
            
            //invalid username or password
            if (error.status === 401 || 404) {
                console.log("The email or password provided is invalid.");
                setError("The email or password provided is invalid.");
            }
            else {
                console.log("There was a problem with the server.");
                setError("There was a problem with the server.");
            }
        }
        else {
            console.log("No response from the server.");
            setError("No response from the server.")
        }
    }
    
  }

  return (
      <Card className="h-3/5 w-2/5 bg-primary border-accent mt-24">
        <CardHeader >
          <CardTitle className="text-2xl m-auto text-text">Login</CardTitle>
          <CardDescription className="m-auto text-text">Login to your CryptoBros account.</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center w-full">
          <form onSubmit={handleSubmit} className="flex flex-col justify-center w-full items-center">
            <Input id="login-email" type="email" className="w-3/5 my-4 h-14 border-secondary text-text"
            required placeholder="E-mail" value={email} autoComplete="email"
            onChange={(e) => setEmail(e.target.value)} />
            <Input id="login-password" type={`${showPassword}`} className="w-3/5 my-4 h-14 border-secondary text-text placeholder-gray-300"
            required placeholder="Password" value={password} autoComplete="current-password"
            onChange={(e) => setPassword(e.target.value)}
            onBlur={(e) => checkPasswordStrength(e.target.value)}
            />
          <Input type="checkbox" onClick={() => setShowPassword(prev => prev === 'text' ? 'password' : 'text')} className="text-text"/>
              {passwordStrength != null ?
                  <>{setPasswordBar()}</>
                : null
              }
            <div className="flex justify-center items-center">
                <Button className="h-12 bg-secondary text-text hover:bg-primary" type="submit" onSubmit={handleSubmit}>Login</Button>
            </div>
            {error && <Alert className="mt-4"><AlertDescription id="error-result">{error}</AlertDescription></Alert>}
          </form>
        </CardContent>
        <CardFooter>
            <a onClick={toggle} className='text-text'>Don't have an account? Click here to signup.</a>
        </CardFooter>
      </Card>
  );
}
