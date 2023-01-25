import React, { useEffect } from 'react';
import '../styles/popup.css'

// eslint-disable-next-line react/prop-types
const Filterresult = ({ filterVisible1, setFilterVisible1 }) => {
  const email = localStorage.getItem('email')
  const title = localStorage.getItem('title')
  const [allId, setAllId] = React.useState([])
  const [allListing, setAllListing] = React.useState([])

  const getFilter1 = async () => {
    const response = await fetch('http://localhost:5005/listings', {
      method: 'GET',
      headers: { 'Content-type': 'application/json' }
    })
    const data = await response.json()
    if (data.error) {
      alert(data.error)
    } else {
      const listId = []
      for (const i of data.listings) {
        if (i.owner !== email) {
          if (i.title.toLowerCase() === title.toLowerCase() || i.address.toLowerCase() === title.toLowerCase()) {
            listId.push(i.id)
          }
        }
      }
      setAllId(listId)
    }
  }

  useEffect(() => {
    getFilter1()
  }, [])

  useEffect(() => {
    getFilter11()
  }, [allId.length])

  const getFilter11 = async () => {
    const allList = []
    for (const i of allId) {
      const response = await fetch('http://localhost:5005/listings/' + i, {
        method: 'GET',
        headers: { 'Content-type': 'application/json' }
      })
      const data = await response.json()
      if (data.error) {
        alert(data.error)
      } else {
        allList.push([data, i])
      }
    }
    setAllListing(allList)
  }
  console.log(allListing)

  const getSpecific = (ID) => {
    localStorage.setItem('specificID', ID)
    window.location.href = '/Specific'
  }

  const closeFilter = () => {
    setFilterVisible1(!filterVisible1)
    window.location.href = '/Filter'
  }

  return (
    <div className='backGround'>
      <div className='backGround2'>
        <div className='popupClose' onClick={closeFilter}>×</div>
        { allListing.length !== 0
          ? (allListing.map(item => (
          <div key={item[1]}>
            <div>{item[0].listing.title}</div>
            <div>
              <span>{item[0].listing.metadata[0]}bedrooms, </span>
              <span>{item[0].listing.metadata[1]}beds, </span>
              <span>{item[0].listing.metadata[2]}bathrooms</span>
              <div>${item[0].listing.price} per night</div>
              <button onClick={() => { getSpecific(item[1]) }}>get specific</button>
              <hr/>
            </div>
          </div>
            )))
          : <div className='popupSpan'>no result</div>}
      </div>
    </div>
  )
}
export default Filterresult
