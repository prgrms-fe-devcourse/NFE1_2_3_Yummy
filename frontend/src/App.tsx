import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SignInPage from './pages/SignInPage'
import LogInPage from './pages/LogInPage'
import WritingPage from './pages/WritingPage'
import PageLayout from './layouts/pageLayout'
import MyPage from './pages/MyPage'
import PostPage from './pages/PostPage'
import SearchPage from './pages/SearchPage'
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PageLayout />}>
          <Route
            path='/write'
            element={<WritingPage />}
          />
          <Route
            path='/signin'
            element={<SignInPage />}
          />
          <Route
            path='/login'
            element={<LogInPage />}
          />
          <Route
            path='/mypage'
            element={<MyPage />}
          />
          <Route
            path='/post'
            element={<PostPage />}
          />
          <Route
            path='/search'
            element={<SearchPage />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
