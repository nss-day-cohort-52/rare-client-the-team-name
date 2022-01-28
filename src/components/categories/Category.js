import { deleteCategory } from "./CategoryManager"

export const Category = ({ categories, setCategories }) => {
    return (
        <div className="column is-one-quarter mr-6">

            {
                categories.map(
                    (category) => {
                        return <div className="notification is-success p-3 has-text-weight-medium" key={`category--${category.id}`}>
                            <button className="delete is-info" onClick={() => { 
                                deleteCategory(category.id)
                                    .then(setCategories)
                            }}></button>
                            <div className="level-left">

                                <div className="level-item">
                                    <button className="button m-1" onClick={() => { }}>Edit</button>
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