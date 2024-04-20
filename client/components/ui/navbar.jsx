'use client'

import { useState, useEffect, useRef } from 'react';
import UserPFP from '@/components/ui/user-pfp';
import SettingsIcon from '@/assets/settings.svg'
import ProfileIcon from '@/assets/profile.svg'
import LogoutIcon from '@/assets/logout.svg'

export default function NavBar({toggle}) {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setShowDropdown(!showDropdown);

  useEffect(() => {
      function handleClickOutside(event) {
          if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
              setShowDropdown(false);
          }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
      <section className="bg-primary h-20 w-full flex justify-center items-center px-8 rounded-b-3xl">

          {/* Center content wrapper */}
          <div className="w-4/5 flex justify-between items-center">
              <h1 className="text-text">CryptoBros Logo</h1>
              <div className="relative flex items-center">
                  <div onClick={toggleDropdown}>
                      <UserPFP />
                  </div>

                  {showDropdown && (
                      <div ref={dropdownRef} className="dropdown text-text">
                          <ul>
                            <li className="flex items-center"><ProfileIcon fill={'#ffff'}/>Profile</li>
                            <li className="flex items-center"><SettingsIcon fill={'#ffff'}/>Settings</li>
                            <li className="flex items-center"><LogoutIcon fill={'#F54D28'}/>Sign Out</li>
                          </ul>
                      </div>
                  )}
              </div>
          </div>

      </section>
  );
}