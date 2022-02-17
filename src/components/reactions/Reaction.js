import { deleteReaction, getReactions } from "./ReactionManager"

export const Reaction = ({ reactions, setReactions, setReactionToEdit, setModalIsOpen }) => {
    return (
        <div className="column is-one-quarter mr-6">

            {
                reactions.map(
                    (reaction) => {
                        return <div className="notification is-success p-3 has-text-weight-medium" key={`reaction--${reaction.id}`}>
                            <button className="delete is-info" onClick={() => { 
                                deleteReaction(reaction.id).then((res)=>{
                                    if (res.status === 304){
                                        window.alert("This reaction is already in use and cannot be deleted")
                                    }

                                }).then(getReactions)
                                    .then(setReactions)
                            }}></button>
                            <div className="level-left">

                                {/* <div className="level-item">
                                    <button className="button m-1" onClick={() => {
                                    setReactionToEdit(reaction)
                                    setModalIsOpen(true)
                                }}>Edit</button>
                                </div> */}
                                <div className="level-item px-5">

                                    {reaction.label}
                                </div>
                                <div id="reactionImage"className="level-item px-5">

                                <img src={reaction.image_url} alt={reaction.label} width="150" height="150" />
                                </div>
                            </div>

                        </div>
                    }
                )
            }

        </div>
    )
}