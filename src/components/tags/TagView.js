import { useEffect, useState } from "react"
import { TagForm } from "./TagForm"
import { getTags } from "./TagManager"
import { Tags } from "./Tags"

export const TagView = () => {
    const [tags, setTags] = useState([])
    const [tagToEdit, setTagToEdit]= useState({})
    const [modalIsOpen, setModalIsOpen]= useState(false)

    useEffect(
        () => {
            getTags().then(setTags)
        }, []
    )

    return (
        <>
            <div id="edit-modal" class="modal">
                <div class="modal-background"></div>

                <div class="modal-content">
                    <div class="box">
                        <TagForm/>
                    </div>
                </div>

                <button class="modal-close is-large" aria-label="close"></button>
            </div>


            <h1 className="pl-4">Tags</h1>
            <div className="columns pt-3 pl-4">
                <Tags tags={tags} setTags={setTags} 
                    setTagToEdit={setTagToEdit} setModalIsOpen={setModalIsOpen}/>
                <TagForm setTags={setTags} />
            </div>
        </>
    )
}