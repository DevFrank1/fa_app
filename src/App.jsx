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

function App() {

  return (
    <div className="app">
      <Signup />
    </div>
  )
}

export default App
