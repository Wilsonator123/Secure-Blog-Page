'use client'

import LoginForm from '@/components/ui/login-form';
import SignupForm from '@/components/ui/signup-form';
import React, { useState } from 'react'


export default function Home() {

  const [toggleForm, setToggleForm] = useState(false);

  const toggle = () => {
    setToggleForm(!toggleForm);
  }

  return (
    <main className="flex min-h-screen flex-col items-center bg-background my-4">
      { toggleForm ? <SignupForm toggle={toggle}/> :  <LoginForm toggle={toggle}/> }
    </main>
  );
}