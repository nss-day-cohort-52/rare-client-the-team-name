import React, { useState, useEffect } from "react"
import { getPosts, searchPostsByTitle } from "./PostManager"
import Post from "./Post"
import { PostFilters } from "./PostFilters"

export const PostList = () => {
    const [ posts, setPosts ] = useState([])
    const [ searchedPost, setSearch] = useState("")

    useEffect(()=> {
        getPosts().then(p => setPosts(p))
    }, [posts])

    useEffect(() => {
        if (searchedPost !== "") {
        searchPostsByTitle(searchedPost).then(data => setPosts(data))
        } else {
            setPosts(posts)
        }
    }, [])
    
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