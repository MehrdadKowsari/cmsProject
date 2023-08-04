import React, { createContext, useContext, useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { NextPageWithLayout } from 'src/pages/_app'
import { UserDTO } from 'src/models/security/user/userDTO';
import browserStorageService from 'src/services/shared/browserStorageService';
import { useAppDispatch, useAppSelector } from 'src/state/hooks/hooks'
import { getCurrent } from '../slices/userSlice';

const AuthContext = createContext<any>({} as {
  user: UserDTO;
  setUserInfo: (userDTO: UserDTO) => void;
  authenticate: (newToken: string) => Promise<void>;
  logout: (redirectLocation: string | undefined) => void;
  isLoading: boolean;
  isAuthenticated: boolean;
  token: string;
})

function AuthProvider({ children }: {children: any}) {
  const { pathname } = useRouter()
  const [user, setUser] = useState<UserDTO | null>(useAppSelector((state: any) => state?.user?.user))
  const [isLoading, setIsLoading] = useState<boolean>()
  const isAuthenticated = !!user;
  const router = useRouter();
  const dispatch = useAppDispatch();
  
  function logout (redirectLocation: string | undefined) {
    browserStorageService.removeLocal('accessToken');
    browserStorageService.removeLocal('refreshToken');
    browserStorageService.removeLocal('isUserLoggedIn');
    setUser(null);
    setIsLoading(false);
    router.push(redirectLocation || "/login");
  };
  
  async function getUser() {
    try {    
      if (user) {
        setUser(user);
        return;  
      }
      const currentUser = await dispatch(getCurrent()).unwrap();
      setUser(currentUser);
    } catch (error) {
      return logout('/login');
    }
  }

  async function setUserInfo(userDTO: UserDTO) {
    await setUser(userDTO);
  }

  useEffect(() => {
    const Component = children.type as NextPageWithLayout;
    if (!Component.isRequiredAuth) return;
    if (isAuthenticated) return;
    const accessToken = browserStorageService.getLocal('accessToken');
    const refreshToken = browserStorageService.getLocal('refreshToken');
    if (!accessToken || !refreshToken) {
      return logout('/login');
    }
    async function getCurrentUser(){
      await getUser();
    } 
     getCurrentUser();
    
  }, [pathname])

  return (
    <AuthContext.Provider 
      value={{ 
        user,
        setUserInfo,
        logout,
        isLoading,
        isAuthenticated: !!user 
      }}>
        {children}
    </AuthContext.Provider>
  )
}

const useAuth = () => useContext(AuthContext)

export { AuthProvider, useAuth }