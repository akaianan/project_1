import React, { useEffect } from 'react';
import { Button } from '@material-ui/core'

const Landing = () => {
  const email = localStorage.getItem('email')
  console.log(email)
  const [allID, setAllID] = React.useState([])
  const [allListing, setAllListing] = React.useState([])

  const getListings = async () => {
    const response = await fetch('http://localhost:5005/listings', {
      method: 'GET',
      headers: { 'Content-type': 'application/json' }
    })
    const data = await response.json()
    if (data.error) {
      alert(data.error)
    } else {
      console.log(data.listings)
      const listID = []
      for (const i of data.listings) {
        listID.push(i.id)
      }
      setAllID(listID)
    }
  }
  console.log(allID)

  useEffect(() => {
    getListings()
  }, [])

  useEffect(() => {
    getList()
  }, [allID.length])

  const getList = async () => {
    const allList = []
    for (const i of allID) {
      const response = await fetch('http://localhost:5005/listings/' + i, {
        method: 'GET',
        headers: { 'Content-type': 'application/json' }
      })
      const data = await response.json()
      if (data.error) {
        alert(data.error)
      } else {
        if (data.listing.published === true && data.listing.owner !== email) {
          allList.push([data, i])
        }
      }
    }
    setAllListing(allList)
  }
  console.log(allListing)

  const getSpecific = (ID) => {
    localStorage.setItem('specificID', ID)
    window.location.href = '/Specific'
  }

  return (
    <>
      <Button variant="contained" color="success" style={ { color: 'green', marginLeft: '5px', marginTop: '5px', marginBottom: '10px' } } onClick={() => { window.location.href = '/Filter' }}>get filter</Button><br/>
      {allListing.map(item => (
        <div key={item[1]} >
          <div className='tiStyle'>{item[0].listing.title}</div>
          <div>
            <div className='wordStyle2'>
              <span>{item[0].listing.metadata[0]}bedrooms, </span>
              <span>{item[0].listing.metadata[1]}beds, </span>
              <span>{item[0].listing.metadata[2]}bathrooms</span>
            </div>
            <div className='wordStyle2'>${item[0].listing.price} per night</div>
            { /*  <img src={item[0].listing.thumbnail } /> <p>{item[0].listing.thumbnail.slice(0, 5)}</p> */ }
            { item[0].listing.thumbnail.slice(0, 4) === 'data'
              ? <img src={item[0].listing.thumbnail } />
              : <embed src={item[0].listing.thumbnail }/>}<br/>
              <div className='center'><button className='btnStyle' onClick={() => { getSpecific(item[1]) }}>get detail</button></div>
            <hr/>
          </div>
        </div>
      ))}
    </>
  )
}
export default Landing
