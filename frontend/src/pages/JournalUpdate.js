import React, { useEffect, useState } from 'react'
import axios  from 'axios'
import {useNavigate, useParams} from "react-router-dom"

const JournalUpdate = () => {
    const navigate = useNavigate()
    const [date, setDate] = useState("");
    const [title, setTitle] = useState("");
    const [text, setText] = useState("");
    const [journalImg, setjournalImg] = useState("");
    const params = useParams() 

    useEffect(()=>{
        const data= axios.get(`http://localhost:5000/singleJournal/${params.id}`)
        data.then(({data})=>{
            setDate(data.date)
            setTitle(data.title)
            setText(data.text)
        }).catch((err)=>{
            console.log(err)
        })
    },[])

    const  formdata = new FormData();
    formdata.append("date",date)
    formdata.append("title",title)
    formdata.append("text",text)
    formdata.append("journalImg",journalImg)
    const  submitHandler = async() =>{
      console.log(formdata)
      const data  =axios.put(`http://localhost:5000/updateJournal/${params.id}`,formdata)
      data.then(({data})=>{
        alert(data.result)
     
      }).catch((err)=>{
        alert(err)
        console.log(err)
      })
      navigate("/")
    }
    const  dateObj = date.split("T");
  return (
    <div>
       <>
      <div className="board p-2">
        <form onSubmit={submitHandler} enctype="multipart/form-data" >
          <div className="page">
            <input
              type="date"
              value={dateObj[0]}
              onChange={(e) => {
                setDate(e.target.value);
              }}
            ></input>
 
            <input
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              placeholder="Title"
            ></input>

            <textarea
              value={text}
              onChange={(e) => {
                setText(e.target.value);
              }}
              className="textarea"
            ></textarea>

            <div className="input-group mb-3">
              <label className="input-group-text">image memory</label>
              <input
                className="form-control"
                type="file"
                onChange={(e) => {
                  setjournalImg(e.target.files[0]);
                }}
              ></input>
            </div>
          </div>
          <div className="float">
            <button type="submit" className="btn btn-success">
              Submit
            </button>
          </div>
        </form>
      </div>
       </>
    </div>
  )
}

export default JournalUpdate
