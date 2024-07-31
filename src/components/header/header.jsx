import React from "react";
import {Container,Logoutbtn,Logo} from '../index'

import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
export default function Header(){
    const authstatus=useSelector((state)=>state.auth.status)
    const navigate=useNavigate();
    const navitems=[
        {
        name:"Home",
        slug:'/',  // url
        active:true,},
        {
        name:"Login",
        slug:'/login',  // url
        active:!authstatus,
        },
        {
            name:"Signup",
            slug:'/signup',  // url
            active:!authstatus,
        },
        {
            name:"All Posts",
            slug:'/all-posts',  // url
            active:authstatus,
        },
        {
            name:"Add Post",
            slug:'/add-post',  // url
            active:authstatus,
        }

    ]
    return (
        <header className="py-3 shadow bg-gray-500">
            <Container>
                <nav className="flex">
                    <div className="mr-4">
                        <Link to='/'>
                        <Logo width='70px'/>
                        </Link>
                    </div>
                    <ul className="flex ml-auto"> {navitems.map((item)=>
                        // curly nhi to no retuern
                        item.active?(
                            <li key={item.name}>
                                <button className=" inline-block px-6 py-2 duration-200 hover: bg-blue-100 rounded-full" onClick={()=>{navigate(item.slug)}}>{item.name}</button>
                            </li>
                        ):null

                    )}
                    {authstatus && (
                        <li>    {/*auth ho to logout btn dikhe */}
                            <Logoutbtn/>
                        </li>
                    )}
                    </ul>
                </nav>
            </Container>
        </header>
    )
}