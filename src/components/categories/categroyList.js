import { useEffect, useState } from "react"

export const Categories = () => {
    const [categories, setCategories] = useState([])

    useEffect(
        () => {
            fetch("http://localhost:8088/categories")
                .then(res => res.json())
                .then((data) => {
                    setCategories(data)
                })
        },
        []
    )
    return (
        <>
            <h1>Categories</h1>
            <div>
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
        </>
    )
}