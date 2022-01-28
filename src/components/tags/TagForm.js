
import { useEffect, useState } from "react"
import { addTag, getTags, getTagsByLabel } from "./TagManager"
import { Tags } from "./Tags"

export const TagForm = ({ setTags }) => {
    const [newTagString, setNewTagString] = useState("")
    const [foundTags, setFoundTags] = useState([])

    useEffect(
        () => {
            getTagsByLabel(newTagString).then(setFoundTags)
        }, [newTagString]
    )

    const constructTag = () => {
        if (foundTags.length > 0) {
            window.alert("This tag already exists")
        } else {
            addTag({ label: newTagString })
                .then(setTags)
        }
    }

    return (

        <div className="notification is-primary m-4">
            <h3>Enter New Tag Here</h3>
            <input className="box"
                id="tagEdit"
                type="text"
                onChange={(event) => {
                    setNewTagString(event.target.value)
                }}
            />
            <div>
                <button className="button is-info" onClick={() => constructTag()}>Submit</button>
            </div>
        </div>

    )
}

