'use client';

import { auth } from '@/constants/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';

const UserData = createContext<User | null>(null);

const UserContext = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      if (user) setUser(user);
      else setUser(null);
    });
  }, []);

  return <UserData.Provider value={user}>{children}</UserData.Provider>;
};

export default UserContext;

export const useUserContext = () => useContext(UserData);
