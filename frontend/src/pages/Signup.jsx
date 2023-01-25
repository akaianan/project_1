import React from 'react';

const Signup = () => {
  const [email, setEmail] = React.useState('')
  const [name, setName] = React.useState('')
  const [pwd, setPwd] = React.useState('')
  const [confirmPwd, setConfirmPwd] = React.useState('')

  const signupBtn = async () => {
    if (pwd !== confirmPwd) {
      alert('Two password are not the ssame!')
      return
    }
    const response = await fetch('http://localhost:5005/user/auth/register', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({
        email: email,
        password: pwd,
        name: name
      })
    })
    const data = await response.json()
    if (data.error) {
      alert(data.error)
    } else {
      console.log(data)
      localStorage.setItem('token', data.token)
      localStorage.setItem('email', email)
      window.location.href = '/Welcome'
    }
  }

  return (
    <div>
      <div className='login-signup-title'>Sign up</div>
      <div className='login-signup-part'>
        <div className='login-signup-word'>email:</div>
        <input className='login-signup-input' type='text' onChange={(event) => { setEmail(event.target.value) }} value={email} /><br/>
        <div className='login-signup-word'>name:</div>
        <input className='login-signup-input' type='text' onChange={(event) => { setName(event.target.value) }} value={name} /><br/>
        <div className='login-signup-word'>password:</div>
        <input className='login-signup-input' type='password' onChange={(event) => { setPwd(event.target.value) }} value={pwd} /><br/>
        <div className='login-signup-word'>confirm password:</div>
        <input className='login-signup-input' type='password' onChange={(event) => { setConfirmPwd(event.target.value) }} value={confirmPwd} /><br/>
        <button className='login-signup-button' onClick={signupBtn}>sign up</button>
      </div>
    </div>
  )
}

export default Signup
