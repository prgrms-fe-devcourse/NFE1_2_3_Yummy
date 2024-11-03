import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import SignInPage from './pages/SignInPage'
import LogInPage from './pages/LogInPage'
import WritingPage from './pages/WritingPage'
import PageLayout from './layouts/pageLayout'
import MyPage from './pages/MyPage'
import PostPage from './pages/PostPage'
import MainPage from './pages/MainPage'
import SearchPage from './pages/SearchPage'
import UserEditModal from './components/UserEditModal'
import ErrorPage from './pages/ErrorPage.jsx'

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
            path='/profile/:id'
            element={<MyPage />}
          >
            <Route
              path='edit'
              element={<UserEditModal />}
            />
          </Route>
          <Route
            path='/post/:id'
            element={<PostPage />}
          />
          <Route
            path='/post/:id/edit'
            element={<WritingPage />}
          />
          <Route
            path='/search'
            element={
              <Navigate
              to='/search/category?search=전체'
              replace
              />
            }
          />
          <Route
            path='/search/category'
            element={<SearchPage />}
          />
          <Route
            path='/'
            element={<MainPage />}
          />
          <Route
            path='/error'
            element={<ErrorPage />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
