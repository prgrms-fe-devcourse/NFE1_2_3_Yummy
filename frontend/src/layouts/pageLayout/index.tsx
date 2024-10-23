import NavigationBar from '../../components/NavBar'
import Footer from '../../components/Footer'
import { Outlet } from 'react-router-dom'
const pageLayout = () => {
  return (
    <>
      <NavigationBar />
      <Outlet />
      <Footer />
    </>
  )
}

export default pageLayout
