
import { useEffect, useState } from "react"
import { addTag, getTags, getTagsByLabel } from "./TagManager"
import { Tags } from "./Tags"

export const TagForm = ({ setTags }) => {
    const [newTagString, setNewTagString] = useState("")
    const [tagsByLabel, setTagsByLabel] = useState([])

    useEffect(
        () => {
            getTagsByLabel(newTagString)
                .then(setTagsByLabel)
        }, [newTagString]
    )

    const constructTag = () => {
        if (tagsByLabel.length > 0) {
            window.alert("This tag already exists")
        } else {
            addTag({ label: newTagString })
                .then(setTags)
        }
    }

    return (

        <div className="column">
            <h3>New Tag</h3>
            <input
                id="tagEdit"
                type="text"
                onChange={(event) => {
                    setNewTagString(event.target.value)
                }}
            />
            <div>
                <button onClick={() => constructTag()}>Submit</button>
            </div>
        </div>

    )
}

