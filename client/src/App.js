
import './App.css';
import Login from './Pages/Login/Login';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faUser, faCoffee } from '@fortawesome/free-solid-svg-icons';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './Pages/Home/Home';
import Admin from './Pages/Admin/Admin';
import Profile from './Pages/Home/Profile';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { isAuthenticated, logedOut } from './Redux/authSlice';
import { clearUser, setUser } from './Redux/userSlice';

library.add(faUser, faCoffee);
function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const token = await localStorage.getItem('token');
        const user = await JSON.parse(localStorage.getItem('user')) 
        if (token !== null) {
          await dispatch(isAuthenticated(token));
          
        } else {
          await dispatch(logedOut());
        }
        if (user!==null){
          await dispatch(setUser(user));
          
        } else{
          await dispatch(clearUser());
        }
      } catch (error) {
        
      }
    };
  
    checkAuthentication(); // Immediately invoke the async function
  }, [dispatch]);
  
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
