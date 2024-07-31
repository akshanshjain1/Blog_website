import React from "react";
import { useDispatch } from "react-redux";
import authservice from '../../appwrite/auth'
import {logout} from '../../store/auth-slice'

function Logoutbtn(){
    const dispatch=useDispatch()
    const logouthandler=()=>{  // logout ke baad promise milegi
        authservice.logout().then(()=>{
        dispatch(logout()) // store me info updated rhe
        })
    }
    return (
        <button className="inline-block px-6 py-2 duration-200 hover: bg-blue-100 rounded-full" onClick={logouthandler}>Logout</button>
    )
}
export default Logoutbtn