import React, { useEffect, useState } from 'react'
import { useParams , useNavigate, Link } from 'react-router-dom'
import { RxUpdate } from 'react-icons/rx';
import { AiFillDelete } from 'react-icons/ai';
import axios from 'axios';

const JournalMain = () => {
  const params = useParams();
  const navigate  = useNavigate();
  const [date, setDate] = useState('');
  const [title, settitle] = useState('');
  const [text, setText] = useState("");
  const [image, setImage] = useState('');



  const getSingleJournalData = async () => {
    const { data } = await axios.get(`http://localhost:5000/singleJournal/${params.id}`)
    console.log(data)
    setDate(data.date)
    settitle(data.title)
    setText(data.text)
    setImage(data.image)
  }
  useEffect(() => {
    getSingleJournalData()
  }, [])

  const deleteHandler = (id)=>{
   let con =window.confirm("are you sure you want to delete this post?")
   if(con){
    const data = axios.delete(`http://localhost:5000/deleteSingle/${id}`)
    data.then(({data})=>{
      alert(data.result)
      navigate("/")
    }).catch((err)=>{
      console.log(err)
      alert(err.message)
    })
   }else{
    alert("dleted canceled")
   }
  }


  const datenow = new Date(date);
  const formatedDate = datenow.toLocaleDateString("en-UK", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })

  return (
    <div className='rounded bg-light bg-gradient text-black card text-center mt-2 p-2 overflow-auto' style={{ width: "90%", height: "95vh", margin: "auto"}}>
       
      <date>{formatedDate}</date>
      <h2 className="text-capitalize">{title}</h2>
      <p className='text-justify'>{text}</p>
      <img src={`http://localhost:5000/journalImage/${image}`} alt="..." className='m-auto rounded' width='300px' />
      <div>
        <Link to={`/update/${params.id}`}><button className="btn btn-outline-success m-2"><RxUpdate/> Update</button></Link>
        <button className="btn btn-outline-danger m-2" onClick={()=>{deleteHandler(params.id)}} ><AiFillDelete/> Delete</button>
        <button className='btn btn-outline-dark' onClick={() => navigate(-1)}>Go back</button>
      </div>
    </div>
  )
}

export default JournalMain
