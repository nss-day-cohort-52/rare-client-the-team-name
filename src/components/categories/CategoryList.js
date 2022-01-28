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
        
        <h1 className="title is-1 is-success">Categories</h1>
        <div className="columns is-centered">
            <div className="column is-one-quarter mr-6">
                
                    {
                        categories.map(
                            (category) => {
                                return <div className="notification is-success p-3 has-text-weight-medium" key={`category--${category.id}`}>
                                    <button className="delete is-info" onClick={() => {}}></button>
                                    <div className="level">

                                    <div className="level-item">
                                        <button className="button m-1" onClick={() => {}}>Edit</button>
                                    </div>
                                    <div className="level-item pr-5">

                                        {category.label}
                                    </div>
                                    </div>
                                        
                                </div>
                            }
                        )
                    }
                
            </div>
            <div className="column is-one-third ml-6">
                <form className="notification is-success has-text-weight-medium">
                    <h2 className="subtitle">Add a new category</h2>
                    <fieldset>
                        <div className="form-group">
                            <label htmlFor="categoryName"> Category name: </label>
                            <input className="box " type="text" id="categoryName" ref={label} required autoFocus placeholder="category name" />
                        </div>
                    </fieldset>
                    <button className="button is-info m-3" type="submit" onClick={evt => {newCategory(evt)}}>
                        Save category
                    </button>
                </form>
            </div>
        </div>
        </>
    )
}