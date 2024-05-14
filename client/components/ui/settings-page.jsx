'use client'

import React, { useState, useRef, useEffect } from 'react';
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
import Return from '@/assets/return.svg';
import { updateUser, logout } from '@/hooks/user';
import { Input } from '@/components/ui/input';
import ShowPassword from '@/assets/showPassword.svg';
import HidePassword from '@/assets/hidePassword.svg';
import axios from 'axios';

export default function SettingsPage({ user, toggle }) {
  const [activeSetting, setActiveSetting] = useState('');
  const router = useRouter();

  const [showPassword, setShowPassword] = useState("password");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [error, setError] = useState("");
  const passwordBox = useRef();
  const emailBox = useRef();
  const [isChecked, setIsChecked] = useState(false);

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
    setIsChecked(false);
  };

  const handleSubmit = async (updates) => {
    if (!isChecked) {
      setError('Please confirm the changes by checking the checkbox.');
      return;
    }

    try {
      const response = await axios.post('http://127.0.0.1:8000/account/updateUser', {
        userid: user.id,
        currentPassword: password,
        updates
      }, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (response.status === 200) {
        alert('Update successful!');
      }

    } catch (error) {
      console.error(error);
      if (error.response?.status === 401) {
        setError("Unauthorized");
      } else {
        setError("There was a problem with the server.");
      }
    }
  };

  useEffect(() => {
    async function fetchUser() {
      await updateUser();
    }
    fetchUser();
  }, []);

  const renderSettingForm = () => {
    switch (activeSetting) {
      case 'email':
        return (
          <section>
            <h2 className="text-text text-2xl font-bold text-center mb-2">Change Email</h2>
            <div className="text-text text-center mb-8">Change the Email attached to your account</div>

            <div className="relative flex flex-col w-full justify-center items-center">
              <label className='text-text absolute -top-2 left-1' htmlFor="login-password">Password</label>

              <Input id="login-password" type={showPassword} className="my-4 h-14 bg-black border-secondary text-text pl-12 focus:border-accent"
                required value={password} autoComplete="current-password" onChange={(e) => setPassword(e.target.value)} ref={passwordBox} />

              <div className="text-text absolute left-2 z-10">
                <PasswordPin fill={'#fff'} />
              </div>

              <div onClick={() => { setShowPassword(prev => prev === 'text' ? 'password' : 'text'); passwordBox.current.focus(); }}
                className="text-text absolute right-2 z-10">
                {showPassword === 'password' ? <HidePassword width={30} height={30} fill={'#fff'} /> : <ShowPassword width={30} height={30} fill={'#fff'} />}
              </div>
            </div>

            <div className="relative flex flex-col w-full justify-center items-center mt-6">
              <label className='text-text absolute -top-2 left-1' htmlFor="newEmail">New E-mail</label>

              <Input id="newEmail" type="email" className="my-4 h-14 bg-black border-secondary text-text pl-12 focus:border-accent"
                required value={email} autoComplete="email" onChange={(e) => setEmail(e.target.value)} ref={emailBox} />

              <div className="text-text absolute left-2 z-10">
                <Mail width={30} height={30} fill={'#fff'} />
              </div>
            </div>

            <div className="flex items-center justify-center mt-4">
              <input type="checkbox" id="confirmDelete" checked={isChecked} onChange={e => setIsChecked(e.target.checked)} className="w-6 h-6" />
              <label htmlFor="confirmDelete" className="ml-2 text-text">I would like to make these changes.</label>
            </div>

            {error && <div className="text-red-500 text-center mt-2">{error}</div>}
          </section>
        );
      case 'password':
        return (
          <section>
            <h2 className="text-text text-2xl font-bold text-center mb-2">Change Password</h2>
            <div className="text-text text-center mb-8">Change the Password attached to your account</div>

            <div className="relative flex flex-col w-full justify-center items-center pb-4">
              <label className='text-text absolute -top-2 left-1' htmlFor="login-email">Email</label>

              <Input id="login-email" type="email" className="my-4 h-14 bg-black border-secondary text-text pl-12 focus:border-accent"
                required value={email} autoComplete="email" onChange={(e) => setEmail(e.target.value)} ref={emailBox} />

              <div className="text-text absolute left-2 z-10">
                <Mail width={30} height={30} fill={'#fff'} />
              </div>
            </div>

            <div className="relative flex flex-col w-full justify-center items-center">
              <label className='text-text absolute -top-2 left-1' htmlFor="login-password">Password</label>

              <Input id="login-password" type={showPassword} className="my-4 h-14 bg-black border-secondary text-text pl-12 focus:border-accent"
                required value={password} autoComplete="current-password" onChange={(e) => setPassword(e.target.value)} ref={passwordBox} />

              <div className="text-text absolute left-2 z-10">
                <PasswordPin fill={'#fff'} />
              </div>

              <div onClick={() => { setShowPassword(prev => prev === 'text' ? 'password' : 'text'); passwordBox.current.focus(); }}
                className="text-text absolute right-2 z-10">
                {showPassword === 'password' ? <HidePassword width={30} height={30} fill={'#fff'} /> : <ShowPassword width={30} height={30} fill={'#fff'} />}
              </div>
            </div>

            <div className="relative flex flex-col w-full justify-center items-center mt-6">
              <label className='text-text absolute -top-2 left-1' htmlFor="login-password-new">New Password</label>

              <Input id="login-password-new" type={showPassword} className="my-4 h-14 bg-black border-secondary text-text pl-12 focus:border-accent"
                required value={newPassword} autoComplete="current-password" onChange={(e) => setNewPassword(e.target.value)} ref={passwordBox} />

              <div className="text-text absolute left-2 z-10">
                <PasswordPin fill={'#fff'} />
              </div>

              <div onClick={() => { setShowPassword(prev => prev === 'text' ? 'password' : 'text'); passwordBox.current.focus(); }}
                className="text-text absolute right-2 z-10">
                {showPassword === 'password' ? <HidePassword width={30} height={30} fill={'#fff'} /> : <ShowPassword width={30} height={30} fill={'#fff'} />}
              </div>
            </div>

            <div className="flex items-center justify-center mt-4">
              <input type="checkbox" id="confirmDelete" checked={isChecked} onChange={e => setIsChecked(e.target.checked)} className="w-6 h-6" />
              <label htmlFor="confirmDelete" className="ml-2 text-text">I would like to make these changes.</label>
            </div>

            {error && <div className="text-red-500 text-center mt-2">{error}</div>}
          </section>
        );
      case 'accountInfo':
        return (
          <section>
            <h2 className="text-text text-2xl font-bold text-center mb-2">Change Account Information</h2>
            <div className="text-text text-center mb-8">This does not change your username.</div>

            <div className="relative flex flex-col w-full justify-center items-center mb-6">
              <label className='text-text absolute -top-2 left-1' htmlFor="login-password">Password</label>

              <Input id="login-password" type={showPassword} className="my-4 h-14 bg-black border-secondary text-text pl-12 focus:border-accent"
                required value={password} autoComplete="current-password" onChange={(e) => setPassword(e.target.value)} ref={passwordBox} />

              <div className="text-text absolute left-2 z-10">
                <PasswordPin fill={'#fff'} />
              </div>

              <div onClick={() => { setShowPassword(prev => prev === 'text' ? 'password' : 'text'); passwordBox.current.focus(); }}
                className="text-text absolute right-2 z-10">
                {showPassword === 'password' ? <HidePassword width={30} height={30} fill={'#fff'} /> : <ShowPassword width={30} height={30} fill={'#fff'} />}
              </div>
            </div>

            <div className="relative flex flex-col w-full justify-center items-center pb-6">
              <label className='text-text absolute -top-2 left-1' htmlFor="newFname">First Name</label>

              <Input id="newFname" type="name" className="my-4 h-14 bg-black border-secondary text-text pl-12 focus:border-accent"
                required value={fName} placeholder="Joe" autoComplete="given-name" onChange={(e) => setFName(e.target.value)} />
            </div>

            <div className="relative flex flex-col w-full justify-center items-center">
              <label className='text-text absolute -top-2 left-1' htmlFor="newLname">Last Name</label>

              <Input id="newLname" type="name" className="my-4 h-14 bg-black border-secondary text-text pl-12 focus:border-accent"
                required value={lName} placeholder="Bloggs" autoComplete="family-name" onChange={(e) => setLName(e.target.value)} />
            </div>

            <div className="flex items-center justify-center mt-4">
              <input type="checkbox" id="confirmDelete" checked={isChecked} onChange={e => setIsChecked(e.target.checked)} className="w-6 h-6" />
              <label htmlFor="confirmDelete" className="ml-2 text-text">I would like to make these changes.</label>
            </div>

            {error && <div className="text-red-500 text-center mt-2">{error}</div>}
          </section>
        );
      case 'deleteAccount':
        return (
          <section>
            <h2 className="text-text text-2xl font-bold text-center mb-2">Account Deletion</h2>
            <div className="text-text text-center mb-8">Delete your account off the website here</div>

            <div className="relative flex flex-col w-full justify-center items-center">
              <label className='text-text absolute -top-2 left-1' htmlFor="login-password">Password</label>

              <Input id="login-password" type={showPassword} className="my-4 h-14 bg-black border-secondary text-text pl-12 focus:border-accent"
                required value={password} autoComplete="current-password" onChange={(e) => setPassword(e.target.value)} ref={passwordBox} />

              <div className="text-text absolute left-2 z-10">
                <PasswordPin fill={'#fff'} />
              </div>

              <div onClick={() => { setShowPassword(prev => prev === 'text' ? 'password' : 'text'); passwordBox.current.focus(); }}
                className="text-text absolute right-2 z-10">
                {showPassword === 'password' ? <HidePassword width={30} height={30} fill={'#fff'} /> : <ShowPassword width={30} height={30} fill={'#fff'} />}
              </div>
            </div>

            <div className="flex items-center justify-center mt-4">
              <input type="checkbox" id="confirmDelete" checked={isChecked} onChange={e => setIsChecked(e.target.checked)} className="w-6 h-6" />
              <label htmlFor="confirmDelete" className="ml-2 text-text">I understand that this action cannot be reversed.</label>
            </div>

            {error && <div className="text-red-500 text-center mt-2">{error}</div>}
          </section>
        );
      default: // 2FA 
        return (
        <section>
        <h2 className="text-text text-2xl font-bold text-center mb-2">Update 2FA Settings</h2>
        <div className="text-text text-center mb-8">Manage your two-factor authentication settings here.</div>

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

          <div className="flex items-center justify-center mt-4">
            <input type="checkbox" id="confirmDelete" checked={isChecked} onChange={e => setIsChecked(e.target.checked)} className="w-6 h-6"/>
            <label htmlFor="confirmDelete" className="ml-2 text-text">I would like to make these changes.</label>
          </div>

      </section>
    );
  }
  };

  return (
    <main className="flex h-screen w-screen flex-col items-center justify-center bg-opacity-0">
      <Card className="bg-primary border-accent mt-8 min-w-[700px]">
        <CardHeader className="relative flex items-center justify-center w-full p-4">
          {activeSetting ? (
            <Button variant="outline" onClick={resetToMainSettings} className="absolute left-14 top-11 bg-primary border-secondary rounded-full p-0.5">
              <Return fill="#ffff" width={30} height={30} />
            </Button>
          ) : (
            <span className="absolute left-4 w-6 h-6 opacity-0">
              <Return fill="transparent" width={30} height={30} />
            </span>
          )}

          <CardTitle className="text-4xl text-white pt-5">Settings</CardTitle>

          <Button variant="outline" onClick={toggle} className="absolute right-14 top-10 bg-primary border-secondary rounded-full p-0.5">
            <Close fill="#ffff" width={30} height={30} />
          </Button>
        </CardHeader>

        <div className="w-4/5 mx-auto border-t border-grey-700 m-5"></div>

        <CardContent className="flex flex-col items-center w-full px-20 py-10">
          {!activeSetting && (
            <div className="grid grid-cols-3 gap-16">
              <div className="flex flex-col items-center space-y-6">
                <UserPFP containerClassName="mid-avatar" identiconClassName="scale-up" />
                <h1 className="text-3xl text-text mb-2">{user?.fname}</h1>
              </div>

              <div className="flex flex-col items-center space-y-6">
                <Mail className="w-24 h-24" fill={'#ffff'} />
                <Button variant='secondary' onClick={() => setActiveSetting('email')} className="bg-secondary text-text text-xl border border-transparent hover:border hover:border-accent">
                  Change Email
                </Button>
              </div>

              <div className="flex flex-col items-center space-y-6">
                <PasswordPin className="w-24 h-24" fill={'#ffff'} />
                <Button variant='secondary' onClick={() => setActiveSetting('password')} className="bg-secondary text-text text-xl border border-transparent hover:border hover:border-accent">
                  Change Password
                </Button>
              </div>

              <div className="flex flex-col items-center space-y-6">
                <Placeholder className="w-24 h-24" fill={'#ffff'} />
                <Button variant='secondary' onClick={() => setActiveSetting('accountInfo')} className="bg-secondary text-text text-xl border border-transparent hover:border hover:border-accent">
                  Change Account Info
                </Button>
              </div>

              <div className="flex flex-col items-center space-y-6">
                <Placeholder className="w-24 h-24" fill={'#ffff'} />
                <Button variant='secondary' onClick={() => setActiveSetting('2fa')} className="bg-secondary text-text text-xl border border-transparent hover:border hover:border-accent">
                  Change 2FA Settings
                </Button>
              </div>

              <div className="flex flex-col items-center space-y-6">
                <DeleteAccount className="w-24 h-24" fill={'#ffff'} />
                <Button variant='secondary' onClick={() => setActiveSetting('deleteAccount')} className="bg-secondary text-text text-xl border border-transparent hover:border hover:border-accent">
                  Delete Account
                </Button>
              </div>
            </div>
          )}

          {activeSetting && renderSettingForm()}
        </CardContent>

        <div className="w-4/5 mx-auto border-t border-grey-700 m-5"></div>

        <CardFooter className="flex flex-col items-center space-y-4 mb-10">
          {activeSetting ? (
            <Button variant='secondary' className="h-12 text-text text-xl w-full max-w-sm mt-10 border-transparent hover:border hover:border-accent" type="submit" disabled={!isChecked} onClick={() => {
              if (activeSetting === 'email') {
                handleSubmit({ email });
              } else if (activeSetting === 'password') {
                handleSubmit({ password: newPassword });
              } else if (activeSetting === 'accountInfo') {
                handleSubmit({ firstName: fName });
                handleSubmit({ lastName: lName });
              } else if (activeSetting === 'deleteAccount') {
                handleSubmit({ deleteAccount: true });
              }
            }}>
              Submit
            </Button>
          ) : (
            <Button variant='destructive' onClick={handleSignOut} className="h-12 text-text text-xl w-full max-w-sm mt-10 border-transparent hover:border hover:border-accent">
              <Logout fill={'#ffff'} />Sign Out
            </Button>
          )}
        </CardFooter>
      </Card>
    </main>
  );
}