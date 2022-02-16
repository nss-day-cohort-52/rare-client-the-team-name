import React, { useEffect, useState } from "react"
import { getTags } from "../tags/TagManager"
import { getSinglePost, postTagEdit } from "./PostManager"
import { useParams } from "react-router-dom"





export const PostTagEdit = ({setModalIsOpen, modalIsOpen }) => {
    const [tags, setTags] = useState([])
    const { postId } = useParams()
    const parsedId = parseInt(postId)
    const [post, setPost] = useState({
        user: 0,
        id: 0,
        category: 0,
        title: "",
        publication_date: "",
        image_url: "",
        content: "",
        approved: true,
        tags: new Set()
    })

    useEffect(() => {
        getSinglePost(parsedId).then((newPost) => {
            setPost({
                user: parseInt(localStorage.getItem("rare_token")),
                id: newPost.id,
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
    
    useEffect(()=> {
        getTags().then(t => setTags(t))
    }, [])
    return (
        <>
        <h2>Checked tags are added to the post!</h2>
        <button className="delete mt-2" onClick={() => setModalIsOpen(false)}>Close</button>
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
                                                }} 
                                            />
                                        {tag.label}
                                    </label>
                                </div>
                            }
                        )
                    }
        <button className="button" onClick={() => {postTagEdit(Array.from(post.tags), post.id)
            .then(setModalIsOpen(false))}}>Save Tags</button>
        
        
        </>

    )
}