import React, { useState, useEffect } from "react"
import { getPosts } from "./PostManager"
import Post from "./Post"
import { PostFilters } from "./PostFilters"

export const PostList = ({ postss }) => {
    const [ posts, setPosts ] = useState([])
    const [ searchedPost, setSearch] = useState("")

    useEffect(()=> {
        getPosts().then(p => setPosts(p))
    }, [])

    // useEffect(() => {
    //     if (searchedPost !== "") {
    //     searchByTitle(searchedPost).then(data => setPosts(data))
    //     } else {
    //         setPosts(postss)
    //     }
    // }, [searchedPost, postss])
    
    return (
        <>
            <PostFilters setPosts={setPosts}/>
            <input type="text" placeholder="Search by Title..." name="search" onKeyUp={
                (event) => {
                    const searchTerm = event.target.value
                    setSearch(searchTerm)
                }
            }/>
            <div className="posts">
                {
                    posts.map(post => <Post key={post.id} post={post} />)
                }
            </div>
        </>
    )
}