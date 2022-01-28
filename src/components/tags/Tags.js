import { useEffect, useState } from "react"
import { deleteTag } from "./TagManager"

export const Tags = ({tags, setTags}) => {


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
                        <button onClick={() => { 
                            deleteTag(tag.id)
                            .then(setTags)
                        }}>Delete Task</button>

                        {tag.label}

                    </li>
                })
            }
        </ul>
    )
}