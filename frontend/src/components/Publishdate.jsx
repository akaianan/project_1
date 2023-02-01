import React from 'react';

// eslint-disable-next-line react/prop-types
const Publishdate = ({ publishVisible, setPublishVisible }) => {
  const [year1, setYear1] = React.useState('')
  const [month1, setMonth1] = React.useState('')
  const [day1, setDay1] = React.useState('')
  const [year2, setYear2] = React.useState('')
  const [month2, setMonth2] = React.useState('')
  const [day2, setDay2] = React.useState('')
  const ID = localStorage.getItem('publishId')
  const token = localStorage.getItem('token')
  console.log(ID)
  const publish = async () => {
    const response = await fetch('http://localhost:5005/listings/publish/' + ID, {
      method: 'PUT',
      headers: { 'Content-type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({
        availability: [year1, month1, day1, year2, month2, day2]
      })
    })
    const data = await response.json()
    if (data.error) {
      alert(data.error)
    } else {
      console.log(data)
      alert('Publish successfully!')
      window.location.href = '/Hostlistings'
    }
  }
  return (
    <div className='backGround'>
      <div className='backGround2'>
      <div className='popupClose' onClick={() => setPublishVisible(!publishVisible)}>×</div><br/>
        <span className='popupSpan'>from: </span><br/>
        <span className='popupSpan'>year:</span><input type='text' onChange={ (event) => setYear1(event.target.value) } value={year1} />
        <span>month:</span><input type='text' onChange={ (event) => setMonth1(event.target.value) } value={month1} />
        <span>day:</span><input type='text' onChange={ (event) => setDay1(event.target.value) } value={day1} /><br/>
        <span className='popupSpan'>to: </span><br/>
        <span className='popupSpan'>year:</span><input type='text' onChange={ (event) => setYear2(event.target.value) } value={year2} />
        <span>month:</span><input type='text' onChange={ (event) => setMonth2(event.target.value) } value={month2} />
        <span>day:</span><input type='text' onChange={ (event) => setDay2(event.target.value) } value={day2} /><br/>
        <button className='popupButton' onClick={publish}>Publish it!!</button>
      </div>
    </div>
  )
}

export default Publishdate
