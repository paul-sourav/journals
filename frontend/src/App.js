import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Signin from "./pages/Signin";
import Login from "./pages/Login";
import Writingboard from "./pages/writingBoard";
import PrivatRoute from "./components/PrivatRoute";
import Profile from "./pages/Profile";
import Nav from "./components/Nav";
import JournalData from "./pages/journalData";
import JournalMain from "./pages/journalMain";
import JournalUpdate from "./pages/JournalUpdate";
import ProfileUpdate from "./pages/ProfileUpdate";
import {Provider} from "react-redux";
import store from "./store/store";

function App() {
  return (
    <Provider store={store}>
      <Router>
      <Nav />
      <Routes>
        <Route element={<PrivatRoute />}>
          <Route path="/board" element={<Writingboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/" element={<JournalData />} />
          <Route path="/main/:id" element={<JournalMain/>} />
          <Route path='/update/:id' element={<JournalUpdate/>}/>
          <Route path="/accountUpdate" element={<ProfileUpdate/>}/>
        </Route>

        <Route path="/signin" element={<Signin />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Footer />
    </Router>
    </Provider>
  );
}

export default App;
