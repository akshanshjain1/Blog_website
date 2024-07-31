import React,{useState} from "react";
import authservice from "../appwrite/auth";
import {Link, useNavigate} from 'react-router-dom'
import { login } from "../store/auth-slice";

import {Input,Button,Logo} from './index'

import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
export default function Signup(){
    const navigate=useNavigate()
    const[error,seterror]=useState("")
    const dispatch=useDispatch()
    const {register,handleSubmit}=useForm()
    const create =async(data)=>{
        seterror("")
        try {
            const userdata=await authservice.createAccount(data)
            if(userdata ){ // agar data bna gya aur kuch userdata aaya to
                const userdata=await authservice.getcurrentuser() // userdata yha par mila and updating usrdata
                if(userdata) dispatch(login(userdata))
                navigate("/")    
            }
        } catch (error) {
            seterror(error.message)
        }
    }
    return (
        <div className="flex items-center justify-center">
            <div className="mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border-black-10">
            <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%"/>
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight">
                    Sign in to your account
                </h2>
                <p className="mt-2 text-center text-base text-black/60">
                    Don&apos;t have any account?&nbsp;
                    <Link
                    to="/signup"
                    className="font-medium text-primary transtion-all duration-200 hover:underline">Sign Up</Link>
                
                </p>
                {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
                <form onSubmit={handleSubmit(create)}>
                    <div className="space-y-5">
                        <Input
                            label="Name:"
                            placeholder="Enter your name"
                            /*register ko ese hi likhna hai*/
                            {...register("name",{
                                required:true,
                            })}

                        />
                        <Input
                        label="Email"
                        placeholder="Enter your email"
                        type='email'
                        {...register("email",/*<--key  object of options-->*/{
                            required:true,
                            /*pattern*/validate:{
                                matchPatern:(value)=>/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) || "Email address must be a valid address",
                            }

                        })}/>
                        <Input
                        label='password'
                        type='password'
                        placeholder='Enter your Password'
                        {...register('password',{required:true})}/>
                        <Button
                        type="submit"
                        className='w-full'>Create Account</Button>
                    </div>
                    </form>                
            </div>
        </div>
    )
}
 