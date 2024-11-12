// we  are creating mechanism to protect pages  and  routes.
import React ,{useEffect , useState} from 'react';
import {useNavigate} from 'react-router-dom'
import { useSelector } from 'react-redux';


function Protected({children,authentication=true}){
const [loader,setLoader]=useState(true)
const authStatus=useSelector((state)=>(state.auth.status))
const navigate=useNavigate()
useEffect(()=>{
//     if(authStatus===false){
//       navigate("/SigninPage")
//     }
//     else if (authStatus===true){
//    navigate("/")
//     }

if (authentication && authStatus!==authentication)
{navigate("/signinPage")}
else if(!authentication && authStatus!==authentication){
   navigate("/")
}
setLoader(false)
   }

,[navigate,authStatus,authentication])

return loader? <h1>loading...</h1>:<>{children}</>
}
export default Protected;