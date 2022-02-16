import { useEffect, useState } from "react"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"
import { getTags } from "../tags/TagManager"
import { getCategories } from "../categories/CategoryManager"
import { createPost } from "./PostManager"


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
            getCategories().then(setCategories)
            getTags().then(setTags)
        },
        []
    )

    const submitNewPost = (evt) => {
        evt.preventDefault()
        const date = new Date()
        const newPost = {
            user: parseInt(localStorage.getItem("rare_token")),
            category: parseInt(post.categoryId),
            title: post.title,
            publication_date: date.toDateString(),
            image_url: post.imageURL,
            content: post.content,
            approved: true,
            tags: Array.from(post.tagIds)
        }

        createPost(newPost)
            .then(() => {history.push("/posts")})
            
    }

    return (
        <div className="container m-6 p-6 has-background-link-light">
            <h1 className="title is-3">Create a Post</h1>
            <form >
                <div className="field my-5">
                    <label className="label">Title </label>
                    <div className="control">
                        <input
                            type="text"
                            placeholder="Title"
                            className="input"
                            required autoFocus
                            onChange={
                                (evt) => {
                                    const copy = { ...post }
                                    copy.title = evt.target.value
                                    setPost(copy)
                                }
                            } />
                    </div>
                </div>
                <div className="field my-5">
                    <label className="label">Image URL </label>
                    <div className="control">
                        <input
                            type="text"
                            className="input"
                            placeholder="Image URL" onChange={
                                (evt) => {
                                    const copy = { ...post }
                                    copy.imageURL = evt.target.value
                                    setPost(copy)
                                }
                            } />
                    </div>
                </div>
                <div className="field my-5">
                    <label className="label">Article Content </label>
                    <div className="control">
                        <textarea
                            className="textarea"
                            placeholder="Content" 
                            onChange={
                                (evt) => {
                                    const copy = { ...post }
                                    copy.content = evt.target.value
                                    setPost(copy)
                                }
                            } ></textarea>
                    </div>
                </div>
                <div className="field my-5">
                    <label className="label">Category</label>
                    <div className="control">
                        <div className="select">
                            <select
                                onChange={
                                    (evt) => {
                                        const copy = { ...post }
                                        copy.categoryId = evt.target.value
                                        setPost(copy)
                                    }
                                }>
                                <option> Choose a Category </option>
                                {
                                    categories.map(category => {
                                        return <option key={category.id} value={category.id}>{category.label}</option>
                                    })
                                }
                            </select>
                        </div>
                    </div>
                </div>
                <div className="field my-5">
                    <label className="label"> Tags </label>
                    {
                        tags.map(
                            (tag) => {
                                return <div className="control my-2">
                                    <label className="checkbox has-text-weight-medium">
                                        <input
                                            type="checkbox"
                                            className="mr-2"
                                            name="tag"
                                            value={tag.id}
                                            key={`tag--${tag.id}`}
                                            onChange={(evt) => {
                                                const copy = { ...post }
                                                copy.tagIds.has(parseInt(evt.target.value))
                                                    ? copy.tagIds.delete(parseInt(evt.target.value))
                                                    : copy.tagIds.add(parseInt(evt.target.value))
                                                setPost(copy)
                                            }} />
                                        {tag.label}
                                    </label>
                                </div>
                            }
                        )
                    }
                </div>
                <div>
                    <button className="button is-link my-5 has-text-weight-bold" onClick={submitNewPost}>Submit</button>
                </div>
            </form>
        </div>
    )
}