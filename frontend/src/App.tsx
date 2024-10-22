import SignInPage from './pages/SignInPage'
import LogInPage from './pages/LogInPage'
import WritingPage from './pages/WritingPage'
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import { BrowserRouter } from 'react-router-dom'

function App() {
  return (
    <>
      <BrowserRouter>
        <NavBar />
        <WritingPage />
        <SignInPage />
      </BrowserRouter>

      <Footer />
      {/* <LogInPage /> */}
    </>
  )
}

export default App
