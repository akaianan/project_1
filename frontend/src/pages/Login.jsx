import React from 'react'
import '../styles/logsignstyle.css'

const Login = () => {
  const [email, setEmail] = React.useState('')
  const [pwd, setPwd] = React.useState('')

  const loginBtn = async () => {
    const response = await fetch('http://localhost:5005/user/auth/login', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({
        email: email,
        password: pwd
      })
    })
    const data = await response.json()
    if (data.error) {
      alert(data.error)
    } else {
      console.log(data.token)
      localStorage.setItem('token', data.token)
      localStorage.setItem('email', email)
      window.location.href = '/Welcome'
    }
  }

  return (
    <div>
      <div className='logsign-title'>Log in</div>
      <div className='logsign-part'>
        <div className='logsign-word'>Email:</div>
        <input className='logsign-input' type='text' onChange={(event) => { setEmail(event.target.value) }} value={email} /><br/>
        <div className='logsign-word'>Password:</div>
        <input className='logsign-input' type='password' onChange={(event) => { setPwd(event.target.value) }} value={pwd} /><br/>
        <button className='logsign-button' onClick={loginBtn}>Log in</button>
      </div>
    </div>
  )
}

export default Login
