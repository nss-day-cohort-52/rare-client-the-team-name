import { useEffect, useState } from "react"

export const Tags = ({tags}) => {

    return (
        <ul className="allTags column">
            {
                tags.sort((a, b) => {
                    if (a.label < b.label)
                        return -1
                    else if (a.label > b.label)
                        return 1
                    return 0
                }).map((tag) => {
                    return <li className="notification is-primary p-3" key={tag.id}>

                        <button className="button is-info m-1" onClick={() => { }}>Edit Task</button>
                        <button className="button is-info m-1" onClick={() => { }}>Delete</button>

                        <span className="">
                            {tag.label}
                            </span>

                    </li>
                })
            }
        </ul>
    )
}