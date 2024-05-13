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
import axios from 'axios';
import UserResult from './userResult';
import PostResult from './postResult';

const API_URL = 'http://127.0.0.1:8000/'

export default function NavBar() {
  const [isSettingsModalOpen, setSettingsModalOpen] = useState(false);
  const router = useRouter();
  const user = useUserStore(state => state.user);
  const [showHeader, setShowHeader] = useState(false);
  const [searchResults, setSearchResults] = useState([{}]);
  const [showResults, setShowResults] = useState(false);

  const toggleSettingsModal = (event) => {
    setSettingsModalOpen(!isSettingsModalOpen);
  };

  const search = async (event) => {
    event.preventDefault();
    const search = event.target.value;
    const res = await axios.post('http://localhost:8000/search', { search });
    setSearchResults(res.data);
    setShowResults(true);
  }

  const handleProfile = (event) => {
    event.stopPropagation();
    if (user && user.username) {
      router.push(`/account/${user.username}`);
    } else {
      console.error("User ID is not available");
    }
  };

  const handleLogout = async () => {
    await logout();
    router.push('/login');
  }

  const handleFeed = (event) => {
    event.stopPropagation();
    router.push('/');
  };

  const toggleResults = (value) => {
    setShowResults(value);
  }

  useEffect(() => {
    async function fetchUser() {
      await updateUser().then(() => setShowHeader(true));
    }
    fetchUser();
  }, []);

  return (
    <section className="bg-primary h-20 w-full flex justify-center items-center px-8 rounded-b-3xl" >
      <div className="w-4/5 flex justify-between items-center" onClick={() => toggleResults(false)}>
        <div className="text-text unselectable" onClick={handleFeed}>
          <Logo className="h-12 w-12" fill="#FFDA54" />
        </div>
        <div className='relative w-1/2 self-center'>
          <input type="text" placeholder="Search"
            className="rounded-lg p-2 w-full focus:outline-none bg-transparent border border-secondary text-white text-xl"
            onKeyDown={(e) => { if (e.key === 'Enter') search(e) }} onClick={() => toggleResults(true)}
          />

          {showResults && (
            <div className="p-1 absolute top-12 left-0 w-full text-lg text-text bg-primary shadow-xl z-20">
              {searchResults.users?.length > 0 &&
                <div className='border-b'>
                  <h1 className="font-semibold underline">Users:</h1>
                  {searchResults.users?.map((user) => (
                    <UserResult user={user} />
                  ))}
                </div>
              }
              {searchResults.posts?.length > 0 &&
                <div className='border-b'>
                  <h1 className="font-semibold underline">Posts:</h1>
                  {searchResults.posts?.map((post) => (
                    <PostResult post={post} />
                  ))}
                </div>
              }

            </div>
          )}
        </div>

        <div className="relative flex items-center justify-end gap-2 user-profile" onClick={handleProfile}>
          {showHeader &&
            <div className="relative rounded w-fit ">
              <div className="flex text-white p-2 text-lg items-center">
                {user ? <h1 className="self-center font-semibold text-xl">Hello {user.fname}</h1> : <h1 className="font-semibold self-center text-xl">Hello Guest</h1>}
              </div>
            </div>
          }
          <UserPFP containerClassName="sm-avatar" identiconClassName="scale-down" user={user.username} />
          <div className="dropdown">
            <ul>
              {user ? (
                <>
                  <li className="flex items-center" onClick={handleProfile}><ProfileIcon fill="#ffff" /> Profile</li>
                  <li className="flex items-center" onClick={toggleSettingsModal}><SettingsIcon fill="#ffff" /> Settings</li>
                  <li className="flex items-center" onClick={logout}><LogoutIcon fill="#F54D28" /> Sign Out</li>
                </>
              ) : (
                <li className="dropdown flex items-center" onClick={handleLogout}><LoginIcon fill="#ffff" /> Sign In</li>
              )}
            </ul>
          </div>
        </div>
      </div>

      <Modal isOpen={isSettingsModalOpen} onClose={toggleSettingsModal}>
        <SettingsPage toggle={toggleSettingsModal} />
      </Modal>

    </section >
  );
}