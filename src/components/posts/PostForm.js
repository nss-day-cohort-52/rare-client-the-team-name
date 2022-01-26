import { Categories } from "../categories/CategoryList"
import { useEffect, useState } from "react"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"




export const PostForm = () => {
    const history = useHistory()
    const [categories, setCategories] = useState([])
    const [tags, setTags] = useState([])
    const [post, setPost] = useState({
        categoryId: 0,
        title: "",
        imageURL: "",
        content: "",
        tagIds: new Set()
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
    const submitNewPostTag = (newPost) => {
        const promiseArray = []
        for (const tagIds of post.tagIds) {

            const newPostTag = {
                tag_id: tagIds,
                post_id: newPost.id
            }


            const fetchOptions = {
                method: "POST",
                headers: {
                    "content-Type": "application/json"
                },
                body: JSON.stringify(newPostTag)
            }
            promiseArray.push(fetch("http://localhost:8088/posttags", fetchOptions))
        }
        Promise.all(promiseArray)
            .then(() => {
                history.push(`/posts/${newPost.id}`)
            })
    }

    const submitNewPost = (evt) => {
        evt.preventDefault()
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
            .then((post) => {
                submitNewPostTag(post)
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
                                    <input type="checkbox" name="tag" value={tag.id} onChange={
                                        (evt) => {
                                            const copy = { ...post }
                                            copy.tagIds.has(parseInt(evt.target.value))
                                                ? copy.tagIds.delete(parseInt(evt.target.value))
                                                : copy.tagIds.add(parseInt(evt.target.value))
                                            setPost(copy)
                                        }} />
                                    {tag.label}</p>
                            }
                        )
                    }
                </div>
                <div>
                    <button onClick={submitNewPost}>Submit</button>
                </div>
            </form>


        </>
    )
}