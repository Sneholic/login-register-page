import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Signup from './signup'
import {Routes,Route,BrowserRouter} from "react-router-dom"
import './App.css'
import Login from './login'
import Home from './Home'
import Dashboard from './Dashboard'
function App() {
  

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/register" element={<Signup/>}> </Route>
      <Route path="/login" element={<Login/>}> </Route>
      <Route path="/" element={<Home/>}> </Route>
      <Route path="/dashboard" element={<Dashboard/>}> </Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App
