import { Categories } from "../categories/categroyList"
import { useEffect, useState } from "react"



export const PostForm = () => {
    const [categories, setCategories] = useState([])
    const [tags, setTags] = useState([])
    const [post, setPost] = useState({
        categoryId: 0,
        title: "",
        imageURL: "",
        content: ""
    })


    useEffect(
        () => {
            fetch("http://localhost:8088/categories")
                .then(res => res.json())
                .then((data) => {
                    setCategories(data)
                })
        },
        []
    )

    useEffect(
        () => {
            fetch("http://localhost:8088/tags")
                .then(res => res.json())
                .then((data) => {
                    setTags(data)
                })
        },
        []
    )

    const submitNewPost = () => {
        const date = new Date()
        const newPost = {
            user_id: parseInt(localStorage.getItem("token")),
            category_id: parseInt(post.categoryId),
            title: post.title,
            publication_date: date.toDateString(),
            image_url: post.imageURL,
            content: post.content,
            approved: null
        }

        const fetchOptions = {
            method: "POST",
            headers: {
                "content-Type": "application/json"
            },
            body: JSON.stringify(newPost)
        }

        return fetch("http://localhost:8088/posts", fetchOptions)
            .then(res => res.json())
            .then(() => {
                history.push("/posts")
            })
}



    return (
        <>
            <h1>NEW POSTS</h1>
            <form>
                <div>
                    <label>Title </label>
                    <input
                        type="text"
                        placeholder="Title"
                        onChange={
                            (evt) => {
                                const copy = { ...post }
                                copy.title = evt.target.value
                                setPost(copy)
                            }
                        } />
                </div>
                <div>
                    <label>Image URL </label>
                    <input 
                        type="text" 
                        placeholder="Image URL" onChange={
                            (evt) => {
                                const copy = { ...post }
                                copy.imageURL = evt.target.value
                                setPost(copy)
                            }
                        } />
                </div>
                <div>
                    <label>Article Content </label>
                    <input 
                        type="text" 
                        placeholder="Content" onChange={
                            (evt) => {
                                const copy = { ...post }
                                copy.content = evt.target.value
                                setPost(copy)
                            }   
                        } />
                </div>
                <div>
                    <select
                        onChange={
                            (evt) => {
                                const copy = { ...post }
                                copy.categoryId = evt.target.value
                                setPost(copy)
                            }
                        }>
                        <option>Category Select</option>
                        {
                            categories.map(category => {
                                return <option key={category.id} value={category.id}>{category.label}</option>
                            })
                        }
                    </select>
                </div>
                <div>
                    {
                        tags.map(
                            (tag) => {
                                return <p key={`tag--${tag.id}`}>
                                    <input type="checkbox" name="tag" />
                                    {tag.label}</p>
                            }
                        )
                    }
                </div>
                <div>
                    <button onClick={() => {submitNewPost()}}>Submit</button>
                </div>
            </form>


        </>
    )
}