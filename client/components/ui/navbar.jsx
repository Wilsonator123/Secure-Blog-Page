import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function NavBar() {
    const [showDropdown, setShowDropdown] = useState(false);
  
    const toggleDropdown = () => {
      setShowDropdown(!showDropdown);
    };
  
    return (
      <section className="bg-primary h-16 w-full flex justify-between items-center px-8">
        <h1 className="text-text">CryptoBros Logo</h1>
        <div className="relative flex items-center"> 
          <Avatar onClick={toggleDropdown} className = "unselectable">
            <AvatarImage
              src="https://pbs.twimg.com/profile_images/1352844693151731713/HKO7cnlW_400x400.jpg"
              alt="avatar"
            />
            <AvatarFallback>PFP</AvatarFallback>
          </Avatar>
  
          {showDropdown && (
            <div className="dropdown text-text">
              <ul>
                <li>Profile</li>
                <li>Settings</li>
                <li>Sign Out</li>
              </ul>
            </div>
          )}
        </div>
      </section>
    );
  }