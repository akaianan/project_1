import React from 'react';
import Filterresult from '../components/Filterresult';
import Filterresult2 from '../components/Filterresult2';
import Filterresult3 from '../components/Filterresult3';
import Filterresult4 from '../components/Filterresult4';
import '../styles/mainStyle.css'

const Filter = () => {
  const [title, setTitle] = React.useState('')
  const [price1, setPrice1] = React.useState('')
  const [price2, setPrice2] = React.useState('')
  const [room1, setRoom1] = React.useState('')
  const [room2, setRoom2] = React.useState('')
  const [year1, setYear1] = React.useState('')
  const [year2, setYear2] = React.useState('')
  const [month1, setMonth1] = React.useState('')
  const [month2, setMonth2] = React.useState('')
  const [day1, setDay1] = React.useState('')
  const [day2, setDay2] = React.useState('')

  const [filterVisible1, setFilterVisible1] = React.useState(false)
  const [filterVisible2, setFilterVisible2] = React.useState(false)
  const [filterVisible3, setFilterVisible3] = React.useState(false)
  const [filterVisible4, setFilterVisible4] = React.useState(false)

  const getFilter1 = () => {
    localStorage.setItem('title', title)
    setFilterVisible1(!filterVisible1)
  }

  const getFilter2 = () => {
    localStorage.setItem('price1', price1)
    localStorage.setItem('price2', price2)
    setFilterVisible2(!filterVisible2)
  }

  const getFilter3 = () => {
    localStorage.setItem('room1', room1)
    localStorage.setItem('room2', room2)
    setFilterVisible3(!filterVisible3)
  }

  const getFilter4 = () => {
    localStorage.setItem('year1', year1)
    localStorage.setItem('year2', year2)
    localStorage.setItem('month1', month1)
    localStorage.setItem('month2', month2)
    localStorage.setItem('day1', day1)
    localStorage.setItem('day2', day2)
    setFilterVisible4(!filterVisible4)
  }

  return (
    <>
      {filterVisible1 && <Filterresult filterVisible1={filterVisible1} setFilterVisible1={setFilterVisible1} />}
      {filterVisible2 && <Filterresult2 filterVisible2={filterVisible2} setFilterVisible2={setFilterVisible2} />}
      {filterVisible3 && <Filterresult3 filterVisible3={filterVisible3} setFilterVisible3={setFilterVisible3} />}
      {filterVisible4 && <Filterresult4 filterVisible4={filterVisible4} setFilterVisible4={setFilterVisible4} />}
      <h3 className='center' style={ { marginTop: '10px' }}>Please choose one feature to search the listing you want:</h3>
      <div className='filterStyle'><span>title or address: </span><input type = 'text' onChange={(event) => { setTitle(event.target.value) } } value={title} /></div>
      <div className='center' style={ { marginBotton: '20px' }}><button className='goStyle' onClick={getFilter1}>Go!!</button></div>
      <div className='filterStyle'>
        <span>min price: </span><input type = 'text' onChange={(event) => { setPrice1(event.target.value) } } value={price1} />
        <span>max price: </span><input type = 'text' onChange={(event) => { setPrice2(event.target.value) } } value={price2} />
      </div>
      <div className='center'><button className='goStyle' onClick={getFilter2}>Go!!</button></div>
      <div className='filterStyle'>
        <span>min bedroom: </span><input type = 'text' onChange={(event) => { setRoom1(event.target.value) } } value={room1} />
        <span>max bedroom: </span><input type = 'text' onChange={(event) => { setRoom2(event.target.value) } } value={room2} />
      </div>
      <div className='center'><button className='goStyle' onClick={getFilter3}>Go!!</button></div>
      <div className='filterStyle'>
        <span>from: </span>
        <span>year</span><input type='text' onChange={(event) => { setYear1(event.target.value) } } value={year1} />
        <span>month</span><input type='text' onChange={(event) => { setMonth1(event.target.value) } } value={month1} />
        <span>day</span><input type='text' onChange={(event) => { setDay1(event.target.value) } } value={day1} /><br/>
        <span>to: </span>
        <span>year</span><input type='text' onChange={(event) => { setYear2(event.target.value) } } value={year2} />
        <span>month</span><input type='text' onChange={(event) => { setMonth2(event.target.value) } } value={month2} />
        <span>day</span><input type='text' onChange={(event) => { setDay2(event.target.value) } } value={day2} />
      </div>
      <div className='center'><button className='goStyle' onClick={getFilter4}>Go!!</button></div>
    </>
  )
}

export default Filter
