import React, { useState } from "react";
import axios from 'axios';
import "../App.css";
import { useNavigate } from "react-router-dom";

const AddImage = () => {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [statusMsg,setStatusMsg] = useState(null)

  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const file = e.target.files[0]; 
    if (file && file.size > 10 * 1024 * 1024) { // Check if file size is greater than 10MB
      alert('File size exceeds 10MB. Please select a smaller file.');
      setSelectedFile(null); // Clear the selected file
    } else {
      setSelectedFile(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (title.trim().length !== 0 && desc.trim().length !== 0 && selectedFile) {
        setStatusMsg('loading...')
      try {
        const formData = new FormData();
        formData.append('image', selectedFile);
        formData.append('title', title);
        formData.append('desc', desc);

        const response = await axios.post('http://localhost:8000/api/v1', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });

        console.log('Image uploaded:', response.data);
        if(response.data){
            setStatusMsg('Image Uploded')
            setTimeout(() => {
                setStatusMsg(null)
            }, 3000);
        }
        // navigate('/');
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    } else {
      alert('Please enter all values');
    }
  };

  return (
    <div className="form-window">
      <h1>Add Image</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Enter Title"
          className="input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="brake">
          <textarea
            type="text"
            name="desc"
            placeholder="Enter Desc"
            rows={8}
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
          <input
            type="file"
            name="photo"
            onChange={handleFileChange}
          />
        </div>
        {statusMsg && <span>{statusMsg}</span>}
        <button type="submit">Publish</button>
      </form>
      <button className="back-btn" onClick={() => navigate("/")}>
        Back
      </button>
    </div>
  );
};

export default AddImage;
