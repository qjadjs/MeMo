import React, { useContext, useEffect, useState } from 'react'
import Post from './Post'
import Share from './Share'
import axios from "axios";
import { AuthContext } from '../state/AuthContext';

export default function History() {
 
  const { user } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {

        const response = await axios.get(`/posts/timeline/${user._id}`);
       // console.log(response);
       setPosts(response.data);
    };
    fetchPosts();
    
  }, []);

  return (
    <div className='History'>
        <div className="HistoryWrapper">
            <Share />
            {posts.map((post) => ( 
                <Post post={post} key={post.id}/>
            ))}
        </div>
    </div>
  );
}
