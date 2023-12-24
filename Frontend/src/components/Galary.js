import axios from 'axios'
import React, { useEffect, useState } from 'react'
import '../App.css'
import { useDispatch } from 'react-redux'
import { openModal } from '../feature/modal/modalSlice'
import { useNavigate } from "react-router-dom";
import { addItem } from '../feature/Item/ItemSlice'

const Galary = () => {

    const [data,setData] = useState([])
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [statusMsg,setStatusMsg] = useState('Loading...')

    useEffect(() => {
      const fetchData = async () => {
        try {
          const res = await axios.get('http://localhost:8000/api/v1');
          setData(res.data);
          setStatusMsg(res.data.length === 0 ? 'No data to show' : '');
        } catch (error) {
          setStatusMsg('Failed to fetch data'); // Update status message in case of error
        }
      };
    fetchData()
  },[])

  if(data.length === 0){
    return <>
        <h1>{statusMsg}</h1>
    </>
  }
  return (
    <>
    <h1>Image Galary</h1>
    <h1 className='btn' onClick={()=>navigate('/add-img')}>Add Image</h1>
    <div className='container'>
      {data.map((data)=>(
        <div className='clm' key={data._id}>
          <img className='postImg' src={data.photo} alt='' onClick={()=>dispatch(openModal(data.photo))} />
          
          <p onClick={()=>{dispatch(addItem(data)); navigate(`/single-item/${data._id}`)}}>{data.title}</p>
        </div>
      ))}
      
    </div>
    </>
  )
}

export default Galary
