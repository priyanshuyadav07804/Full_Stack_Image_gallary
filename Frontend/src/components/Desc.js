import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom';

const Desc = () => {

    const {item} = useSelector((state)=>state.item)
    const {id} = useParams()
    const navigate = useNavigate()

    const [data,setData] = useState({});

    const fetchData = async() =>{
        if(item.length === 0){
            const res = await axios.get(`http://localhost:8000/api/v1/${id}`)
            console.log(res)
            setData(res.data)
        }else{
            setData(item)
        }
    }

    const handleDelete = async()=>{
        await axios.delete(`http://localhost:8000/api/v1/delete/${id}`)
        alert('delete successfully')
        navigate('/') 
    }
    useEffect(()=>{
        fetchData()
    },[])

  return (
    <div className='form-window'>
        <h1 className='btn' onClick={()=>navigate('/')}>Go Back</h1>

       
          <img className='desc-img' src={data.photo} alt='' />
          
          <div className='brake'>

          <p >{data.title}</p>
          <button className='delete' onClick={handleDelete}>Delete</button>
          </div>

          <p className='desc-desc'>{data.desc}</p>
            
    </div>
    
  )
}

export default Desc
