import React from 'react';
import '../styles/Welcomestyle.css'
import { Button } from '@material-ui/core'

const Welcome = () => {
  const token = localStorage.getItem('token')
  console.log(token)
  const logoutBtn = async () => {
    const response = await fetch('http://localhost:5005/user/auth/logout', {
      method: 'POST',
      headers: { 'Content-type': 'application/json', Authorization: `Bearer ${token}` },
    })
    const data = await response.json()
    if (data.error) {
      alert(data.error)
    } else {
      console.log(data)
      window.location.href = '/Login'
    }
  }
  return (
    <>
      <div className='welcomeStyle'>Welcome!</div>
      <Button color="secondary" onClick={() => { window.location.href = '/Hostedlistings' }}>hosted listings</Button>
      <Button color="secondary" onClick={() => { window.location.href = '/Landing' }}>all listings</Button>
      <Button color="secondary" onClick={logoutBtn}>logout</Button>
    </>
  )
}

export default Welcome