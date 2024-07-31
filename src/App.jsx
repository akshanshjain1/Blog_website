import './App.css'
import React,{ useState,useEffect } from 'react'
import {useDispatch} from 'react-redux'
import authservice from './appwrite/auth'
import { login,logout } from './store/auth-slice' 
import Header from './components/header/header'
import Footer from './components/footer/footer'
import { Outlet } from 'react-router-dom'
function App() {
  const [loading,setloading]=useState(true)
  const dispatch=useDispatch();
  useEffect(()=>{
    authservice.getcurrentuser().then((userdata)=>{
      if(userdata){
        dispatch(login({userdata}))
      }
      else{
        dispatch(logout())
      }
    }).finally(()=>setloading(false))
  },[])
  if(loading){
    return <h1>Loading...</h1>
  }
  else {  return (
    <div className='min-h-screen flex flex-wrap  content-between bg-gray-200'>
      <div className='w-full block'>
      <Header/>
      <main>
      TODO : <Outlet/>
      </main>
      <Footer/>

      </div>
    </div> );
  }
}

export default App
