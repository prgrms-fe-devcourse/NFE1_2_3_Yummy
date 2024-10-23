import SignInPage from './pages/SignInPage'
import LogInPage from './pages/LogInPage'
import WritingPage from './pages/WritingPage'
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import { BrowserRouter } from 'react-router-dom'
import MyPage from './pages/MyPage'
import UserProfileModal from './components/UserProfileModal'

function App() {
  return (
    <>
      {/* <BrowserRouter>
        <NavBar />
        <WritingPage />
        <SignInPage />
      </BrowserRouter>

      <Footer />
      <LogInPage /> */}
      <UserProfileModal />
    </>
  )
}

export default App
