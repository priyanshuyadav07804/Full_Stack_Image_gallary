import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Desc = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [imageUrl,setImageUrl] = useState('');
  const [desc, setDesc] = useState("");
  const [title, setTitle] = useState("");
  const [updateMode, setUpdateMode] = useState(false);
  const [statusMsg, setStatusMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {
    const fetchData = async () => {
        try {
            const res = await axios.get(
                `http://localhost:8000/api/v1/${id}`
              );
              setImageUrl(res.data.photo)
              setDesc(res.data.desc);
              setTitle(res.data.title);
        } catch (error) {
            console.log(error)
        }
      
    };
    fetchData();
  }, [id]);

  const handleDelete = async () => {
    await axios.delete(
      `http://localhost:8000/api/v1/delete/${id}`
    );
    alert("delete successfully");
    navigate("/");
  };

  const handleUpdate = async () => {
    try {
      setIsLoading(true);
      setStatusMsg("loading...");
      const response = await axios.patch(
        `http://localhost:8000/api/v1/update/${id}`,
        { desc }
      );
      if (response.data) {
        setStatusMsg("Data Updated");
        setTimeout(() => {
          setStatusMsg(null);
          setUpdateMode(false);
          setIsLoading(false);
        }, 2000);
      }
    } catch (error) {
      console.log(error);
      setStatusMsg("Error...");
      setTimeout(() => {
        setStatusMsg(null);
        setUpdateMode(false);
        setIsLoading(false);
      }, 3000);
    }
  };

  return (
    <div className="desc-window">
      {updateMode ? (
        <h1 className="btn" onClick={() => setUpdateMode(false)}>
          Cancle
        </h1>
      ) : (
        <h1 className="btn" onClick={() => navigate("/")}>
          Go Back
        </h1>
      )}

      <div className="center">
        <img className="desc-img" src={imageUrl} alt="" />

        <div className="desc-brake">
          {updateMode ? (
            <input
              className="desc-input-title"
              type="text"
              value={title}
              autoFocus
              onChange={(e) => setTitle(e.target.value)}
              disabled={isLoading}
            />
          ) : (
            <p className="desc-title">{title}</p>
          )}

          {updateMode ? (
            ""
          ) : (
            <button className="delete" onClick={handleDelete}>
              Delete
            </button>
          )}

          {updateMode ? (
            <button className="edit" onClick={handleUpdate} disabled={isLoading}>
              Update
            </button>
          ) : (
            <button className="edit" onClick={() => setUpdateMode(true)}>
              Edit
            </button>
          )}
        </div>
        {statusMsg && <span>{statusMsg}</span>}

        {updateMode ? (
          <textarea
            className="desc-desc"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            disabled={isLoading}
          />
        ) : (
          <p className="desc-desc-p">{desc}</p>
        )}
      </div>
    </div>
  );
};

export default Desc;
