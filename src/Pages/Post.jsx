import React,{useEffect,useState} from "react";
import { Link,useNavigate,useParams } from "react-router-dom";
import service from "../appwrite/config";
import {Button,Container} from '../components'
import parse from 'html-react-parser'
import { useSelector } from "react-redux";
export default function Post(){
    const [post,setposts ]=useState(null)
    const {slug}=useParams()
    const navigate=useNavigate();
    const userdata=useSelector((state)=>
        state.auth.userdata
    );
    const isauthor=post && userdata ?post.userid===userdata.$id:false;
    useEffect(()=>{
        if(slug){
            service.getpost(slug).then((post)=>{
                if(post) setposts(post);
                else navigate('/')
            })
        }
        else navigate('/')
    },[slug,navigate])

    const deletepost=()=>{
        service.deletepost(post.$id).then((status)=>{
            if(status){
                service.deletefile(post.featuredimage)
                navigate('/')
            }
        })
    }
    return (  post?(
        <div className="py-8">
            <Container>

                <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
                    <img src={service.getfilepreview(post.featuredimage)} alt={post.title} className="rounded-xl" />
                    {isauthor && (
                        <div className="absolute right-6 top-6">
                            <Link to={`/edit-post/${post.$id}`}>
                            <Button 
                            bgColor='bg-green-500'
                            className="mr-3"
                            
                            >Edit</Button>                            
                            </Link>
                            <Button
                                bgColor="bg-green-500"
                                onClick={deletepost}
                                >Delete
                            </Button>
                        </div>
                    )}
                </div>
                <div className="w-full mb-6">
                    <h1 className="text-2xl font-bold">
                        {post.title}
                    </h1>
                </div>
                <div className=" brower-css">
                    {parse(post.content)}
                </div>
            </Container>
        </div>
        
    ):null);

}