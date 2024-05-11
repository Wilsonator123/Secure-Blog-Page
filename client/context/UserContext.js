import React, { createContext, useState } from 'react';


export const UserContext = createContext();


export const UserContextProvider = ({ children }) => {
    
    const [loggedInUser, setLoggedInUser] = useState(null);

    const updateLoggedInUser = (user) => {
        setLoggedInUser(user);
    };

    
    const value = {
        loggedInUser,
        updateLoggedInUser,
    };

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
};