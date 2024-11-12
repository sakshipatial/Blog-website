import React , {useState,useEffect}from 'react'
import {useNavigate,useParams} from 'react-router-dom'
import {useSelector} from 'react-redux'
function Post(){
    const [post,setPost]=useState(null);
    const slug=useParams();
    const navigate=useNavigate();
    const userData=useSelector((state)=>state.auth.userData)
    const isAuthor=post &&userData? post.userId===userData.userData.$id : false;
    return (
        <div> post</div>
    )
} 
export default Post;