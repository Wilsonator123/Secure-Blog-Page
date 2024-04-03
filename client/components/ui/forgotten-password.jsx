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

export default function ForgottenPassword(){

    async function handleSubmit(event){
        event.preventDefault();
    }

    return(

        <Card className="h-3/5 w-2/5 bg-primary border-accent mt-24">
        <CardHeader >
          <CardTitle className="text-2xl m-auto text-text">Forgotten Password</CardTitle>
          <CardDescription className="m-auto text-text">Please enter your email below to receive a password recovery link in 
          your inbox.</CardDescription>
        </CardHeader>
        <CardContent className="justify-center">
          <form onSubmit={handleSubmit}>
            <Input id="login-email" type="email" className="w-3/5 m-auto my-4 h-14 border-secondary text-text" 
            required placeholder="E-mail" value={email} autoComplete="email"
            onChange={(e) => setEmail(e.target.value)} ></Input>
            <div className="flex justify-center items-center">
                <Button className="h-12 border-opacity-100 bg-secondary text-text hover:border-accent" type="submit" onSubmit={handleSubmit}>Login</Button>
            </div>
            {error && <Alert className="mt-4"><AlertDescription id="error-result" className="text-text">{error}</AlertDescription></Alert>}
          </form>
        </CardContent>
        <CardFooter className='m-auto'>
            <p className='text-text'>Click <a onClick={toggle} className='text-secondary'>here</a> to return to login page.</p>
        </CardFooter>
      </Card>
    )
}