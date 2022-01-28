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
                                    <div className="level-left">

                                    <div className="level-item">
                                        <button className="button m-1" onClick={() => {}}>Edit</button>
                                    </div>
                                    <div className="level-item px-5">

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
                    <h2 className="subtitle mb-2">Add a new category</h2>
                    <fieldset>
                        <div className="form-group">
                            <label htmlFor="categoryName"></label>
                            <input className="box " type="text" id="categoryName" ref={label} required autoFocus placeholder="category name" />
                        </div>
                    </fieldset>
                    <button className="button mt-2 m-1" type="submit" onClick={evt => {newCategory(evt)}}>
                        Save category
                    </button>
                </form>
            </div>
        </div>
        </>
    )
}