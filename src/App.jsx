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

import { ProSidebarProvider } from 'react-pro-sidebar';
import NotFound from './components/home/notfound/NotFound';

function App() {

  return (
    <div className="app">
        <Routes>
          <Route path='/home/*' element={<Home />} />
          <Route exact path='/' element={<Signup />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
    </div>
  )
}

export default App
