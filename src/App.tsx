import React from 'react'
import './theme/css/color.css'
import './App.css'
import MainScreen from './modules/MainScreen'
import {Routes, Route} from 'react-router-dom'
import HomeContainer from './modules/home/HomeContainer'
import Editor from './modules/editor/Editor'
import Document from './modules/document/Document'

function App() {
  return (
    <Routes>
      <Route element={<MainScreen />}>
        <Route path='/' element={<HomeContainer />} />
        <Route path='/editor' element={<Editor />} />
        <Route path='/document/:postId' element={<Document />} />
        <Route path='/empty' element={<div></div>} />
      </Route>
    </Routes>
  )
}

export default App
