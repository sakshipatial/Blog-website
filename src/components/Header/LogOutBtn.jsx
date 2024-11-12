import React from 'react';
import authService from '../../appwrite/auth'
import {logout as stateLogout} from '../../store/authSlice'
import { useDispatch } from 'react-redux';

function LogOutBtn(className){
  const dispatch=useDispatch();
  const logoutHandler=()=>{
    authService.logOut().then(()=>(dispatch(stateLogout())));
  }
  return(
    <button onClick={logoutHandler} className={`inline-block py-2 px-6 duration-200 hover:bg-blue-300 rounded-full ${className}`}>Logout</button>
  )
}
export default LogOutBtn;