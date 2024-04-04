import React, { useState } from 'react'
import { useRouter } from 'next/navigation';
import axios from 'axios';

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


    const [passwordStrength, setPasswordStrength] = useState(null);
    const [passwordMessage, setPasswordMessage] = useState(null);

    const checkPassword = async (password) => {
        if (password === "") {
            setPasswordMessage("Password cannot be empty");
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



    //handle signup  submission
    async function handleSubmit(event){
        event.preventDefault();
        setError("Signup successful :D");
    }


    return (
        <Card className="h-3/5 w-2/5 bg-primary border-accent mt-24">
        <CardHeader >
          <CardTitle className="text-2xl m-auto text-text">Signup</CardTitle>
          <CardDescription className="m-auto text-text">Create your CryptoBros account. 
          A Username will be generated for you upon signup.</CardDescription>
        </CardHeader>
        <CardContent className="justify-center">
          <form onSubmit={handleSubmit}>
            <Input type="name" className="w-3/5 m-auto my-4 h-14 border-secondary text-text focus:border-accent" 
            required placeholder="First Name" value={fName} autoComplete="give-name"
            onChange={(e) => setFName(e.target.value)}/>
            <Input type="name" className="w-3/5 m-auto my-4 h-14 border-secondary text-text focus:border-accent" 
            required placeholder="Last Name" value={lName} autoComplete="family-name"
            onChange={(e) => setLName(e.target.value)}/> 
            <Input type="text" className="w-3/5 m-auto my-4 h-14 border-secondary text-text focus:border-accent" 
            required placeholder="Date of Birth: DD/MM/YY" value={dateOfBirth} autoComplete=""
            onChange={(e) => setDateOfBirth(e.target.value)}/>
            <Input type="email" className="w-3/5 m-auto my-4 h-14 border-secondary text-text focus:border-accent" 
            required placeholder="E-mail" value={email} autoComplete="email"
            onChange={(e) => setEmail(e.target.value)}/>
            <Input type="password" className="w-3/5 m-auto my-4 h-14 border-secondary text-text focus:border-accent"
            required placeholder="Password" value={password} autoComplete="new-password"
            onChange={(e) => setPassword(e.target.value)}
            onBlur={(e) => checkPassword(e.target.value)}
            />

            {passwordStrength != null ?
              <PasswordBar passwordStrength={passwordStrength}/>
              : null
            }

            {passwordMessage != null ?
              <Alert className="mt-4 text-white"><AlertDescription id="password-result">{passwordMessage}</AlertDescription></Alert>
              : null
            }


            <Input type="password" className="w-3/5 m-auto my-4 h-14 text-text"
            required placeholder="Confirm Password" value={confirmPassword} autoComplete="new-password"
            onChange={(e) => setConfirmPassword(e.target.value)} />

            <div className="flex justify-center items-center">
                <Button variant={'secondary'} className="h-12 bg-secondary  text-text" type="submit" onSubmit={handleSubmit}>Signup</Button>
            </div>
            {error && <Alert className="mt-4"><AlertDescription>{error}</AlertDescription></Alert>}
          </form>
        </CardContent>
        <CardFooter>
            <p className='text-text'>Already have an account? Click <a onClick={toggle} className='text-accent'>here </a> to login.</p>
        </CardFooter>
      </Card>
    )
}