'use client'

import React, { useState } from 'react';
import UserPFP from '@/components/ui/user-pfp';
import SettingsIcon from '@/assets/settings.svg';
import ProfileIcon from '@/assets/profile.svg';
import LogoutIcon from '@/assets/logout.svg';
import Modal from '@/components/ui/Modal';
import SettingsPage from '@/components/ui/settings-page';
import { useRouter } from 'next/navigation'; 
const API_URL = 'http://127.0.0.1:8000/'

export default function NavBar() {
  const [isSettingsModalOpen, setSettingsModalOpen] = useState(false);
  const router = useRouter();

  const toggleSettingsModal = (event) => {
    event.stopPropagation(); 
    setSettingsModalOpen(!isSettingsModalOpen);
  };

  const profile = (event) => {
    event.stopPropagation(); 
    router.push('/account');
  };

  const feed = (event) => {
    event.stopPropagation();
    router.push('/feed');
  };

  const handleSignOut = async (event) => {
    event.stopPropagation(); 
    try {
      const response = await fetch(API_URL + 'auth/logout', {
        method: 'GET',
        credentials: 'include'
      });

      if (response.ok) {
        router.push('/login');
      } else {
        throw new Error('Failed to log out');
      }
    } catch (error) {
      console.error('Logout Error:', error);
    }
  };


  return (
    <section className="bg-primary h-20 w-full flex justify-center items-center px-8 rounded-b-3xl">
      <div className="w-4/5 flex justify-between items-center" >
        <h1 className="text-text unselectable" onClick={feed}>Logo</h1>

        <div className="relative flex items-center user-profile" onClick={profile}>
          <UserPFP className="unselectable"/>
          <div className="dropdown">
            <ul>
              <li className="flex items-center" onClick={profile}><ProfileIcon fill="#ffff"/>Profile</li>
              <li className="flex items-center" onClick={toggleSettingsModal}><SettingsIcon fill="#ffff"/>Settings</li>
              <li className="flex items-center" onClick={handleSignOut}><LogoutIcon fill="#F54D28"/>Sign Out</li>
            </ul>
          </div>
        </div>
      </div>

      <Modal isOpen={isSettingsModalOpen} onClose={toggleSettingsModal}>
        <SettingsPage toggle={toggleSettingsModal} />
      </Modal>

    </section>
  );
}