import { useEffect, useState } from "react"
import { useHistory } from "react-router"
import { useParams } from "react-router-dom"
import { getCategories } from "../categories/CategoryManager"
import { getTags } from "../tags/TagManager"
import { getSinglePost, updatePost } from "./PostManager"
import { createPostTag, deletePostTag, getCertainPostTags } from "./PostTagManager"


export const EditPostForm = () => {
    const [post, setPost] = useState({})
    const [categories, setCategories] = useState([])
    const [tags, setTags] = useState([])
    const [postTags, setPostTags] = useState([])

    const [newCategoryId, setCategoryId] = useState(0)
    const [newTitle, setTitle] = useState("")
    const [newImageURL, setImageURL] = useState("")
    const [newContent, setContent] = useState("")
    const [newTagIds, setTagIds] = useState(new Set())

    const history = useHistory()
    const currentUserId = parseInt(localStorage.getItem('token'))
    const { postId } = useParams()
    const parsedId = parseInt(postId)

    useEffect(() => {
        getCategories().then(setCategories)
        getTags().then(setTags)
    }, [])

    useEffect(() => {
        getSinglePost(parsedId).then(setPost)
        getCertainPostTags(parsedId).then(setPostTags)
    }, [parsedId])

    useEffect(() => {
        setCategoryId(post.category_id)
        setTitle(post.title)
        setImageURL(post.image_url)
        setContent(post.content)
        let idSet = new Set()
        for (const postTag of postTags) {
            idSet.add(postTag.tag_id)
        }
        setTagIds(idSet)
    }, [post, postTags])

    const updatePostInfo = () => {
        const date = new Date()

        const updatedPost = {
            user_id: currentUserId,
            category_id: newCategoryId,
            title: newTitle,
            publication_date: date.toDateString(),
            image_url: newImageURL,
            content: newContent,
            approved: null
        }

        updatePost(updatedPost, parsedId)
            .then(submitNewPostTag())
    }

    const submitNewPostTag = () => {
        const deletePostTagsPromises = []
        const addPostTagsPromises = []

        for (const postTag of postTags) {
            deletePostTagsPromises.push(deletePostTag(postTag.id))
        }

        for (const tagId of newTagIds) {
            addPostTagsPromises.push(createPostTag({
                tag_id: tagId,
                post_id: parsedId
            }))
        }

        Promise.all(deletePostTagsPromises)
            .then(() => Promise.all(addPostTagsPromises))
            .then(() => {
                history.push(`/posts/${parsedId}`)
            })
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
                            onChange={event => setTitle(event.target.value)}
                            required autoFocus
                            type="text"
                            value={newTitle}
                        />
                    </div>
                </div>
                <div className="field my-5">
                    <label className="label">Image URL </label>
                    <div className="control">
                        <input
                            placeholder="Image URL"
                            className="input"
                            onChange={event => setImageURL(event.target.value)}
                            required autoFocus
                            type="text"
                            value={newImageURL}
                        />
                    </div>
                </div>
                <div className="field my-5">
                    <label className="label">Article Content </label>
                    <div className="control">
                        <textarea
                            className="textarea"
                            placeholder="Content"
                            onChange={event => setContent(event.target.value)}
                            required autoFocus
                            value={newContent}
                        ></textarea>
                    </div>
                </div>
                <div className="field my-5">
                    <label className="label">Category</label>
                    <div className="control">
                        <div className="select">
                            <select
                                onChange={(evt) => setCategoryId(evt.target.value)}
                                value={newCategoryId}
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
                                            checked={newTagIds.has(tag.id) ? true : false}
                                            onChange={
                                                (evt) => {
                                                    const copy = new Set(newTagIds)
                                                    copy.has(parseInt(evt.target.value))
                                                        ? copy.delete(parseInt(evt.target.value))
                                                        : copy.add(parseInt(evt.target.value))
                                                    setTagIds(copy)
                                                }} />
                                        {tag.label}
                                    </label>
                                </div>
                            }
                        )
                    }
                </div>
                <button type="button" className="button is-link" onClick={() => updatePostInfo()}>
                    Submit
                </button>
            </form>
        </div>
    )
}