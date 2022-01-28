import React, { useState, useEffect } from "react"
import { getCategories } from "../categories/CategoryManager"
import { getTags } from "../tags/TagManager"
import { getUsers } from "../users/UserManager"
import { getPosts, getPostsByAuthor, getPostsByCategory, searchPostsByTitle, getPostsByTag } from "./PostManager"

export const PostFilters = ({ setPosts }) => {
    const [categories, setCategories] = useState([])
    const [users, setUsers] = useState([])
    const [tags, setTags] = useState([])
    const [userChoices, setUserChoices] = useState({
        categoryId: "0",
        authorId: "0",
        searchTerms: "",
        tagId: '0'
    })

    useEffect(() => {
        getCategories().then(c => setCategories(c))
        getUsers().then(u => setUsers(u))
        getTags().then(t => setTags(t))
    }, [])

    useEffect(() => {
        if (userChoices.categoryId === "0" & userChoices.authorId === "0" & userChoices.searchTerms === "" & userChoices.tagId === "0") {
            //AND all other filters are also "0" (once written)
            getPosts().then(p => setPosts(p))
        } else if (userChoices.categoryId !== "0") {
            getPostsByCategory(userChoices.categoryId)
                .then(setPosts)
        } else if (userChoices.authorId !== "0") {
            getPostsByAuthor(userChoices.authorId)
                .then(setPosts)
        } else if (userChoices.searchTerms !== "") {
            searchPostsByTitle(userChoices.searchTerms)
                .then(setPosts)
        } else if (userChoices.tagId !== "0") {
            getPostsByTag(userChoices.tagId)
                .then(setPosts)
        }
    }, [userChoices])

    return (
        <>
            <div className="panel m-5">
            <p className="panel-heading">Posts</p>
            <div className="panel-block">
                        <input className="input" type="text"
                            placeholder="Search by Title..."
                            name="search"
                            onKeyUp={
                                (event) => {
                                    const copy = Object.assign({}, userChoices)
                                    copy.categoryId = "0"
                                    copy.authorId = "0"
                                    copy.searchTerms = event.target.value
                                    copy.tagId = "0"
                                    setUserChoices(copy)
                                }
                            } />
                    </div>
                </div>
                <form className="form m-5 level">
                <div className="control m-3 level-item">
                    
                    <label htmlFor="category"> Filter by category: </label>
                    <div className="select ml-2">
                    <select name="category"
                        value={userChoices.categoryId}
                        onChange={(event) => {
                            const copy = Object.assign({}, userChoices)
                            copy.categoryId = event.target.value
                            copy.authorId = "0"
                            copy.tagId = "0"
                            copy.searchTerms = ""
                            setUserChoices(copy)
                            //add logic to set other userChoices back to "0" once those are written
                        }}>

                        <option value="0">All</option>
                        {categories.map(category => (
                            <option key={category.id} value={category.id}>
                                {category.label}
                            </option>
                        ))}
                    </select>
                    </div>
                </div>
            
         
                <div className="control m-3 level-item">
                    
                    <label htmlFor="author"> Filter by author: </label>
                    <div className="select ml-2">
                    <select name="author"
                        value={userChoices.authorId}
                        onChange={(event) => {
                            const copy = Object.assign({}, userChoices)
                            copy.categoryId = "0"
                            copy.authorId = event.target.value
                            copy.tagId = "0"
                            copy.searchTerms = ""
                            setUserChoices(copy)
                            //add logic to set other userChoices back to "0" once those are written
                        }}>

                        <option value="0">All</option>
                        {users.map(user => (
                            <option key={user.id} value={user.id}>
                                {user.first_name} {user.last_name}
                            </option>
                        ))}
                    </select>
                    </div> 
                </div>
       
                <div className="control m-3 level-item">
                    <label htmlFor="tag"> Filter by tag: </label>
                    <div className="select ml-2">
                    <select name="tag"
                        value={userChoices.tagId}
                        onChange={(event) => {
                            const copy = Object.assign({}, userChoices)
                            copy.categoryId = "0"
                            copy.authorId = "0"
                            copy.tagId = event.target.value
                            copy.searchTerms = ""
                            setUserChoices(copy)
                            //add logic to set other userChoices back to "0" once those are written
                        }}>
                        <option value="0">All</option>
                        {tags.map(tag => (
                            <option key={tag.id} value={tag.id}>
                                {tag.label}
                            </option>
                        ))}
                    </select>
                    </div>
                </div>
            </form>
            
        </>
    )
}