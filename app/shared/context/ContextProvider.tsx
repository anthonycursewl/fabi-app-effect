import React, { createContext, useState } from 'react';
import { Auth, ICType } from '../interfaces/ContextTypes';
import { User } from '../interfaces/User';

export const AuthContext = createContext<ICType>({ setUserToken: () => {}, userToken: { access_token: '', refresh_token: '' }, setUser: () => {}, user: { id: '', username: '', email: '', password: '', created_at: '', role: '', name: '', iat: 0, exp: 0, jti: '' } });

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [userToken, setUserToken] = useState<Auth>({ access_token: '', refresh_token: '' });
  const [user, setUser] = useState<User>({ id: '', username: '', email: '', password: '', created_at: '', role: '', name: '', iat: 0, exp: 0, jti: '' });

  return (
    <AuthContext.Provider value={{ userToken, setUserToken, user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};