import React, { useEffect } from 'react';

// eslint-disable-next-line react/prop-types
const Filterresult4 = ({ filterVisible4, setFilterVisible4 }) => {
  const email = localStorage.getItem('email')
  const year1 = localStorage.getItem('year1')
  const year2 = localStorage.getItem('year2')
  const month1 = localStorage.getItem('month1')
  const month2 = localStorage.getItem('month2')
  const day1 = localStorage.getItem('day1')
  const day2 = localStorage.getItem('day2')
  const [allId2, setAllId2] = React.useState([])
  const [allListing2, setAllListing2] = React.useState([])

  const order1 = `${year1}-${month1}-${day1}`
  const order2 = `${year2}-${month2}-${day2}`
  const total = parseInt(Date.parse(order2) - Date.parse(order1)) / (1000 * 24 * 60 * 60)
  console.log(total)
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
        const date1 = `${data.listing.availability[0]}-${data.listing.availability[1]}-${data.listing.availability[2]}`
        const date2 = `${data.listing.availability[3]}-${data.listing.availability[4]}-${data.listing.availability[5]}`
        console.log(date1, date2)
        const num1 = parseInt((Date.parse(order1) - Date.parse(date1)) / (1000 * 24 * 60 * 60))
        const num2 = parseInt((Date.parse(date2) - Date.parse(order2)) / (1000 * 24 * 60 * 60))
        console.log(num1, num2)
        if (num1 >= 0 && num2 >= 0) {
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
    setFilterVisible4(!filterVisible4)
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
export default Filterresult4
