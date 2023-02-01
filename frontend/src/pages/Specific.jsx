import React, { useEffect } from 'react';

import Bookdate from '../components/Bookdate';
import '../styles/mainStyle.css'
import '../styles/hoSty.css'

const Specific = () => {
  const ID = localStorage.getItem('specificID')
  console.log(ID)
  const [showSpecific, setShowSpecific] = React.useState([])
  const [bookVisible, setBookVisible] = React.useState(false)
  const [allBookList, setAllBookList] = React.useState([])
  const [allNewList, setAllNewList] = React.useState([])
  const [comment, setComment] = React.useState('')
  const [rating, setRating] = React.useState('')
  const token = localStorage.getItem('token')

  const getList = async () => {
    const response = await fetch('http://localhost:5005/listings/' + ID, {
      method: 'GET',
      headers: { 'Content-type': 'application/json' }
    })
    const speList = []
    const data = await response.json()
    if (data.error) {
      alert(data.error)
    } else {
      console.log(data)
      speList.push([data, ID])
    }
    setShowSpecific(speList)
  }

  useEffect(() => {
    getList()
  }, [])

  const IdPrice = (bookID, bookPrice) => {
    localStorage.setItem('bookID', bookID)
    localStorage.setItem('bookPrice', bookPrice)
    setBookVisible(!bookVisible)
  }
  console.log(showSpecific)

  useEffect(() => {
    getBookList()
  }, [])

  const getBookList = async () => {
    const bookLists = []
    const token = localStorage.getItem('token')
    const email = localStorage.getItem('email')
    const response = await fetch('http://localhost:5005/bookings', {
      method: 'GET',
      headers: { 'Content-type': 'application-json', Authorization: `Bearer ${token}` }
    })
    const data = await response.json()
    if (data.error) {
      alert(data.error)
    } else {
      for (const i of data.bookings) {
        if (i.owner === email && i.listingId === ID) {
          bookLists.push(i)
        }
      }
    }
    setAllBookList(bookLists)
  }

  useEffect(() => {
    getAllInfo()
  }, [allBookList.length])

  const getAllInfo = async () => {
    const newList = []
    for (const i of allBookList) {
      const response = await fetch('http://localhost:5005/listings/' + i.listingId, {
        method: 'GET',
        headers: { 'Content-type': 'application/json' }
      })
      const data = await response.json()
      if (data.error) {
        alert(data)
      } else {
        console.log(data.listing.title)
        newList.push([i, data.listing.title])
      }
    }
    console.log(newList)
    setAllNewList(newList)
  }

  const submitReview = async (id1, id2) => {
    const response = await fetch('http://localhost:5005/listings/' + id1 + '/review/' + id2, {
      method: 'PUT',
      headers: { 'Content-type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({
        review: [comment, rating]
      })
    })
    const data = await response.json()
    if (data.error) {
      alert(data.error)
    } else {
      window.location.href = '/Specific'
    }
  }

  const deleteBook = async (id) => {
    const response = await fetch('http://localhost:5005/bookings/' + id, {
      method: 'DELETE',
      headers: { 'Content-type': 'application/json', Authorization: `Bearer ${token}` },
    })
    const data = await response.json()
    if (data.error) {
      alert(data.error)
    } else {
      window.location.href = '/Specific'
    }
  }

  return (
    <>
      {showSpecific.map(item => (
        <div key={item[1]}>
          <div className='tiStyle'>{item[0].listing.title}</div>
          <div className='wordStyle3'>Address: {item[0].listing.address}</div>
          <div className='wordStyle3'>Amenities: {item[0].listing.metadata[4]}</div>
          <div className='wordStyle3'>Price: ${item[0].listing.price} per day</div>
          { /*  <img src={item[0].listing.thumbnail } /> <p>{item[0].listing.thumbnail.slice(0, 5)}</p> */ }
          { item[0].listing.thumbnail.slice(0, 4) === 'data'
            ? <img src={item[0].listing.thumbnail } />
            : <embed src={item[0].listing.thumbnail }/>}<br/>
          <div className='wordStyle3'>Type: {item[0].listing.metadata[3]}</div>
          <div className='wordStyle3'>
            <span>{item[0].listing.metadata[0]} bedrooms, </span>
            <span>{item[0].listing.metadata[1]} beds, </span>
            <span>{item[0].listing.metadata[2]} bathrooms</span>
          </div>
          <div className='wordStyle3'>
            available date:
            <span> from </span><span>{`${item[0].listing.availability[0]}-${item[0].listing.availability[1]}-${item[0].listing.availability[2]}`}</span>
            <span> to </span><span>{`${item[0].listing.availability[3]}-${item[0].listing.availability[4]}-${item[0].listing.availability[5]}`}</span><br/>
          </div>
          <div className='wordStyle3'>Reviews: </div>
          {item[0].listing.reviews.map(item => (
            <div key={item}>
              <div className='wordStyle3'>Comment: {item[0]}</div>
              <div className='wordStyle3'><span>Rating: </span>{item[1] === '' ? <span>5</span> : <span>{item[1]}</span>}</div>
            </div>
          ))}
          <div className='center'>
            <button className='btnStyle' onClick={() => { IdPrice(item[1], item[0].listing.price) }}>Book it!!</button>
          </div>
          <hr/>
          {bookVisible && <Bookdate />}
        </div>
      ))}
      <h3 className='center'>Booking history</h3>
      {allNewList.map(item => (
        <div key={item[1]}>
          <div className='tiStyle2'>{item[1]}</div>
          <div className='wordStyle3'>from {item[0].dateRange[0]} to {item[0].dateRange[1]}</div>
          <div className='wordStyle3'>total price: {item[0].totalPrice}</div>
          <div className='wordStyle3'>status: {item[0].status}</div>
          {item[0].status === 'accepted'
            ? <div className='wordStyle3'>
            comment: <input type="text" onChange={ (event) => setComment(event.target.value) } value={comment} />
            <form>
              <span>Rating: </span>
              <select onChange={ (event) => setRating(event.target.value) } value={rating} >
                <option>5</option>
                <option>4</option>
                <option>3</option>
                <option>2</option>
                <option>1</option>
              </select>
            </form>
            <button className='btnStyle' onClick={ () => { submitReview(item[0].listingId, item[0].id) }}>submit</button><br/>
            </div>
            : <div></div>}
          <div className='center'><button className='btnStyle' onClick={ () => { deleteBook(item[0].id) }}>delete booking</button></div>
          <hr/>
        </div>
      ))}
    </>
  )
}

export default Specific
