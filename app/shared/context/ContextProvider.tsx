import React, { createContext, useState } from 'react';
import { ICType } from '../interfaces/ContextTypes';

export const AuthContext = createContext<ICType>({ userToken: '', setUserToken: () => {} });

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [userToken, setUserToken] = useState<string | null>(null);

  return (
    <AuthContext.Provider value={{ userToken, setUserToken }}>
      {children}
    </AuthContext.Provider>
  );
};