import Navbar from '../NavBar/Index'
 
export default function Layout({ children }: any) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
    </>
  )
}