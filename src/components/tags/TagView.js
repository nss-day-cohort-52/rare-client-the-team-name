import { useEffect, useState } from "react"
import { TagForm } from "./TagForm"
import { getTags } from "./TagManager"
import { Tags } from "./Tags"
import './tagView.css'

export const TagView = () => {
    const [tags, setTags] = useState([])

    useEffect(
        () => {
            getTags().then(setTags)
        }, []
    )

    return (
        <>
            <h1>Tags</h1>
            <div className="tagViewContainer">
                <Tags className="tagViewColumn" tags={tags} />
                <TagForm className="tagViewColumn"setTags={setTags} />
            </div>
        </>
    )
}