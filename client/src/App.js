
import './App.css';
import Login from './Pages/Login/Login';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faUser, faCoffee } from '@fortawesome/free-solid-svg-icons';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './Pages/Home/Home';
import Admin from './Pages/Admin/Admin';
import Profile from './Pages/Home/Profile';

library.add(faUser, faCoffee);
function App() {
  return (
    <Router>
      <Routes>
      
    <Route index element={<Login/>}/>
    <Route path='/home' element={<Home/>}/>
    <Route path='/admin' element={<Admin/>}/>
    <Route path='/home/profile' element ={<Profile/>}/>
      </Routes>
    </Router>
    
  );
}

export default App;
