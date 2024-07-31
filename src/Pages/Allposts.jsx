import React ,{useState,useEffect}from "react";
import {Container ,Postcard} from '../components'
import service from "../appwrite/config";
function Allposts(){
    const [posts,setposts]=useState([])
    useEffect(()=>{},[])
    service.getposts([]).then((posts)=>{
        if(posts){
            setposts(posts.documents)
        }
    })
    return (
            <div className="w-full py-8">
                <Container>
                    {posts.map((post)=>{
                        
                        <div className="flex flex-wrap">
                            {posts.map((post)=>(
                                <div key={post.$id} className="p-2 w-1/4">
                                        <PostCard post={post}/>
                                </div>
                    ))}
                        </div>
                    })}
                </Container>
            </div>

    )
}
export default Allposts