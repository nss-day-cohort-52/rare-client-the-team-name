
export const Tags = ({tags}) => {

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
                        <button className="delete" onClick={() => { }}>Delete</button>
                        <div className="level-left">
                                <div className="level-item">

                            <button className="button m-1 mr-5" onClick={() => { }}>Edit</button>
                            <div className="level-item px-5">
                                {tag.label}
                                </div>
                                </div>
                        </div>

                        
                           

                    </div>
                })
            }
        </div>
    )
}