'use client'

import Account from '@/components/ui/account';
import SettingsPage from '@/components/ui/settings-page';
import React, { useState } from 'react'


export default function Home() {

  const [toggleForm, setToggleForm] = useState(false);

  const toggle = () => {
    setToggleForm(!toggleForm);
  }

  return (
    <main className="flex min-h-screen flex-col items-center bg-background">
      { toggleForm ? <SettingsPage toggle={toggle}/> :  <Account toggle={toggle}/> }
    </main>
  );
}