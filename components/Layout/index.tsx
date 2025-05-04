import React from 'react'
import Navbar from '../NavBar/Index'
 
export type layoutProps = {
    children: React.ReactNode;
}
export default function Layout({children}: layoutProps) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
    </>
  )
}