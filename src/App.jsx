import React from 'react'
import './App.css'

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  BrowserRouter
} from "react-router-dom";
import Signup from './components/signup/Signup';
import Home from './components/home/Home';

function App() {

  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path='/home' element={<Home/>}/>
          <Route exact path='/' element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
