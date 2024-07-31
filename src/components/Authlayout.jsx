import React,{useState,useEffect} from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
function Protected({children,authentication=true}){
    
        const navigate=useNavigate()
        const[loader,setloader]=useState("")
        const authstatus=useSelector(state=>state.auth.status)
        //useeffect tell what work to do
        useEffect(()=>{
            if(authentication && authstatus!==authentication){
                navigate("/login")}
            else if(!authentication && authstatus!==authentication){
                navigate("/")
            }
            setloader(false)    
        },[authstatus,navigate,authentication]) 
        // any change in navigate
    return loader?<h1>Loading...</h1>:<>{children}</>
}
export default Protected