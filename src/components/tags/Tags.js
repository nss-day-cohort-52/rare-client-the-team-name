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
                    return <li key={tag.id}>

                        <button onClick={() => { }}>Edit Task</button>
                        <button onClick={() => { }}>Delete Task</button>

                        {tag.label}

                    </li>
                })
            }
        </ul>
    )
}