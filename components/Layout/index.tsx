import React, { useEffect } from 'react'
import Navbar from '../NavBar/NavBar'
import { useCurrentUser } from '@/context/currentUserContext';
import AuthService from '@/services/authService';
 
export type layoutProps = {
    children: React.ReactNode;
}
export default function Layout({children}: layoutProps) {

  
  const { fetchCurrentUser } = useCurrentUser()

  useEffect(() => {
      if (AuthService.getAuth() || AuthService.getRefresh()){
          fetchCurrentUser()
      }
    }, [])
    
  return (
    <>
      <Navbar />
      <main>{children}</main>
    </>
  )
}