'use client'

import React, { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import UserPFP from '@/components/ui/user-pfp';
import Mail from '@/assets/mail.svg';
import { Button } from "@/components/ui/button";
import PasswordPin from '@/assets/passwordpin.svg';
import DeleteAccount from '@/assets/deleteaccount.svg';
import Placeholder from '@/assets/placeholder.svg';
import Close from '@/assets/close.svg';
import Logout from '@/assets/logout.svg';
import { logout } from '@/hooks/user';
import Return from '@/assets/return.svg';
import {Input} from '@/components/ui/input';
import ShowPassword from '@/assets/showPassword.svg'
import HidePassword from '@/assets/hidePassword.svg'

export default function SettingsPage({ toggle }) {
  const [activeSetting, setActiveSetting] = useState('');
  const router = useRouter();

  const [showPassword, setShowPassword] = useState("password");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const passwordBox = useRef();
  const emailBox = useRef();


  const handleSignOut = async () => {
    try {
      await logout();
      router.push('/login');
      toggle();  
    } catch (error) {
      console.error('Logout Error:', error);
    }
  };
  const resetToMainSettings = () => {
    setActiveSetting(''); 
  };

  const renderSettingForm = () => {
    switch (activeSetting) {
      case 'email':
        return (
          <section>
            <h2 className="text-text text-2xl font-bold text-center mb-6">Change Email</h2>
            <div className="relative flex flex-col w-full justify-center items-center">
              <label className='text-text absolute -top-2 left-1' htmlFor="login-password">Password</label>

              <Input id="login-password" type={`${showPassword}`} className="my-4 h-14 bg-black border-secondary text-text pl-12 focus:border-accent"
              required value={password} autoComplete="current-password" onChange={(e) => setPassword(e.target.value)} ref={passwordBox}/>

              <div className="text-text absolute left-2 z-10">
                <PasswordPin fill={'#fff'}/>
              </div>

              <div onClick={() => {setShowPassword(prev => prev === 'text' ? 'password' : 'text'); passwordBox.current.focus();}} 
              className="text-text absolute right-2 z-10">
                {showPassword === 'password' ? <HidePassword width={30} height={30} fill={'#fff'}/> : <ShowPassword width={30} height={30} fill={'#fff'}/>}
              </div>
            </div>

            <div className="relative flex flex-col w-full justify-center items-center pb-6">
              <label className='text-text absolute -top-2 left-1' htmlFor="login-email">New E-mail</label>

              <Input id="login-email" type="email" className="my-4 h-14 bg-black border-secondary text-text pl-12 focus:border-accent"
              required value={email} autoComplete="email" ref={emailBox} />

              <div className="text-text absolute left-2 z-10">
                <Mail width={30} height={30} fill={'#fff'}/>
              </div>
            </div>
          </section>
        );
        case 'password':
          return (
            <section>
              <h2 className="text-text text-2xl font-bold text-center mb-6">Change Password</h2>
                <div className="relative flex flex-col w-full justify-center items-center pb-4">
                  <label className='text-text absolute -top-2 left-1' htmlFor="login-email">Email</label>

                  <Input id="login-email" type="email" className="my-4 h-14 bg-black border-secondary text-text pl-12 focus:border-accent"
                  required value={email} autoComplete="email" onChange={(e) => setEmail(e.target.value)} ref={emailBox}/>

                  <div className="text-text absolute left-2 z-10">
                    <Mail width={30} height={30} fill={'#fff'}/>
                  </div>
                </div>
  
                <div className="relative flex flex-col w-full justify-center items-center">
                  <label className='text-text absolute -top-2 left-1' htmlFor="login-password">Password</label>
                  
                  <Input id="login-password" type={`${showPassword}`} className="my-4 h-14 bg-black border-secondary text-text pl-12 focus:border-accent"
                  required value={password} autoComplete="current-password" onChange={(e) => setPassword(e.target.value)} ref={passwordBox}/>

                  <div className="text-text absolute left-2 z-10">
                    <PasswordPin fill={'#fff'}/>
                  </div>

                  <div onClick={() => {setShowPassword(prev => prev === 'text' ? 'password' : 'text'); passwordBox.current.focus();}} 
                  className="text-text absolute right-2 z-10">
                    {showPassword === 'password' ? <HidePassword width={30} height={30} fill={'#fff'}/> : <ShowPassword width={30} height={30} fill={'#fff'}/>}
                  </div>
                </div>
  
                <div className="relative flex flex-col w-full justify-center items-center mt-6">
                  <label className='text-text absolute -top-2 left-1' htmlFor="login-password-new">New Password</label>
                  
                  <Input id="login-password-new" type={`${showPassword}`} className="my-4 h-14 bg-black border-secondary text-text pl-12 focus:border-accent"
                  required value={password} autoComplete="current-password" onChange={(e) => setPassword(e.target.value)} ref={passwordBox}/>

                  <div className="text-text absolute left-2 z-10">
                    <PasswordPin fill={'#fff'}/>
                  </div>

                  <div onClick={() => {setShowPassword(prev => prev === 'text' ? 'password' : 'text'); passwordBox.current.focus();}} 
                  className="text-text absolute right-2 z-10">
                    {showPassword === 'password' ? <HidePassword width={30} height={30} fill={'#fff'}/> : <ShowPassword width={30} height={30} fill={'#fff'}/>}
                  </div>
                </div>
            </section>
          );
      case 'accountInfo':
        return (
          <section>
            <h2 className="text-text text-2xl font-bold text-center mb-6">Change Account Info</h2>
            <div className="text-text text-center mb-4">Manage your account information here.</div>
          </section>
        );
      case '2fa':
        return (
          <section>
            <h2 className="text-text text-2xl font-bold text-center mb-6">Update 2FA Settings</h2>
            <div className="text-text text-center mb-4">Manage your two-factor authentication settings here.</div>
          </section>
        );
      default:
        return <div className="text-text">Select a setting to update.</div>;
    }
  };

  return (
    <main className="flex h-screen w-screen flex-col items-center justify-center bg-opacity-0">
      <Card className="bg-primary border-accent mt-8">
      <CardHeader className="relative flex items-center justify-center w-full p-4">
        {activeSetting ? (
          <Button variant="outline" onClick={resetToMainSettings} className="absolute left-14 top-11 bg-primary border-secondary rounded-full p-0.5">
            <Return fill="#ffff" width={30} height={30} /> 
          </Button>
        ) : (
          // Invisible placeholder
          <span className="absolute left-4 w-6 h-6 opacity-0"> 
            <Return fill="transparent" width={30} height={30} /> 
          </span>
        )}

        <CardTitle className="text-4xl text-white pt-5">
          Settings
        </CardTitle>

        <Button variant="outline" onClick={toggle} className="absolute right-14 top-10 bg-primary border-secondary rounded-full p-0.5">
          <Close fill="#ffff" width={30} height={30} />
        </Button>
      </CardHeader>
        
        <div className="w-4/5 mx-auto border-t border-grey-700 m-5"></div>

        <CardContent className="flex flex-col items-center w-full px-20 py-10">
          {!activeSetting && (
            <div className="grid grid-cols-3 gap-16">

              <div className="flex flex-col items-center space-y-6">
              <UserPFP containerClassName ="mid-avatar" identiconClassName="scale-up"/>
                <Button variant='secondary' onClick={() => setActiveSetting('profile')} className="bg-secondary text-text text-xl border border-transparent hover:border hover:border-accent">
                  Change PFP
                </Button>
              </div>

              <div className="flex flex-col items-center space-y-6">
                <Mail className="w-24 h-24" fill = {'#ffff'}/>
                <Button variant='secondary' onClick={() => setActiveSetting('email')} className="bg-secondary text-text text-xl border border-transparent hover:border hover:border-accent">
                  Change Email
                </Button>
              </div>

              <div className="flex flex-col items-center space-y-6">
                <PasswordPin className="w-24 h-24" fill = {'#ffff'}/>
                <Button variant='secondary' onClick={() => setActiveSetting('password')} className="bg-secondary text-text text-xl border border-transparent hover:border hover:border-accent">
                  Change Password
                </Button>
              </div>

              <div className="flex flex-col items-center space-y-6">
                <Placeholder className="w-24 h-24" fill = {'#ffff'}/>
                <Button variant='secondary' onClick={() => setActiveSetting('accountInfo')} className="bg-secondary text-text text-xl border border-transparent hover:border hover:border-accent">
                  Change Account Info
                </Button>
              </div>

              <div className="flex flex-col items-center space-y-6">
                <Placeholder className="w-24 h-24" fill = {'#ffff'}/>
                <Button variant='secondary' onClick={() => setActiveSetting('2fa')} className="bg-secondary text-text text-xl border border-transparent hover:border hover:border-accent">
                  Change 2FA Settings
                </Button>
              </div>
              
              <div className="flex flex-col items-center space-y-6">
                <DeleteAccount className="w-24 h-24" fill = {'#ffff'}/>
                <Button variant='secondary' onClick={() => setActiveSetting('deleteAccount')} className="bg-secondary text-text text-xl border border-transparent hover:border hover:border-accent">
                  Delete Account
                </Button>
              </div>
            </div>
          )}

          {activeSetting && renderSettingForm()}

        </CardContent>

        <div className="w-4/5 mx-auto border-t border-grey-700 m-5"></div>

        {/* Log out / Submit Button */}
        <CardFooter className="flex flex-col items-center space-y-4 mb-10">
          {activeSetting ? (
            <Button variant='secondary' className="h-12 text-text text-xl w-full max-w-sm mt-10 border-transparent hover:border hover:border-accent" type="submit">
              Submit
            </Button>

          ) : (

            <Button variant='destructive' onClick={handleSignOut} className="h-12 text-text text-xl w-full max-w-sm mt-10 border-transparent hover:border hover:border-accent">
              <Logout fill = {'#ffff'}/>Sign Out
            </Button>
          )}

        </CardFooter>

      </Card>
    </main>
  );
}