import React, { useState, useEffect } from "react"
import { getCategories } from "../categories/CategoryManager"
import { getUsers } from "../users/UserManager"
import { getPosts, getPostsByAuthor, getPostsByCategory } from "./PostManager"

export const PostFilters = ({ setPosts }) => {
    const [categories, setCategories] = useState([])
    const [users, setUsers] = useState([])
    const [userChoices, setUserChoices] = useState({
        categoryId: "0",
        authorId: "0"
    })

    useEffect(() => {
        getCategories().then(c => setCategories(c))
        getUsers().then(u => setUsers(u))
    }, [])

    useEffect(() => {
        if (userChoices.categoryId & userChoices.authorId === "0") {
            //AND all other filters are also "0" (once written)
            getPosts().then(p => setPosts(p))
        } else if (userChoices.categoryId !== "0") {
            getPostsByCategory(userChoices.categoryId)
                .then(setPosts)
        } else if (userChoices.authorId !== "0") {
            getPostsByAuthor(userChoices.authorId)
            .then(setPosts)
        }
    }, [userChoices])

    return (
        <>
            <form>
                <div className="selectGroup">
                    <label htmlFor="category"> Filter by category: </label>

                    <select name="category"
                        value={userChoices.categoryId}
                        onChange={(event) => {
                            const copy = Object.assign({}, userChoices)
                            copy.categoryId = event.target.value
                            copy.authorId = "0"
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
            </form>
            <form>
                <div className="selectGroup">
                    <label htmlFor="author"> Filter by author: </label>
    
                    <select name="author"
                        value={userChoices.authorId}
                        onChange={(event) => {
                            const copy = Object.assign({}, userChoices)
                            copy.categoryId = "0"
                            copy.authorId = event.target.value
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
            </form>
        </>
    )
}