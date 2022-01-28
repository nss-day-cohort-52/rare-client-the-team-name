import { useEffect, useState } from "react"
import { getCategories } from "./CategoryManager"
import { CategoryForm } from "./CategoryForm"
import { Category } from "./Category"

export const Categories = () => {
    const [categories, setCategories] = useState([])
    const [categoryToEdit, setCategoryToEdit] = useState({})
    const [modalIsOpen, setModalIsOpen] = useState(false)

    useEffect(() => {
        getCategories().then(setCategories)
    }, [])


    return (
        <>
            <div id="edit-modal" className={modalIsOpen ? "modal is-active" : "modal"}>
                <div className="modal-background"></div>

                <div className="modal-content">
                    <div className="box">
                        <CategoryForm setCategories={setCategories} categories={categories}
                            categoryToEdit={categoryToEdit} setModalIsOpen={setModalIsOpen} />
                    </div>
                </div>

            </div>
            <h1 className="title is-1 is-success">Categories</h1>
            <div className="columns is-centered">
                <Category categories={categories} setCategories={setCategories}
                    setCategoryToEdit={setCategoryToEdit} setModalIsOpen={setModalIsOpen} />
                <div className="column is-one-third ml-6">
                    <CategoryForm categories={categories} setCategories={setCategories} />
                </div>
            </div>
        </>
    )
}