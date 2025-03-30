import React, {useState, useEffect} from 'react'
import { Container, PostCard } from '../components'
import appwriteService from "../appwrite/config";

function AllPosts() {
    const [posts, setPosts] = useState([])
    useEffect(() => {
        appwriteService.getPosts([]).then((posts) => {
            if (posts) {
                setPosts(posts.documents)
            }
        })
    }, [])
    
  return (
    <div className='w-full py-8'>
               <Container>
                   {/* Spaced-out, clean YouTube-style grid */}
                   <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-y-8">
                       {posts.map((post) => (
                           <PostCard key={post.$id} {...post} />
                       ))}
                   </div>
               </Container>
           </div>
  )
}

export default AllPosts