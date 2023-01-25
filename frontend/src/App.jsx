import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Hostedlistings from './pages/Hostedlistings';
import Landing from './pages/Landing';
import Login from './pages/Login'
import Signup from './pages/Signup';
import Welcome from './pages/Welcome';
import Filter from './pages/Filter';
import Specific from './pages/Specific';
import './styles/Homestyle.css'
import { Button } from '@material-ui/core'

const Home = () => {
  return (
    <>
      <div className='home'>Home</div>
      <Button variant="text"><Link to='/Login'>login</Link></Button>
      <Button variant="text"><Link to='/Signup'>Sign up</Link></Button>
      <Button variant="text"><Link to='/Landing'>all listings</Link></Button>
      <span></span>
    </>
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
          <Route path='/Hostedlistings' element={<Hostedlistings/>}/>
          <Route path='/Landing' element={<Landing/>}/>
          <Route path='/Filter' element={<Filter/>}/>
          <Route path='/Specific' element={<Specific/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;
