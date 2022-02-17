// import { useState, useRef } from "react";

// export const UploadPicForm = ({setModalIsOpen}) => {
    
//     const { imgString } = useRef(null)
    
//     const getBase64 = (file, callback) => {
//         const reader = new FileReader();
//         reader.addEventListener('load', () => callback(reader.result));
//         reader.readAsDataURL(file);
//     }
    
//     const createImageString = (event) => {
//         getBase64(event.target.files[0], (base64ImageString) => {
//             console.log("Base64 of file is", base64ImageString);
    
//             // Update a component state variable to the value of base64ImageString
//             setString(base64ImageString)
//         });
//     }
//     return (
//         <>
//             <form>
//             <input type="file" id="image" onChange={createImageString} />
//             <input type="hidden" name="id" value={user.id} />
//             <button onClick={() => {

//                 // Upload the stringified image that is stored in state
//             }}>Upload</button>
//             </form>
        
//         </>

//     )
// }
// }