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
      <div className='logsign-title'>Sign up</div>
      <div className='logsign-part'>
        <div className='logsign-word'>Email:</div>
        <input className='logsign-input' name='email1' type='text' onChange={(event) => { setEmail(event.target.value) }} value={email} /><br/>
        <div className='logsign-word'>Name:</div>
        <input className='logsign-input' name='name1' type='text' onChange={(event) => { setName(event.target.value) }} value={name} /><br/>
        <div className='logsign-word'>Password:</div>
        <input className='logsign-input' name='pwd1' type='password' onChange={(event) => { setPwd(event.target.value) }} value={pwd} /><br/>
        <div className='logsign-word'>Confirm Password:</div>
        <input className='logsign-input' name='pwd2' type='password' onChange={(event) => { setConfirmPwd(event.target.value) }} value={confirmPwd} /><br/>
        <button className='logsign-button' name='sign-btn' onClick={signupBtn}>sign up</button>
      </div>
    </div>
  )
}

export default Signup
