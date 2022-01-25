import { useEffect, useState } from "react"


export const Tags = () => {
    const [tags, setTags] = useState([])

    useEffect(
        () => {
            return fetch(`http://localhost:8088/tags`)
            .then(response => response.json())
            .then(
                (data) => {
                    setTags(data)
                }
            )
        }, []
    )
    return (
        <>
        <h1>Tags</h1>
        <div>

        <ul className="allTags">
           { 
           tags.sort((a,b) => {
               if(a.label<b.label)
                    return -1
                else if (a.label>b.label)
                    return 1
                return 0
           }).map((tag) => {
              return <li key={tag.id}>
                   
                        <button onClick={()=>{}}>Edit Task</button>
                        <button onClick={()=>{}}>Delete Task</button>
                   
                        {tag.label}
                   
               </li>
            })
        }
        </ul>
        </div>
        </>
    )
}