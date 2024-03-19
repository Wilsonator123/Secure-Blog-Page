'use client'

import LoginForm from '@/components/ui/login-form';
import React from 'react'


export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center bg-sky-900">
      <h1 className="p-12 text-4xl text-white">CryptoBros</h1>
      <LoginForm></LoginForm>
    </main>
  );
}
