'use client'
import React, { useState, useRef } from 'react'
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Captcha from '@/components/ui/captcha';

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

import PasswordBar from "@/components/ui/passwordBar";
import { checkPasswordStrength } from "@/helper/password";

export default function SignupForm({toggle}){

    //states
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [fName, setFName] = useState("");
    const [lName, setLName] = useState("");
    const [error, setError] = useState("");
    const [captcha, setCaptcha] = useState(false);

    const passwordBox = useRef();

    const router = useRouter();


    const [passwordStrength, setPasswordStrength] = useState(null);
    const [passwordMessage, setPasswordMessage] = useState(null);

    const checkPassword = async (password) => {
        if (password === "") {
            setPasswordMessage(null);
            setPasswordStrength(null);
            return false;
        }

        const metRequirements = await checkPasswordStrength(password);

        if(metRequirements.success === false){
            setPasswordMessage(metRequirements.warning);
            setPasswordStrength(metRequirements.score ?? 0);
            return false;
        }else{
            setPasswordMessage(null);
            setPasswordStrength(metRequirements.score);
            return true;
        }

    }

    const confirmPasswordCheck = (confirmPassword) => {
        if (password !== confirmPassword){
            setError("Passwords do not match");
        }else{
            if(error === "Passwords do not match"){
                setError(null);
            }
        }
    }



    //handle signup  submission
    async function handleSubmit(event){
        event.preventDefault();

        if(!captcha){
            setError("Please complete the captcha");
            return;
        }

        if(passwordMessage != null || passwordStrength < 3) {
            setError("Password does not meet requirements");
            passwordBox.current.focus();
            return;
        }

        try {
            const response = await axios.post('http://localhost:8000/login/createUser',
        {
                email: email,
                password: password,
                fname: fName,
                lname: lName,
                dob: dateOfBirth
            },
    {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
            }
            })

            if(response.status === 200){
                router.push('/feed');
            }

        } catch (error) {
            console.log(error)
            if (error.response?.status === 401){
                setError("Email already exists");
            }
            else{
                setError("There was a problem with the server.")
            }
        }

    }


    return (
        <Card className="h-3/5 w-1/2 bg-primary border-accent rounded-3xl my-8">
        <CardHeader >
          <CardTitle className="text-3xl m-auto text-text">Signup</CardTitle>
          <CardDescription className="m-auto text-text">Create your CryptoBros account. 
          A Username will be generated for you upon signup.</CardDescription>
        </CardHeader>


        <CardContent className="justify-center">
        {error && <Alert className="m-2 text-white"><AlertDescription>{error}</AlertDescription></Alert>}
          <form onSubmit={handleSubmit} className='relative flex flex-col justify-center w-full items-center'>
            <div className='relative flex flex-col w-3/5 justify-center items-center'>

                <p className='text-text self-start'>First Name</p>
                <Input type="name" className="mb-4 h-14 bg-black border-secondary text-text focus:border-accent"
                    required value={fName} placeholder="Joe" autoComplete="give-name"
                    onChange={(e) => setFName(e.target.value)}
                />

                <p className='text-text self-start'>Last Name</p>
                <Input type="name" className="mb-4 h-14 bg-black border-secondary text-text focus:border-accent"
                    required value={lName} placeholder="Bloggs" autoComplete="family-name"
                    onChange={(e) => setLName(e.target.value)}
                />

                <p className='text-text self-start'>Date of Birth</p>
                <Input type="date" className="m-auto mb-4 h-14 bg-black border-secondary text-text focus:border-accent"
                    required placeholder="DD/MM/YY" value={dateOfBirth} autoComplete=""
                    onChange={(e) => setDateOfBirth(e.target.value)}
                />

                <p className='text-text self-start'>E-mail</p>
                <Input type="email" className="m-auto mb-4 h-14 bg-black border-secondary text-text focus:border-accent"
                    required placeholder="example@gmail.com" value={email} autoComplete="email"
                    onChange={(e) => setEmail(e.target.value)}
                />

                <p className='text-text self-start'>Password</p>
                <Input type="password" className="m-auto mb-4 h-14 bg-black border-secondary text-text focus:border-accent"
                    required placeholder="Password" value={password} autoComplete="new-password"
                    onChange={(e) => setPassword(e.target.value)}
                    onBlur={(e) => checkPassword(e.target.value)}
                    ref={passwordBox}
                />

            </div>

            {passwordStrength != null ?
            <div className='flex justify-center w-3/5'>
              <PasswordBar passwordStrength={passwordStrength}/>
            </div>
              : null
            }

            {passwordMessage != null ?
              <Alert className="my-4 w-3/4 text-white"><AlertDescription id="password-result">{passwordMessage}</AlertDescription></Alert>
              : null
            }

            <div className='relative flex flex-col w-3/5 justify-center items-center'>
                <p className='text-text self-start'>Confirm Password</p>
                <Input type="password" className="mb-4 h-14 text-text bg-black border-secondary focus:border-accent"
                required placeholder="Confirm Password" value={confirmPassword} autoComplete="new-password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                onBlur={(e) => confirmPasswordCheck(e.target.value)}/>
            </div>

            <Captcha setCaptcha={setCaptcha}/>

            <div className="flex justify-center items-center mt-2">
                <Button variant={'secondary'} className="h-12 bg-secondary text-text text-xl w-96 max-w-xs
               hover:border hover:border-accent" type="submit" onSubmit={handleSubmit}>Signup</Button>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col items-center space-y-4">
            <p className='text-text'>Already have an account? <a onClick={toggle}
             className='text-text underline'>Click here</a> to login.</p>
        </CardFooter>
      </Card>
    )
}