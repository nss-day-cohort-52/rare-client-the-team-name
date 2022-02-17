import { useEffect, useState } from "react"
import { getReactions } from "./ReactionManager"
import { ReactionForm } from "./ReactionForm"
import { Reaction } from "./Reaction"

export const Reactions = () => {
    const [reactions, setReactions] = useState([])
    const [reactionToEdit, setReactionToEdit] = useState({})
    const [modalIsOpen, setModalIsOpen] = useState(false)

    useEffect(() => {
        getReactions().then(setReactions)
    }, [])


    return (
        <>
            {/* <div id="edit-modal" className={modalIsOpen ? "modal is-active" : "modal"}>
                <div className="modal-background"></div>

                <div className="modal-content">
                    <div className="box">
                        <ReactionForm setReactions={setReactions} reactions={reactions}
                            reactionToEdit={reactionToEdit} setModalIsOpen={setModalIsOpen} />
                    </div>
                </div>

            </div> */}
            <h1 className="title is-1 is-success">Reactions</h1>
            <div className="columns is-centered">
                <Reaction reactions={reactions} setReactions={setReactions}
                    setReactionToEdit={setReactionToEdit} setModalIsOpen={setModalIsOpen} />
                <div className="column is-one-third ml-6">
                    <ReactionForm reactions={reactions} setReactions={setReactions} />
                </div>
            </div>
        </>
    )
}