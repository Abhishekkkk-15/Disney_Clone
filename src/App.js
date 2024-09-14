import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Login from './Components/Login'
import Header from './Components/Header'
import Home from './Components/Home';
import Detail from './Components/Detail';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/home" element={<Home/>} />
        <Route path="/detail/:id" element={<Detail/>} />
      </Routes>
    </Router>
  );
}

export default App;
