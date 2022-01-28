import { useEffect, useState } from "react"
import { TagForm } from "./TagForm"
import { getTags } from "./TagManager"
import { Tags } from "./Tags"

export const TagView = () => {
    const [tags, setTags] = useState([])
    const [tagToEdit, setTagToEdit] = useState({})
    const [modalIsOpen, setModalIsOpen] = useState(false)

    useEffect(
        () => {
            getTags().then(setTags)
        }, []
    )

    return (
        <>
            <div id="edit-modal" className={modalIsOpen ? "modal is-active" : "modal"}>
                <div className="modal-background"></div>
                <div className="modal-content">
                    <div className="box">
                        <TagForm setTags={setTags} tagToEdit={tagToEdit} setModalIsOpen={setModalIsOpen} />
                    </div>
                </div>
            </div>

            <h1 className="title is-1 pl-4">Tags</h1>
            <div className="columns is-centered">
                <Tags tags={tags} setTags={setTags}
                    setTagToEdit={setTagToEdit} setModalIsOpen={setModalIsOpen} />
                <section className="column ml-6 is-one-third">
                    <TagForm setTags={setTags} />
                </section>
            </div>
        </>
    )
}