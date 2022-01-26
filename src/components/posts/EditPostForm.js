import { useEffect, useState } from "react"
import userRepo from "../../repos/userRepo"
import { useHistory } from "react-router"

export const EditPostForm = () => {
    const [post, setPost] = useState({})
    const [newAddress, setAddress] = useState("")
    const [newPhone, setPhone] = useState("")
    const history = useHistory()
    const currentUserId = parseInt(localStorage.getItem('token'))

    useEffect(() => {
        userRepo.get(parseInt(localStorage.getItem("farm_user"))).then(u => setUser(u))
    }, [])



    const updateUserInfo = () => {
        let updatedAddress = ""
        let updatedPhone = ""

        if (newAddress) {
            updatedAddress = newAddress
        }
        else {
            updatedAddress = user.address
        }

        if (newPhone) {
            updatedPhone = newPhone
        }
        else {
            updatedPhone = user.phone
        }

        const updatedUser = {
            name: user.name,
            address: updatedAddress,
            email: user.email,
            phone: updatedPhone
        }

        userRepo.updateUser(user.id, updatedUser)
        history.push("/account")    
        
    }

    return (
        <>
        <main className="container" >
        <h2 className="heading">Update Account Info</h2>
        <form className="box2">
            <fieldset>
                <div className="form-group">
                    <label htmlFor="address">Address:</label>
                    <input
                        onChange={ event => setAddress(event.target.value) }
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder={user.address}
                        />
                </div>
                <div className="form-group">
                    <label htmlFor="phone number">Phone Number:</label>
                    <input
                        onChange={event => setPhone(event.target.value) }
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder={user.phone}
                        />
                </div>
                <button type="button" className="button" onClick={() => updateUserInfo()}>
                Submit
            </button>
            </fieldset>

        </form>
        </main>
        </>
    )
}