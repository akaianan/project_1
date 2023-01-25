// eslint-disable-next-line quotes, no-unused-vars
import React, { useState } from "react";
import '../styles/popup.css'

// eslint-disable-next-line react/prop-types
const UpdateList = ({ editVisible, setEditVisible }) => {
  const ID = localStorage.getItem('editId')
  const token = localStorage.getItem('token')
  console.log(token)
  console.log(ID)

  const [title, setTitle] = React.useState('')
  const [address, setAddress] = React.useState('')
  const [thumbnail, setThumbnail] = React.useState('')
  const [price, setPrice] = React.useState('')
  const [bath, setBath] = React.useState('')
  const [property, setProperty] = React.useState('')
  const [amen, setAmen] = React.useState('')

  const [roomNumber, setRoomNumber] = React.useState(0)
  const listRoomNumber = []
  for (let i = 0; i < roomNumber; i++) {
    listRoomNumber.push(i)
  }

  const editList = async () => {
    const bedNumber = document.getElementsByClassName('bed-number')
    const bedNumber2 = []
    for (const i of bedNumber) {
      bedNumber2.push(i.value)
    }
    let bedNum = 0
    for (const i of bedNumber2) {
      bedNum = bedNum + parseInt(i)
    }
    console.log(bedNum)

    const metadata = []
    metadata.push(roomNumber)
    metadata.push(bedNum)
    metadata.push(bath)
    metadata.push(property)
    metadata.push(amen)
    console.log(metadata)

    const response = await fetch('http://localhost:5005/listings/' + ID, {
      method: 'PUT',
      headers: { 'Content-type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({
        title: title,
        address: address,
        price: price,
        thumbnail: thumbnail,
        metadata: metadata
      })
    })
    const data = await response.json()
    if (data.error) {
      alert(data.error)
    } else {
      console.log(data)
      window.location.href = '/Hostedlistings'
    }
  }

  return (
    <div className='backGround'>
      <div className='backGround2'>
        <div className='popupClose' onClick={() => setEditVisible(!editVisible)}>×</div><br/>
        <span className='popupSpan'>Title: </span><input type='text' id='title' onChange={ (event) => { setTitle(event.target.value) } } value={title} /><br/>
        <span className='popupSpan'>Address: </span><input type='text' id='address' onChange={ (event) => { setAddress(event.target.value) } } value={address} /><br/>
        <span className='popupSpan'>Property Type: </span><input type='text' id='property' onChange={ (event) => { setProperty(event.target.value) } } value={property} /><br/>
        <span className='popupSpan'>Price: </span><input type='text' id='price' onChange={ (event) => { setPrice(event.target.value) } } value={price} /><br/>
        <span className='popupSpan'>Thumbnail: </span><input type='text' id='thumbnail' onChange={ (event) => { setThumbnail(event.target.value) } } value={thumbnail} /><br/>
        {listRoomNumber.map(item => (
          <div key={item}>
            <span className='popupSpan'>Bedroom number: </span>
            <input type='text' /><br/>
            <span className='popupSpan'>Number of beds: </span>
            <input type='text' className='bed-number' /><br/>
          </div>
        ))}
        <button className='popupSpan' onClick={() => { setRoomNumber(roomNumber + 1) }}>Add bedroom</button><br/>
        <span className='popupSpan'>Number of bathrooms: </span><input type='text' id='bath-number' onChange={ (event) => { setBath(event.target.value) } } value={bath} /><br/>
        <span className='popupSpan'>Property amenities: </span><input type='text' id='amen' onChange={ (event) => { setAmen(event.target.value) } } value={amen} /><br/>
        <button className='popupButton' onClick={editList}>Update it!!</button>
      </div>
    </div>
  )
}
export default UpdateList
