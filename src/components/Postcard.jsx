import React from "react";
import service from "../appwrite/config";
import {Link} from 'react-router-dom'
function Postcard({$id,title,featuredimage}){
    return(
    <Link to={`/post/${$id}`}>
        <div className="w-full bg-gray-100 rounded-xl p-4">
            <div className=" w-full justify-center mb-4">
                    <img src={service.getfilepreview(featuredimage)} alt={title} className="rounded-l" />
            </div>
            <h2 className="text-xl font-bond">{title}</h2>
        </div>
    </Link>)
}
export default Postcard