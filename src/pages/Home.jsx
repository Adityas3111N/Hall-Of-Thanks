import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import appwriteService from "../appwrite/config";
import { Container, PostCard } from '../components';
import { use } from 'react';

function Home() {
    const [posts, setPosts] = useState([])
    const user = useSelector((state) => state.auth.userData);
    

    useEffect(() => {
        const fetchPosts = async () => {
            const posts = await appwriteService.getPosts()
            if (posts) {
                setPosts(posts.documents)
            }
        }
        fetchPosts()
    }, [])

    if (posts.length === 0) {
        return (
            <>

                <div className="w-full py-8 mt-4 text-center">
                    <Container>
                        <h1 className="text-2xl font-bold hover:text-gray-500">
                            Login to read posts
                        </h1>
                    </Container>
                </div>
            </>
        )
    }

    return (
        <div className='w-full py-8'>
            {user &&(
                <h2 className="text-black text-2xl font-bold">
                Hi, {user?.userData?.name}!
            </h2>
            )}
            <Container>
                {/* Spaced-out, clean YouTube-style grid */}
                <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8">
                    {posts.map((post) => (
                        <PostCard key={post.$id} {...post} />
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default Home;
