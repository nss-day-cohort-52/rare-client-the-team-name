import { useEffect, useState } from "react"
import { TagForm } from "./TagForm"
import { getTags } from "./TagManager"
import { Tags } from "./Tags"

export const TagView = () => {
    const [tags, setTags] = useState([])

    useEffect(
        () => {
            getTags().then(setTags)
        }, []
    )

    return (
        <>
            <h1 className="title is-1 pl-4">Tags</h1>
            <div className="columns pt-3 pl-4">
                <Tags tags={tags} />
                <TagForm setTags={setTags} />
            </div>
        </>
    )
}