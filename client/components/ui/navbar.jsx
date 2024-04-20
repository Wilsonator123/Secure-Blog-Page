'use client'

import UserPFP from '@/components/ui/user-pfp';
import SettingsIcon from '@/assets/settings.svg';
import ProfileIcon from '@/assets/profile.svg';
import LogoutIcon from '@/assets/logout.svg';

export default function NavBar() {
  
  return (
    <section className="bg-primary h-20 w-full flex justify-center items-center px-8 rounded-b-3xl">
      <div className="w-4/5 flex justify-between items-center">
        <h1 className="text-text">CryptoBros Logo</h1>
        <div className="relative flex items-center user-profile">
          <UserPFP />
          <div className="dropdown">
            <ul>
              <li className="flex items-center"><ProfileIcon fill="#ffff"/>Profile</li>
              <li className="flex items-center"><SettingsIcon fill="#ffff"/>Settings</li>
              <li className="flex items-center"><LogoutIcon fill="#F54D28"/>Sign Out</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}