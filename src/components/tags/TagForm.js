
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
        <section className="column ml-6 is-one-third">

        <div className="notification is-success has-text-weight-medium m-4">
            <h3 className="subtitle mb-2">Enter New Tag Here</h3>
            <input className="box m-0"
                id="tagEdit"
                type="text"
                onChange={(event) => {
                    setNewTagString(event.target.value)
                }}
                />
            <div>
                <button className="button mt-2" onClick={() => constructTag()}>Submit</button>
            </div>
        </div>
                </section>

    )
}

