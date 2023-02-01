import React from 'react';

const Bookdate = (props) => {
  const [year1, setYear1] = React.useState('')
  const [month1, setMonth1] = React.useState('')
  const [day1, setDay1] = React.useState('')
  const [year2, setYear2] = React.useState('')
  const [month2, setMonth2] = React.useState('')
  const [day2, setDay2] = React.useState('')
  const ID = localStorage.getItem('bookID')
  const price = localStorage.getItem('bookPrice')
  const token = localStorage.getItem('token')
  console.log(ID)
  console.log(price)

  const bookList = async () => {
    const order1 = `${year1}-${month1}-${day1}`
    const order2 = `${year2}-${month2}-${day2}`
    const time = []
    time.push(order1)
    time.push(order2)
    const dayNum = parseInt((Date.parse(order2) - Date.parse(order1)) / (1000 * 24 * 3600))
    const totalPrice = dayNum * parseInt(price)
    const response = await fetch('http://localhost:5005/bookings/new/' + ID, {
      method: 'POST',
      headers: { 'Content-type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({
        dateRange: time,
        totalPrice: totalPrice
      })
    })
    const data = await response.json()
    if (data.error) {
      console.log(data.error)
    } else {
      console.log(data)
      alert('Submit book success!')
      window.location.href = '/Specific'
    }
  }

  return (
    <div className='wordStyle2'>
      <div style={{ fontStyle: 'italic', color: 'blue' }}>Please input the date within the date range, otherwise the hosts will reject your application. </div>
      <span>from: </span><br/>
      <span>year:</span><input type='text' onChange={ (event) => setYear1(event.target.value) } value={year1} />
      <span>month:</span><input type='text' onChange={ (event) => setMonth1(event.target.value) } value={month1} />
      <span>day:</span><input type='text' onChange={ (event) => setDay1(event.target.value) } value={day1} /><br/>
      <span>to: </span><br/>
      <span>year:</span><input type='text' onChange={ (event) => setYear2(event.target.value) } value={year2} />
      <span>month:</span><input type='text' onChange={ (event) => setMonth2(event.target.value) } value={month2} />
      <span>day:</span><input type='text' onChange={ (event) => setDay2(event.target.value) } value={day2} /><br/>
      <button className='btnStyle' onClick={bookList}>Submit it!!</button>
      <hr/>
    </div>
  )
}

export default Bookdate
