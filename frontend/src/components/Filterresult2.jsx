import React, { useEffect } from 'react';

// eslint-disable-next-line react/prop-types
const Filterresult2 = ({ filterVisible2, setFilterVisible2 }) => {
  const email = localStorage.getItem('email')
  const price1 = localStorage.getItem('price1')
  const price2 = localStorage.getItem('price2')
  const [allId2, setAllId2] = React.useState([])
  const [allListing2, setAllListing2] = React.useState([])

  const getFilter2 = async () => {
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
          listId.push(i.id)
        }
      }
      setAllId2(listId)
    }
  }

  useEffect(() => {
    getFilter2()
  }, [])

  useEffect(() => {
    getFilter22()
  }, [allId2.length])

  const getFilter22 = async () => {
    const allList = []
    for (const i of allId2) {
      const response = await fetch('http://localhost:5005/listings/' + i, {
        method: 'GET',
        headers: { 'Content-type': 'application/json' }
      })
      const data = await response.json()
      if (data.error) {
        alert(data.error)
      } else {
        if (parseInt(data.listing.price) >= parseInt(price1) && parseInt(data.listing.price) <= parseInt(price2)) {
          console.log(data)
          allList.push([data, i])
        }
      }
    }
    setAllListing2(allList)
  }
  console.log(allListing2)

  const getSpecific = (ID) => {
    localStorage.setItem('specificID', ID)
    window.location.href = '/Specific'
  }

  const closeFilter = () => {
    setFilterVisible2(!filterVisible2)
    window.location.href = '/Filter'
  }

  return (
    <div className='backGround'>
      <div className='backGround2'>
      <div className='popupClose' onClick={closeFilter}>×</div>
      {allListing2.length !== 0
        ? (allListing2.map(item => (
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
        : <div>no result</div>}
      </div>
    </div>
  )
}

export default Filterresult2
