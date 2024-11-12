import { useState , useEffect} from 'react'
import {Header ,Footer} from './components/index'
import { Outlet } from 'react-router-dom'
import './App.css'
import {useDispatch} from 'react-redux'
import authService from './appwrite/auth'
import {login,logout} from './store/authSlice'

function App() {
  const [loading,setLoading]=useState(true)
  const dispatch=useDispatch()
  useEffect(()=>{
    authService.getCurrentUser()
    .then((userData)=>{
      if(userData){
        dispatch(login({userData}))
      }
      else{
        dispatch(logout())
      }
     
    })
    .finally(setLoading(false))
     
  },[])

  return !loading? (
    <>
   <Header />
   <main>
    <Outlet />
   </main>
   <Footer />
   </>
  ) :null
}

export default App
