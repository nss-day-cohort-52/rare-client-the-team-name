import { useEffect, useState } from "react"
import { useHistory } from "react-router"
import { useParams, Link } from "react-router-dom"
import { getCategories } from "../categories/CategoryManager"
import { getTags } from "../tags/TagManager"
import { getSinglePost, updatePost } from "./PostManager"



export const EditPostForm = () => {
    const [post, setPost] = useState({
        user: 0,
        category: 0,
        title: "",
        publication_date: "",
        image_url: "",
        content: "",
        approved: true,
        tags: new Set()
    })
    const [categories, setCategories] = useState([])
    const [tags, setTags] = useState([])

    const history = useHistory()
    const { postId } = useParams()
    const parsedId = parseInt(postId)

    useEffect(() => {
        getCategories().then(setCategories)
        getTags().then(setTags)
    }, [])

    useEffect(() => {
        getSinglePost(parsedId).then((newPost) => {
            setPost({
                user: parseInt(localStorage.getItem("rare_token")),
                category: newPost.category.id,
                title: newPost.title,
                publication_date: newPost.publication_date,
                image_url: newPost.image_url,
                content: newPost.content,
                approved: true,
                tags: new Set(newPost.tags.map(tag => tag.id))
            })
        })

    }, [parsedId])

    const updatePostInfo = () => {
        const date = new Date()

        const updatedPost = {
            user: post.user,
            category: post.category,
            title: post.title,
            publication_date: date.toDateString(),
            image_url: post.image_url,
            content: post.content,
            approved: post.approved,
            tags: Array.from(post.tags)
        }

        updatePost(updatedPost, parsedId)
        history.push("/posts")
    }

    return (
        <div className="container m-6 p-6 has-background-link-light" >
            <h1 className="title is-3">Edit Your Post</h1>
            <form>
                <div className="field my-5">
                    <label className="label">Title </label>
                    <div className="control">
                        <input
                            placeholder="Title"
                            className="input"
                            onChange={(evt) => {
                                const copy = { ...post }
                                copy.title = evt.target.value
                                setPost(copy)
                            }}
                            type="text"
                            required autoFocus
                            value={post.title}
                        />
                    </div>
                </div>
                <div className="field my-5">
                    <label className="label">Image URL </label>
                    <div className="control">
                        <input
                            placeholder="Image URL"
                            className="input"
                            onChange={(evt) => {
                                const copy = { ...post }
                                copy.image_url = evt.target.value
                                setPost(copy)
                            }}
                            type="text"
                            value={post.image_url}
                        />
                    </div>
                </div>
                <div className="field my-5">
                    <label className="label">Article Content </label>
                    <div className="control">
                        <textarea
                            className="textarea"
                            placeholder="Content"
                            onChange={(evt) => {
                                const copy = { ...post }
                                copy.content = evt.target.value
                                setPost(copy)
                            }}
                            value={post.content}
                        ></textarea>
                    </div>
                </div>
                <div className="field my-5">
                    <label className="label">Category</label>
                    <div className="control">
                        <div className="select">
                            <select
                                onChange={(evt) => {
                                    const copy = { ...post }
                                    copy.category = evt.target.value
                                    setPost(copy)
                                }}
                                value={post.category}
                                selected={post.category}
                            >
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
                                return <div className="control my-2" key={`tag--${tag.id}`}>
                                    <label className="checkbox has-text-weight-medium">
                                        <input
                                            type="checkbox"
                                            className="mr-2"
                                            name="tag"
                                            value={tag.id}
                                            checked={post.tags.has(tag.id) ? true : false}
                                            onChange={
                                                (evt) => {
                                                    const copy = { ...post }
                                                    copy.tags.has(parseInt(evt.target.value))
                                                        ? copy.tags.delete(parseInt(evt.target.value))
                                                        : copy.tags.add(parseInt(evt.target.value))
                                                    setPost(copy)
                                                }} />
                                        {tag.label}
                                    </label>
                                </div>
                            }
                        )
                    }
                </div>
                <button type="button" className="button is-link has-text-weight-bold" onClick={() => updatePostInfo()}>
                    Submit
                </button>
                <button type="button" className="button is-link has-text-weight-bold" onClick={() => (history.push("/posts"))}>
                    Cancel
                </button>
            </form>
        </div>
    )
}