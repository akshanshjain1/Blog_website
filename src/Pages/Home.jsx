import React ,{useState,useEffect} from "react";
import service from "../appwrite/config";
import {Container,Postcard} from '../components'
function Home(){
    const [post,setposts]=useState([])
    useEffect(()=>{
        service.getposts().then((posts)=>{
            if(posts){
                setposts(posts.documents)
            }
        })
    },[])
    
    if(post.length==0){
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className= " flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold hover:text-gray-500">
                                    Login to read posts
                            </h1>
                        </div>
                    </div>

                </Container>
            </div>
        ) 
    }
    return (
        <div className="w-full py-8">
            <Container>
            <div className="flex flex-wrap">
                {post.map((posts)=>{
                    <div key={posts.$id} className="p-2 w-1/4">
                        <Postcard {...posts}/>
                    </div>
                })}
            </div>

            </Container>
        </div>
    )
     
}
export default Home