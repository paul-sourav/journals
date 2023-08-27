import React, { useState } from "react";
import axios from "axios";
import "./writingBoard.css";
import bg1 from "../assets/BG/1.jpg";
import bg2 from "../assets/BG/2.jpg";
import bg3 from "../assets/BG/3.jpg";
import { useNavigate } from "react-router-dom";
import { HiColorSwatch } from "react-icons/hi";
import { FaJournalWhills } from "react-icons/fa";

const Writingboard = () => {
  const navigate = useNavigate();
  const [date, setDate] = useState("");
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [journalImg, setjournalImg] = useState("");
  const [bgImage, setBgImage] = useState(0);
  const [theme, setTheme] = useState(false);
  let auth = localStorage.getItem("user");
  auth = JSON.parse(auth);
  const id = auth._id;
 
  const changeTheme = () => {
    return setTheme(!theme);
  };

  const formdata = new FormData();
  formdata.append("id", id);
  formdata.append("date", date);
  formdata.append("title", title);
  formdata.append("text", text);
  formdata.append("journalImg", journalImg);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!date || !title || !text) {
      alert("please fill all the fields");
      return false;
    }
    axios
      .post("http://localhost:5000/board", formdata)
      .then(({ data }) => {
        console.log(data);
        alert("sucessful");
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="board p-2">
        <form onSubmit={submitHandler}>
          <div className="page">
            <input
              type="date"
              onChange={(e) => {
                setDate(e.target.value);
              }}
            ></input>
            <input
              type="text"
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              placeholder="Title"
            ></input>
            <textarea
              style={{
                backgroundImage:
                  bgImage === 1
                    ? `url(${bg1})`
                    : bgImage === 2
                    ? `url(${bg2})`
                    : bgImage === 3
                    ? `url(${bg3})`
                    : null,
              }}
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
          <div className={theme ? "bg-change" : "bg-change display"}>
            <img
              src={bg1}
              alt="bgin"
              onClick={() => {
                setBgImage(1);
              }}
            />
            <img
              src={bg2}
              alt="bgin"
              onClick={() => {
                setBgImage(2);
              }}
            />
            <img
              src={bg3}
              alt="bgin"
              onClick={() => {
                setBgImage(3);
              }}
            />
          </div>
          <div className="float">
            <button
              type="button"
              className="btn btn-outline-dark"
              onClick={changeTheme}
              title="change-Theme"
            >
              <HiColorSwatch /> Change theme
            </button>
            <button
              type="button"
              className="btn btn-outline-dark"
              title="Visit your journal"
              onClick={() => {
                navigate("/");
              }}
            >
              <FaJournalWhills /> your journals
            </button>
            <button type="submit" className="btn btn-success">
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Writingboard;
