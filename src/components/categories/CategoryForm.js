import { addCategory } from "./CategoryManager"
import { useEffect, useState, useRef } from "react"



export const CategoryForm = ({setCategories, categories}) => {
    const label = useRef(null)
    
    
    const newCategory = (evt) => {
        evt.preventDefault()
        addCategory({
            label: label.current.value
            })
            .then(setCategories)
    }
   useEffect(() => {
        
            label.current.value = null
    
   }, [categories])
    return (
        <div className="column is-one-third ml-6">
            <form className="notification is-success has-text-weight-medium">
                <h2 className="subtitle mb-2">Add a new category</h2>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="categoryName"></label>
                        <input className="box" type="text" id="categoryName" ref={label} required autoFocus placeholder="category name" />
                    </div>
                </fieldset>
                    <button className="button mt-2 m-1" type="submit" onClick={(evt) => { newCategory(evt) }}>
                        Save category
                    </button>
            </form>
        </div>
    )
}