import React from 'react'
import { Router, Routes, Route } from "react-router-dom"
import Homepage from './Homepage'
import Userdetail from './Userdetail'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/homepage" element={<UserDetail />} />
      </Routes>
    </Router>
  )
}

export default App