import { useEffect, useState } from "react"
import { addTag, getTagsByLabel, updateTag } from "./TagManager"

export const TagForm = ({ setTags, tagToEdit, setModalIsOpen }) => {
    const [newTagString, setNewTagString] = useState("")
    const [foundTags, setFoundTags] = useState([])

    useEffect(
        () => {
            getTagsByLabel(newTagString).then(setFoundTags)
        }, [newTagString]
    )

    useEffect(
        () => {
            if (tagToEdit) {
                setNewTagString(tagToEdit.label)
            }
        }, [tagToEdit]
    )

    const constructTag = () => {
        if (foundTags.length > 0) {
            window.alert("This tag already exists")
        } else if (tagToEdit) {
            updateTag({ label: newTagString }, tagToEdit.id)
                .then(setTags)
                .then(() => setModalIsOpen(false))
        } else {
            addTag({ label: newTagString })
                .then(setTags)
        }
    }

    return (
        <div className="notification is-success has-text-weight-medium m-4">
            {
                    tagToEdit
                        ? <button className="delete mt-2" onClick={() => setModalIsOpen(false)}>Close</button>
                        : ""
                }
            {
                tagToEdit
                    ? <h3 className="subtitle mb-2">Edit Tag</h3>
                    : <h3 className="subtitle mb-2">Enter New Tag</h3>
            }
            <input className="box m-0"
                id="tagEdit"
                type="text"
                value={newTagString ? newTagString : ""}
                onChange={(event) => {
                    setNewTagString(event.target.value)
                }}
            />
            <div>
                <button className="button mt-2" onClick={() => constructTag()}>Submit</button>
                
            </div>
        </div>
    )
}

