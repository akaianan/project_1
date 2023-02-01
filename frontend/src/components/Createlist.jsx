import React, { useState } from 'react';
import '../styles/popup.css'

// eslint-disable-next-line react/prop-types
const Createlist = ({ createVisible, setCreateVisible }) => {
  const [title, setTitle] = React.useState('')
  const [address, setAddress] = React.useState('')
  const [price, setPrice] = React.useState('')
  const [bathNum, setBathNum] = React.useState('')
  const [property, setProperty] = React.useState('')
  const [amen, setAmen] = React.useState('')

  const [base, setbase] = useState('')
  const [isURL, setisURL] = useState(false)
  const [URL, setURL] = useState('')

  const tobase = () => {
    var file = event.target.files[0];
    var reader = new FileReader();
    reader.onload = function (e) {
      setbase(e.target.result);
    }
    reader.readAsDataURL(file);
  }

  const [roomNumber, setRoomNumber] = React.useState(0)

  const listRoomNumber = []
  for (let i = 0; i < roomNumber; i++) {
    listRoomNumber.push(i)
  }

  const createBtn = async () => {
    var media = ''
    if (base === '' && URL !== '') {
      media = 'https://www.youtube.com/embed/' + URL.split('=')[1]
    } else {
      media = base
    }

    const metadata = []
    metadata.push(roomNumber)
    const bedNumber = document.getElementsByClassName('bed-number')
    console.log(bedNumber)
    const bedNumber2 = []
    for (const i of bedNumber) {
      bedNumber2.push(i.value)
    }
    let bedNum = 0
    for (const i of bedNumber2) {
      bedNum = bedNum + parseInt(i)
    }
    metadata.push(bedNum)
    metadata.push(bathNum)
    metadata.push(property)
    console.log(metadata)

    const token = localStorage.getItem('token')
    console.log(token)
    const response = await fetch('http://localhost:5005/listings/new', {
      method: 'POST',
      headers: { 'Content-type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({
        title: title,
        address: address,
        price: price,
        thumbnail: media,
        metadata: metadata
      })
    })
    const data = await response.json()
    if (data.error) {
      alert(data.error)
    } else {
      console.log(data)
      window.location.href = '/Hostlistings'
    }
  }

  return (
    <div className='backGround'>
      <div className='backGround2'>
        <div className='popupClose' onClick={() => setCreateVisible(!createVisible)}>×</div>
        <span className='popupSpan'>Title: </span>
        <input type='text' id='title' onChange={(event) => { setTitle(event.target.value) }} value={title} /><br/>
        <span className='popupSpan'>Address: </span>
        <input type='text' id='address' onChange={(event) => { setAddress(event.target.value) }} value={address} /><br/>
        <span className='popupSpan'>Property Type: </span>
        <input type='text' id='property' onChange={(event) => { setProperty(event.target.value) }} value={property} /><br/>
        <span className='popupSpan'>Price: </span>
        <input type='text' id='price' onChange={(event) => { setPrice(event.target.value) }} value={price} /><br/>
        {!isURL
          ? <div>
          <span className='popupSpan'>Listing Thumbnail: </span>
          <input type='file' onChange={tobase} data-testid='picture'/><br/>
          </div>
          : <div>
          <span className='popupSpan'>Listing Video URL: </span>
          <input className='popupSpan' type='text' id='URL' onChange={(event) => setURL(event.target.value)} value ={URL} data-testid ='enter URL' /><br/>
          </div>}
        <button className='btnStyle3' onClick={() => setisURL(!isURL)}>
          {!isURL ? <>Turn to url</> : <>Turn to pic</>}
        </button><br/>
        {listRoomNumber.map(item => (
          <div key={item}>
            <span className='popupSpan'>Bedroom number: </span>
            <input type='text' /><br/>
            <span className='popupSpan'>Number of beds: </span>
            <input type='text' className='bed-number' /><br/>
          </div>
        ))}
        <button className='btnStyle3' onClick={() => { setRoomNumber(roomNumber + 1) }}>Add bedroom</button>
        <button className='btnStyle3' onClick={() => { setRoomNumber(0) }}>back</button><br/>
        <span className='popupSpan'>Number of bathrooms: </span>
        <input type='text' id='bath-number' onChange={(event) => { setBathNum(event.target.value) }} value={bathNum} /><br/>
        <span className='popupSpan'>Property amenities: </span>
        <input type='text' id='amen' onChange={(event) => { setAmen(event.target.value) }} value={amen} /><br/>
        <button className='popupButton' onClick={createBtn}>Create it!!</button>
      </div>
    </div>
  )
}

export default Createlist
