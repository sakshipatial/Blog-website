import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import LogOutBtn from './LogOutBtn'

function Header() {
  const navigate=useNavigate()
  const authStatus=useSelector((state)=>state.auth.status)
  const navItems=[
    {
      name:"Home",
      slug:"/",
      active:true
    },
    {
      name:"Signin",
      slug:"/SigninPage", 
      active:!authStatus
    },
    {
      name:"Signup",
      slug:"/SignupPage",
      active:!authStatus
    },
    {
      name:"All Posts",
      slug:"/AllPosts",
      active:authStatus
    },
    {
      name:"Add Post",
      slug:"/AddPost",
      active:authStatus
    }
  ]

  return (
    
    <header className="bg-teal-500 shadow-md">
      <nav className="container mx-auto p-4 flex justify-between items-center">
        {/* Logo / Home Link */}
        <div>
          <Link href="/" className="text-xl font-bold text-gray-800 hover:text-gray-600">Home</Link>
        </div>

        {/* Navigation Links */}
        <ul className="flex ml-auto ">
          {
            navItems.map((item)=>(
              item.active? <li key={item.name}>
              <button 
              onClick={()=>navigate(item.slug)} 
              className="inline-block px-6 py-2 duration-200 hover:bg-blue-300 rounded-full" >{item.name}</button>
              </li>:null))
          }
          {authStatus &&<li> <LogOutBtn/></li>}
       </ul>
        
         
       
      
      </nav>
    </header>
        
  );
};

export default Header;
