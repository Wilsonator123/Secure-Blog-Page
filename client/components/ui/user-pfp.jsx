import React from 'react';
import Identicon from 'react-identicons';
import { useUserStore } from '@/context/UserContext';

export default function UserPFP({ containerClassName, identiconClassName }) {
    const user = useUserStore(state => state.user);

    return (
        <div className={`flex items-center justify-center overflow-hidden rounded-full border border-accent ${containerClassName}`}>
            {user ? (
                <Identicon
                    className={`object-cover ${identiconClassName}`} // Added identiconClassName here
                    string={user.username}
                />
            ) : (
                <div className="flex items-center justify-center w-full h-full bg-gray-300">
                    PFP
                </div>
            )}
        </div>
    );
}