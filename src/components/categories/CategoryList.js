import { useEffect, useRef, useState } from "react"
import { getCategories, addCategory } from "./CategoryManager"
import { useHistory } from "react-router-dom"

export const Categories = () => {
    const [categories, setCategories] = useState([])
    const label = useRef(null)
    const history = useHistory()

    useEffect(() => {
        getCategories().then((data) => {
                    setCategories(data)
                })
    }, [categories.length] )

    const newCategory = () => {

        addCategory({
            label: label.current.value,
            })
            .then(() => history.push("/categories"))
    }
     
    return (
        <>
        
        <h1 className="is-success">Categories</h1>
        <div className="columns">
            <div className="column">
                <ul>
                    {
                        categories.map(
                            (category) => {
                                return <li key={`category--${category.id}`}>
                                    <button onClick={() => {}}>Edit</button>
                                    <button onClick={() => {}}>Delete</button>
                                    {category.label}
                                </li>
                            }
                        )
                    }
                </ul>
            </div>
            <div className="column">
                <form className="categoryForm">
                    <h2 className="categoryForm__title">New category</h2>
                    <fieldset>
                        <div className="form-group">
                            <label htmlFor="categoryName"> Category name: </label>
                            <input type="text" id="categoryName" ref={label} required autoFocus className="form-control" placeholder="category name" />
                        </div>
                    </fieldset>
                    <button type="submit" onClick={evt => {newCategory(evt)}}className="btn btn-primary">
                        Save category
                    </button>
                </form>
            </div>
        </div>
        </>
    )
}