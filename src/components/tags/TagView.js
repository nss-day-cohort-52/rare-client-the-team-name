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
            <h1 className="pl-4">Tags</h1>
            <div className="columns pt-3 pl-4">
                <Tags tags={tags} setTags={setTags}/>
                <TagForm setTags={setTags} />
            </div>
        </>
    )
}