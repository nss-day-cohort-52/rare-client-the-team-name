import { createReaction, updateReaction } from "./ReactionManager"
import { useEffect, useRef } from "react"



export const ReactionForm = ({ setReactions, reactions, setModalIsOpen }) => {
    const label = useRef(null)
    const image = useRef(null)

    const newReaction = (evt) => {
        evt.preventDefault()
            createReaction({
                label: label.current.value,
                image_url: image.current.value
            })
                .then(setReactions)
        }
    
    useEffect(() => {
        label.current.value = null
        image.current.value = null
    }, [reactions])

    return (

        <form className="notification is-success has-text-weight-medium">
            <button className="delete mt-2" onClick={() => setModalIsOpen(false)}>Close</button>
            <h3 className="subtitle mb-2">Enter New Reaction</h3>
            
            <fieldset>
                <div className="form-group">
                    <label htmlFor="reactionName"></label>
                    <input className="box" type="text" id="reactionName" ref={label} required autoFocus placeholder="reaction name" />
                </div>
                <div className="form-group">
                    <label htmlFor="reactionImage"></label>
                    <input className="box" type="url" id="reactionImage" ref={image} required autoFocus placeholder="reaction image url" />
                </div>
            </fieldset>
            <button className="button mt-2 m-1" type="submit" onClick={(evt) => { newReaction(evt) }}>
                Save reaction
            </button>
        </form>

    )
}