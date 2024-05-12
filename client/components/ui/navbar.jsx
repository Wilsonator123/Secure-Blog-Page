'use client'

import React, { useState, useEffect } from 'react';
import UserPFP from '@/components/ui/user-pfp';
import SettingsIcon from '@/assets/settings.svg';
import ProfileIcon from '@/assets/profile.svg';
import LoginIcon from '@/assets/login.svg';
import LogoutIcon from '@/assets/logout.svg';
import Logo from '@/assets/logo.svg';
import Modal from '@/components/ui/Modal';
import SettingsPage from '@/components/ui/settings-page';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/context/UserContext';
import { updateUser, logout } from '@/hooks/user';

const API_URL = 'http://127.0.0.1:8000/'

export default function NavBar() {
  const [isSettingsModalOpen, setSettingsModalOpen] = useState(false);
  const router = useRouter();
  const user = useUserStore(state => state.user);
  const [showHeader, setShowHeader] = useState(false);

  const toggleSettingsModal = (event) => {
    setSettingsModalOpen(!isSettingsModalOpen);
  };

  const handleProfile = (event) => {
    event.stopPropagation();
    router.push('/account');
  };

  const handleLogout = async () => {
    await logout();
    router.push('/login');
  }

  const handleFeed = (event) => {
    event.stopPropagation();
    router.push('/');
  };

  useEffect(() => {
    async function fetchUser() {
      await updateUser().then(() => setShowHeader(true));
    }
    fetchUser();
  }, []);

  return (
    <section className="bg-primary h-20 w-full flex justify-center items-center px-8 rounded-b-3xl">
      <div className="w-4/5 flex justify-between items-center">
        <div className="text-text unselectable" onClick={handleFeed}>
          <Logo className="h-12 w-12" fill="#FFDA54" />
        </div>
        {showHeader &&
          <div className="relative rounded">
            <div className="flex text-white p-2 text-lg items-center">
              {user ? <h1 className="self-center font-semibold text-xl">Hello {user.fname}</h1> : <h1 className="font-semibold self-center text-xl">Hello Guest</h1>}
            </div>
          </div>
        }
        <div className="relative flex items-center user-profile" onClick={handleProfile}>
          <UserPFP containerClassName="sm-avatar" identiconClassName="scale-down" />
          <div className="dropdown">
            <ul>
              {user ? (
                <>
                  <li className="flex items-center" onClick={handleProfile}><ProfileIcon fill="#ffff" /> Profile</li>
                  <li className="flex items-center" onClick={toggleSettingsModal}><SettingsIcon fill="#ffff"/> Settings</li>
                  <li className="flex items-center" onClick={logout}><LogoutIcon fill="#F54D28"/> Sign Out</li>
                </>
              ) : (
                <li className="dropdown flex items-center" onClick={handleLogout}><LoginIcon fill="#ffff"/> Sign In</li>
              )}
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