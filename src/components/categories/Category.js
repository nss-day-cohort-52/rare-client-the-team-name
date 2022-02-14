import { deleteCategory, getCategories } from "./CategoryManager"

export const Category = ({ categories, setCategories, setCategoryToEdit, setModalIsOpen }) => {
    return (
        <div className="column is-one-quarter mr-6">

            {
                categories.map(
                    (category) => {
                        return <div className="notification is-success p-3 has-text-weight-medium" key={`category--${category.id}`}>
                            <button className="delete is-info" onClick={() => { 
                                deleteCategory(category.id).then((res)=>{
                                    if (res.status === 304){
                                        window.alert("This category is already in use and cannot be deleted")
                                    }

                                }).then(getCategories)
                                    .then(setCategories)
                            }}></button>
                            <div className="level-left">

                                <div className="level-item">
                                    <button className="button m-1" onClick={() => {
                                    setCategoryToEdit(category)
                                    setModalIsOpen(true)
                                }}>Edit</button>
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
    )
}