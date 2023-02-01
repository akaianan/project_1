import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Hostlistings from './pages/Hostlistings';
import Landing from './pages/Landing';
import Login from './pages/Login'
import Signup from './pages/Signup';
import Welcome from './pages/Welcome';
import Filter from './pages/Filter';
import Specific from './pages/Specific';
import './styles/hoSty.css'

const Home = () => {
  return (
    <div className='center'>
      <div className='home'>Home</div>
      <span className='btn1'><Link to='/Login'>Log in</Link></span>
      <span className='btn2'><Link to='/Signup'>Sign up</Link></span>
      <div className='booking'>Booking what you like!</div>
    </div>
  )
}

function App () {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path='/Login' element={<Login/>}/>
          <Route path='/Signup' element={<Signup/>}/>
          <Route path='/Welcome' element={<Welcome/>}/>
          <Route path='/Hostlistings' element={<Hostlistings/>}/>
          <Route path='/Landing' element={<Landing/>}/>
          <Route path='/Filter' element={<Filter/>}/>
          <Route path='/Specific' element={<Specific/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;
