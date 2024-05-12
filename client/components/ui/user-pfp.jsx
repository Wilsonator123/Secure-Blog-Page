import React from 'react';
import Identicon from 'react-identicons';
import { useUserStore } from '@/context/UserContext';
import ProfileIcon from '@/assets/profile.svg';

export default function UserPFP({ containerClassName, identiconClassName }) {
    const user = useUserStore(state => state.user);

    return (
        <div className={`flex items-center justify-center overflow-hidden rounded-full border border-accent ${containerClassName}`}>
            {user ? (
                <Identicon
                    className={`object-cover ${identiconClassName}`}
                    string={user.username}
                />
            ) : (
                <div className="flex items-center justify-center w-12 h-12 bg-gray-300">
                    <ProfileIcon className="w-10 h-10"/>
                </div>
            )}
        </div>
    );
}