import React, { useState, useEffect } from "react"
import { getCategories } from "../categories/CategoryManager"
import { getPosts, getPostsByCategory } from "./PostManager"

export const PostFilters = ({ setPosts }) => {
    const [categories, setCategories] = useState([])
    const [userChoices, setUserChoices] = useState({
        categoryId: "0",
        userId: "0"
    })

    useEffect(() => {
        getCategories().then(c => setCategories(c))
    }, [])

    useEffect(() => {
        if (userChoices.categoryId === "0") {
            //AND all other filters are also "0" (once written)
            getPosts().then(p => setPosts(p))
        } else if (userChoices.categoryId !== "0") {
            getPostsByCategory(userChoices.categoryId)
                .then(setPosts)
        } //else if tag does not equal zero, etc ,etc
    }, [userChoices.categoryId])

    return (
        <form>
            <div className="selectGroup">
                <label htmlFor="category"> Filter by category: </label>

                <select name="category"
                    value={userChoices.categoryId}
                    onChange={(event) => {
                        const copy = Object.assign({}, userChoices)
                        copy.categoryId = event.target.value
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
    )
}