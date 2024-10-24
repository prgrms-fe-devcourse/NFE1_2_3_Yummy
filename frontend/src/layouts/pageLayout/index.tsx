import NavigationBar from '../../components/NavBar'
import Footer from '../../components/Footer'
import { Outlet } from 'react-router-dom'
import { MainContainer } from './style'
const pageLayout = () => {
  return (
    <>
      <NavigationBar />
      <MainContainer>
        <Outlet />
      </MainContainer>
      <Footer />
    </>
  )
}

export default pageLayout
