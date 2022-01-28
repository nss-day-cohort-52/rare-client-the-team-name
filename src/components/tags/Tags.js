import { deleteTag } from "./TagManager"

export const Tags = ({ tags, setTags, setTagToEdit, setModalIsOpen }) => {

    return (
        <div className="column is-one-quarter">
            {
                tags.sort((a, b) => {
                    if (a.label < b.label)
                        return -1
                    else if (a.label > b.label)
                        return 1
                    return 0
                }).map((tag) => {
                    return <div className="notification is-success p-3 has-text-weight-medium" key={tag.id}>
                        <button className="delete" onClick={() => {
                            deleteTag(tag.id)
                                .then(setTags)
                        }
                        }>Delete</button>
                        <div className="level-left level-item">
                                <button className="button m-1 mr-5" onClick={() => {
                                    setTagToEdit(tag)
                                    setModalIsOpen(true)
                                }}>Edit</button>
                                <div className="level-item pr-5 pl-0">
                                    {tag.label}
                                </div>
                        </div>
                    </div>
                })
            }
        </div>
    )
}