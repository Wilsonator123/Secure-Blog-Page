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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation';


export default function LoginForm() {

  //form data states
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const router = useRouter();

  async function handleSubmit(event){
    event.preventDefault()
  
    if (email == 'bing@gmail.com'){
      alert("LOGIN GREAT SUCCESS");
      router.push('/feed')
      //will contain post request when route set
    }
    else{
      alert("LOGIN NO SUCCESS :(");
    }
  }

  return (
      <Card className="h-3/5 w-2/5">
        <CardHeader >
          <CardTitle className="text-2xl m-auto">Login</CardTitle>
          <CardDescription className="m-auto">Login to your CryptoBros account</CardDescription>
        </CardHeader>
        <CardContent className="justify-center">
          <form onSubmit={handleSubmit}>
            <Input type="email" className="w-3/5 m-auto my-4 h-14" 
            placeholder="E-mail" value={email} autoComplete="email"
            onChange={(e) => setEmail(e.target.value)} ></Input>
            <Input type="password" className="w-3/5 m-auto my-4 h-14" placeholder="Password" value={pass} autoComplete="current-password"
            onChange={(e) => setPass(e.target.value)} ></Input>
            <Button className="h-12 bg-orange-600 " type="submit" onSubmit={handleSubmit}>Login</Button>
          </form>
        </CardContent>
      </Card>
  );
}
