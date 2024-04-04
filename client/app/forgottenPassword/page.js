'use client'

import ForgottenPassword from '@/components/ui/forgotten-password';
import NavBar from '@/components/ui/navbar';

import React, { useState } from 'react'


export default function Home() {
    return (
    <main className="flex min-h-screen flex-col items-center bg-background">
      <NavBar />
      <ForgottenPassword/>
    </main>
  );
}
