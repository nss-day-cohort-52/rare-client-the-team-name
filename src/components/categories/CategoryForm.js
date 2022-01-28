import { addCategory, updateCategory } from "./CategoryManager"
import { useEffect, useRef } from "react"



export const CategoryForm = ({ setCategories, categories, categoryToEdit, setModalIsOpen }) => {
    const label = useRef(null)

    const newCategory = (evt) => {
        evt.preventDefault()
        if (categoryToEdit) {
            updateCategory({
                label: label.current.value
            }, categoryToEdit.id)
                .then(setCategories)
                .then(() => setModalIsOpen(false))
        } else {
            addCategory({
                label: label.current.value
            })
                .then(setCategories)
        }
    }

    useEffect(
        () => {
            if (categoryToEdit) {
                label.current.value = categoryToEdit.label
            }
        }, [categoryToEdit]
    )

    useEffect(() => {
        label.current.value = null
    }, [categories])

    return (

        <form className="notification is-success has-text-weight-medium">
            {
                categoryToEdit
                    ? <button className="delete mt-2" onClick={() => setModalIsOpen(false)}>Close</button>
                    : ""
            }
            {
                categoryToEdit
                    ? <h3 className="subtitle mb-2">Edit Category</h3>
                    : <h3 className="subtitle mb-2">Enter New Category</h3>
            }
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

    )
}