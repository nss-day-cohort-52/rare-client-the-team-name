import { Categories } from "../categories/categroyList"
import { useEffect, useState } from "react"



export const PostForm = () => {
    const [categories, setCategories] = useState([])
    const [tags, setTags] = useState([])


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

    return (
        <>
            <h1>NEW POSTS</h1>
            <form>
                <div>
                    <label>Title </label>
                    <input type="text" placeholder="Title" />
                </div>
                <div>
                    <label>Image URL </label>
                    <input type="text" placeholder="Image URL" />
                </div>
                <div>
                    <label>Article Content </label>
                    <input type="text" placeholder="Content" />
                </div>
                <div>
                    <select>
                        <option>Category Select</option>
                        {
                            categories.map(category => {
                                return <option key={category.id}>{category.label}</option>
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

            </form>


        </>
    )
}