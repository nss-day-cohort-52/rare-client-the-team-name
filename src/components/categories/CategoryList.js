import { useEffect, useRef, useState } from "react"
import { getCategories} from "./CategoryManager"
import { useHistory } from "react-router-dom"
import { CategoryForm } from "./CategoryForm"
import { Category } from "./Category"

export const Categories = () => {
    const [categories, setCategories] = useState([])
    const history = useHistory()

    useEffect(() => {
        getCategories().then((data) => {
                    setCategories(data)
                })
    }, [] )

     
    return (
        <>
        
        <h1 className="title is-1 is-success">Categories</h1>
        <div className="columns is-centered">
            <Category categories={categories}/>
            <CategoryForm categories={categories} setCategories={setCategories}/>
        </div>
        </>
    )
}