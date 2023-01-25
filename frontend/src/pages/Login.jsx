import React from 'react'
import '../styles/loginregister.css'

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
      <div className='login-signup-title'>Log in</div>
      <div className='login-signup-part'>
        <div className='login-signup-word'>email:</div>
        <input className='login-signup-input' type='text' onChange={(event) => { setEmail(event.target.value) }} value={email} /><br/>
        <div className='login-signup-word'>password:</div>
        <input className='login-signup-input' type='password' onChange={(event) => { setPwd(event.target.value) }} value={pwd} /><br/>
        <button className='login-signup-button' onClick={loginBtn}>Login</button>
      </div>
    </div>
  )
}

export default Login
