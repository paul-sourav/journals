import React from "react";
import {BsArrowsFullscreen} from 'react-icons/bs';
import './journalCard.css';
import { useNavigate } from "react-router-dom";


const JournalCard = ({ id, date, image, text, title }) => {
  const navigate  = useNavigate();
  const datenow = new Date(date);
  const formattedDate = datenow.toLocaleDateString("en-UK",{
    day: "numeric",
    month:"long",
    year:"numeric",
  });

  return (
    <div className="d-flex flex-column journalCard position-relative">
        <button className=" btn position-absolute left-0 btn-dark" onClick={()=>{navigate(`/main/${id}`)}}>
          <BsArrowsFullscreen/>
        </button><br/>
        <date className="bg-primary p-1 rounded text-white">{formattedDate}</date>
        <h2 className="text-capitalize">{title}</h2>
        <p>{text}</p>
        <img src={`http://localhost:5000/journalImage/${image}`} alt="..." className="img-thumbnail img-fluid"/>
    </div>  
  );
};

export default JournalCard;
