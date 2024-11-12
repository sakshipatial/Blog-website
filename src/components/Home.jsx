import React from 'react'
import {Link } from 'react-router-dom'
function Home(){
    return(
       
            <div className="relative min-h-screen bg-cover bg-center">
              {/* Overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        
              {/* Content */}
              <div className="relative flex flex-col items-center justify-center h-screen space-y-6 px-6 text-center">
                <h1 className=" font-bold text-white z-10">
                  Welcome to My Blog
                 </h1>
                <p className="text-xl md:text-2xl text-white max-w-2xl z-10">
                  create your personal blog    
                </p>
                <Link to="/SignupPage">
                <button className="bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-8 rounded-lg font-semibold shadow-lg z-10 transition duration-300">
                 Get Started
                </button></Link>
                
              </div>
            </div>
          );
        };
        
        
        


export default Home;