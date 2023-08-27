import React, { useEffect, useState } from "react";
import axios from "axios";
import JournalCard from "../components/JournalCard";
import { fetchJournal } from "../store/journalStore";
import {useDispatch,useSelector} from "react-redux";
import Carousel from "react-multi-carousel";
import 'react-multi-carousel/lib/styles.css';

const JournalData = () => {
  const [data, setData] = useState([]);
  const journal = useSelector((state)=>state.journal);
  const dispatch  = useDispatch();
  console.log(journal.data)
  let auth = localStorage.getItem("user");
  auth = JSON.parse(auth);
  const id = auth._id;
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };
  useEffect(() => {
    getdata();
    dispatch(fetchJournal(id))
  }, []);

  const getdata = async () => {
    axios.get(`http://localhost:5000/boardData/${id}`).then(({data}) => {
      // console.log(data);
      setData(data);
    }).catch((error)=>{
      console.log(error)
    })
  };

  return (
   <div style={{minHeight:"100vh",scrollBehavior:"smooth" }} className="d-flex flex-column justify-content-center scroll" >
     <Carousel responsive={responsive}  showDots={true} >
      {data.map((res, key) => (
        <JournalCard
          key={key}
          id ={res._id}
          date={res.date}
          image={res.image}
          text={res.text}
          title={res.title}
        />
      ))}
    </Carousel>
   </div>
  );
};

export default JournalData;

