import React, {useContext} from 'react'
import './theme/css/color.css'
import './App.css'
import MainScreen from './modules/MainScreen'
import {Routes, Route, Navigate} from 'react-router-dom'
import HomeContainer from './modules/home/HomeContainer'
import Editor from './modules/editor/Editor'
import Document from './modules/document/Document'
import AuthContext from './service/auth/store/authContext'
import AuthPage from './modules/auth/AuthPage'
import CreateAccount from './modules/auth/CreateAccount'
import ProfilePage from './modules/auth/ProfilePage'
import SpellingBeeContainer from './modules/spellingBee/SpellingBeeContainer'
import WordleContainer from './modules/wordle/WordleContainer'

function App() {
  const authCtx = useContext(AuthContext)

  return (
    <Routes>
      <Route element={<MainScreen />}>
        <Route path='/' element={<HomeContainer />} />
        <Route path='/editor' element={<Editor />} />
        <Route path='/document/:postId' element={<Document />} />
        <Route path='/empty' element={<div></div>} />
        <Route
          path='/signup'
          element={authCtx.isLoggedIn ? <Navigate to='/' /> : <CreateAccount />}
        />
        <Route
          path='/login/*'
          element={authCtx.isLoggedIn ? <Navigate to='/' /> : <AuthPage />}
        />
        <Route
          path='/profile'
          element={!authCtx.isLoggedIn ? <Navigate to='/' /> : <ProfilePage />}
        />
        <Route path='/spellingBee' element={<SpellingBeeContainer />} />
        <Route path='/wordle' element={<WordleContainer />} />
      </Route>
    </Routes>
  )
}

export default App
