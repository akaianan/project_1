import React, { useEffect } from 'react';
import Createlist from '../components/Createlist';
import Publishdate from '../components/Publishdate';
import UpdateList from '../components/Updatelist';
import '../styles/picture.css'
import '../styles/Welcomestyle.css'

const Hostedlistings = () => {
  const [createVisible, setCreateVisible] = React.useState(false)
  const [allIdList, setAllIdList] = React.useState([])
  const [allInfoList, setAllInfoList] = React.useState([])
  const [editVisible, setEditVisible] = React.useState(false)
  const [publishVisible, setPublishVisible] = React.useState(false)
  const [allBookList, setAllBookList] = React.useState([])
  const [allNewList, setAllNewList] = React.useState([])

  const getListings = async () => {
    const response = await fetch('http://localhost:5005/listings', {
      method: 'GET',
      headers: { 'Content-type': 'application/json' },
    })
    const data = await response.json()
    if (data.error) {
      alert(data.error)
    } else {
      const allId = []
      for (const i of data.listings) {
        allId.push(i.id)
      }
      setAllIdList(allId)
    }
  }

  useEffect(() => {
    getListings()
  }, [])

  const getAllInfo = async () => {
    const allInfo = []
    const email = localStorage.getItem('email')
    for (const i of allIdList) {
      const response = await fetch('http://localhost:5005/listings/' + i, {
        method: 'GET',
        headers: { 'Content-type': 'application/json' }
      })
      const data = await response.json()
      if (data.error) {
        alert(data)
      } else {
        if (email === data.listing.owner) {
          allInfo.push([data, i])
        }
      }
    }
    setAllInfoList(allInfo)
  }
  console.log(allInfoList)

  useEffect(() => {
    getAllInfo()
  }, [allIdList.length])

  const editFun = (ID) => {
    setEditVisible(!editVisible)
    localStorage.setItem('editId', ID)
  }

  const deleteList = async (id) => {
    console.log(id)
    const token = localStorage.getItem('token')
    const response = await fetch('http://localhost:5005/listings/' + id, {
      method: 'DELETE',
      headers: { 'Content-type': 'application/json', Authorization: `Bearer ${token}` }
    })
    const data = await response.json()
    if (data.error) {
      alert(data.error)
    } else {
      console.log(data)
      window.location.href = '/Hostedlistings'
    }
  }

  const publishList = async (ID) => {
    localStorage.setItem('publishId', ID)
    const response = await fetch('http://localhost:5005/listings/' + ID, {
      method: 'GET',
      headers: { 'Content-type': 'application/json' }
    })
    const data = await response.json()
    if (data.error) {
      alert(data)
    } else {
      if (data.listing.published === false) {
        setPublishVisible(!publishVisible)
      }
    }
  }

  const unPublishList = async (ID) => {
    localStorage.setItem('unpublishId', ID)
    const response = await fetch('http://localhost:5005/listings/' + ID, {
      method: 'GET',
      headers: { 'Content-type': 'application/json' }
    })
    const data = await response.json()
    if (data.error) {
      alert(data)
    } else {
      if (data.listing.published === true) {
        const ID = localStorage.getItem('unpublishId')
        const token = localStorage.getItem('token')
        const response = await fetch('http://localhost:5005/listings/unpublish/' + ID, {
          method: 'PUT',
          headers: { 'Content-type': 'application/json', Authorization: `Bearer ${token}` }
        })
        const data = await response.json()
        if (data.error) {
          alert(data.error)
        } else {
          console.log(data)
          alert('Unpublish successfully!')
        }
      }
    }
  }

  const getBookList = async () => {
    const bookList = []
    const token = localStorage.getItem('token')
    const response = await fetch('http://localhost:5005/bookings', {
      method: 'GET',
      headers: { 'Content-type': 'application-json', Authorization: `Bearer ${token}` }
    })
    const data = await response.json()
    if (data.error) {
      alert(data.error)
    } else {
      console.log(data)
      for (const i of data.bookings) {
        bookList.push(i)
      }
    }
    setAllBookList(bookList)
  }
  console.log(allBookList)

  useEffect(() => {
    getAllInfo2()
  }, [allBookList.length])

  const getAllInfo2 = async () => {
    const email = localStorage.getItem('email')
    const newList = []
    for (const i of allBookList) {
      const response = await fetch('http://localhost:5005/listings/' + i.listingId, {
        method: 'GET',
        headers: { 'Content-type': 'application/json' }
      })
      const data = await response.json()
      if (data.error) {
        alert(data.error)
      } else {
        if (data.listing.owner === email) {
          newList.push([data, i.listingId])
        } else {
          newList.push([0, 0])
        }
      }
    }
    setAllNewList(newList)
  }
  console.log(allNewList)

  const totalList = []
  for (let i = 0; i < allNewList.length; i++) {
    if (allNewList[i][1] === allBookList[i].listingId) {
      totalList.push([allNewList[i], allBookList[i]])
    }
  }
  console.log(totalList)

  const totalList2 = []
  for (const i of totalList) {
    if (!totalList2.includes(i[0][0].listing.title)) {
      totalList2.push(i[0][0].listing.title)
    }
  }
  console.log(totalList2)

  const totalList3 = []
  for (const i of totalList2) {
    totalList3.push([i])
  }
  console.log(totalList3)
  for (const j of totalList3) {
    let price = 0
    let day = 0
    const dataList = []
    for (const i of totalList) {
      if (j[0] === i[0][0].listing.title) {
        dataList.push(i)
        if (i[0][0].listing.published === true) {
          const time = new Date()
          const time2 = time.getTime()
          const timed = i[0][0].listing.postedOn.slice(0, 10)
          const timed2 = Date.parse(timed)
          const result = parseInt((time2 - timed2) / (24 * 3600 * 1000))
          if (!j.includes(result)) {
            j.push(result)
          }
        }
        if (i[0][0].listing.published === false) {
          const result = 0
          if (!j.includes(result)) {
            j.push(result)
          }
        }
        if (i[1].status === 'accepted') {
          price = price + parseInt(i[1].totalPrice)
        }
        console.log(i[1].dateRange[1])
        const day1 = Date.parse(i[1].dateRange[1])
        const day2 = Date.parse(i[1].dateRange[0])
        const dayy = parseInt((day1 - day2) / (1000 * 3600 * 24))
        day = day + dayy
      }
    }
    j.push(price)
    j.push(day)
    j.push(dataList)
  }
  console.log(totalList3)

  const getAccept = async (ID) => {
    const token = localStorage.getItem('token')
    const response = await fetch('http://localhost:5005/bookings/accept/' + ID, {
      method: 'PUT',
      headers: { 'Content-type': 'application/json', Authorization: `Bearer ${token}` }
    })
    const data = await response.json()
    if (data.error) {
      alert(data.error)
    } else {
      console.log(data)
      window.location.href = '/Hostedlistings'
    }
  }

  const getDecline = async (id) => {
    const token = localStorage.getItem('token')
    const response = await fetch('http://localhost:5005/bookings/decline/' + id, {
      method: 'PUT',
      headers: { 'Content-type': 'application/json', Authorization: `Bearer ${token}` }
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
    <>
      {createVisible && <Createlist createVisible={createVisible} setCreateVisible={setCreateVisible} />}
      {editVisible && <UpdateList editVisible={editVisible} setEditVisible={setEditVisible} />}
      {publishVisible && <Publishdate publishVisible={publishVisible} setPublishVisible={setPublishVisible} />}
      {allInfoList.map(item => (
        <div key={item[1]}>
          <div className='titleStyle'>{item[0].listing.title}</div>
          <div>
            <span className='spanStyle2'>{item[0].listing.metadata[0]}bedrooms, </span>
            <span className='spanStyle2'>{item[0].listing.metadata[1]}beds, </span>
            <span className='spanStyle2'>{item[0].listing.metadata[2]}bathrooms</span>
            <div className='spanStyle2'>${item[0].listing.price} per night</div>
            { /*  <img src={item[0].listing.thumbnail } /> <p>{item[0].listing.thumbnail.slice(0, 5)}</p> */ }
            { item[0].listing.thumbnail.slice(0, 4) === 'data'
              ? <img src={item[0].listing.thumbnail } />
              : <embed src={item[0].listing.thumbnail }/>}<br/>
            <button className='buttonStyle' onClick={() => editFun(item[1])}>edit</button>
            <button className='buttonStyle' onClick={() => deleteList(item[1])}>delete</button>
            <button className='buttonStyle' onClick={() => publishList(item[1])}>publish</button>
            <button className='buttonStyle' onClick={() => unPublishList(item[1])}>unpublish</button>
          </div>
          <hr/>
        </div>
      ))}
      <div>
        <button className='buttonStyle2' onClick={getBookList}>show booking</button>
        <button className='buttonStyle2' onClick={() => setCreateVisible(!createVisible)}>create new list</button>
        {totalList3.map(item => (
          <div key={item[0]}>
            <h3>{item[0]}</h3>
            <div>has been published for {item[1]} days</div>
            <div>has earned {item[2]} dollars this year</div>
            <div>has been predicted for {item[3]} days this year</div>
            {item[4].map(item2 => (
              <div key={item2}>
                <hr/>
                <div>has been booked from {item2[1].dateRange[0]} to {item2[1].dateRange[1]}</div>
                <div>total price : {item2[1].totalPrice}</div>
                {item2[1].status === 'pending'
                  ? (
              <div>
                <button onClick={() => getAccept(item2[1].id)}>accept</button>
                <button onClick={() => getDecline(item2[1].id)}>decline</button>
              </div>
                    )
                  : <div>Status: {item2[1].status}</div> }
              </div>
            ))}
          <hr/>
        </div>
        ))}
       </div>
    </>
  )
}

export default Hostedlistings
