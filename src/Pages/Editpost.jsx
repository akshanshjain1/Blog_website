import React,{useEffect,useState} from "react";
import {Container,Postform} from '../components'
import service from "../appwrite/config";
import { useNavigate, useParams } from "react-router-dom";
function Editpost(){
    const [post,setposts]=useState(null)
    const {slug}=useParams()  // slug lnene ke liye
    const navigate =useNavigate()
    useEffect(()=>{
        if(slug){
            service.getposts(slug).then((post)=>{
                if(post)
                    setposts(post)
        },[])

        }
        else {
            navigate('/')
        }
    },[slug,navigate]) // run when change in
    return post ? (

        <div className="py-8">
            <Container>
            <Postform post={post}/>
            </Container>
        </div>
    ):null
}
export default Editpost