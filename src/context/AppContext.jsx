import React, { createContext, useState } from 'react';
export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
    const [user, setUser] = useState();
    const [userDisplayName, setUserDisplayName] = useState();
    const [userID, setUserID] = useState();
    const [userEmail, setUserEmail] = useState();
    const [userPhotoUrl, setUserPhotoUrl] = useState();

    return (
        <AppContext.Provider value={{ user, userDisplayName, userID, userEmail, userPhotoUrl, setUser, setUserDisplayName, setUserID, setUserEmail, setUserPhotoUrl }}>
            {children}
        </AppContext.Provider>
    )
}

export default AppContextProvider;