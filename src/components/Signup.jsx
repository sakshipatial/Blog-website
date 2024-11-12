import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import authService from '../appwrite/auth';
import { useDispatch } from 'react-redux';
import { login } from '../store/authSlice';
import {Link , useNavigate } from 'react-router-dom';
import {InputButton ,Button , Logo}from '../components/index';


function Signup() {
  const [error, setError] = useState("")
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const create = async (data) => {
    setError("")
    // Here you can handle form submission (e.g., send to backend or validate)
    try {
      console.log(data)
      const userData = await authService.createAccount(data);
      console.log(userData);
      if (userData){
        const userData= await authService.getCurrentUser() 
        if(userData)
        dispatch(login(userData));
        navigate("/");
      }
       
    }
    catch (error) {
      setError(error)
    }
  };

  return (
    <div className=" flex items-center justify-center  bg-transparent ">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">

        <div className="mb-2 flex  justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>

        <h2 className="text-center text-2xl font-bold leading-tight">Sign up to create account</h2>

        <p className="mt-2 txt-center text-base text-black/60">
          Already have  an account?&nbsp;
          <Link to="/SigninPage"
          className="font-medium text-primary transition-all duration-200 hover:text-blue-600"
          >Sign In</Link>
        </p>

        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
        <form onSubmit={handleSubmit(create)} className="space-y-4">

          {/* Name Input */}
           <div >
            <InputButton
              type="text"
              label="Full Name:"
              placeholder="Enter your full name"
              {...register("name", {
                required: true,
              })} />
          </div>
          {/* Email Input */}
      
            <InputButton
              type="email" 
              label="Email:"
              placeholder="Enter your email"
              {...register("email", {
                required: true,
                validate: {
                  matchPattern: (value) => /^([\w\.\-_]+)?\w+@[\w-_]+(\.\w+){1,}$/.test(value) ||
                    "Email address must be a valid  address"
                }
              })}
            />

        


          {/* Password Input */}
         
            <InputButton
              type="password"
              label="Password:"
              placeholder="Enter your password"
              {
              ...register("email", {
                required: true,
              })
              }
            />
     

          {/* Submit Button */}
          
            <Button
              type="submit"
            >
              Create Account
            </Button>
         

        </form>
      </div>
    </div>
  );
};

export default Signup;
