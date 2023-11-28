import Signup from "../Signup/Signup";
import Login from "../Login/Login";
import Logout from "../Logout/Logout";
import { useState } from "react";
// import PrivateText from "../../components/PrivateText/PrivateText";
import Home from "../Home/Home";
import { useUser } from "./UserContext";
const User = () => {
    const [show, setShow]=useState(true)
    const { currUser, setCurrUser } = useUser();
    if(currUser) 
        return (
            <div>
            Hello {currUser.email}
            <Home currUser={currUser}/>
            <Logout setCurrUser={setCurrUser}/>
            </div>
        )
    return (
        <div>
            { show?
                <Login setCurrUser={setCurrUser} setShow={setShow}/>  
                :
                <Signup setCurrUser={setCurrUser}  setShow={setShow} />
            }
        </div>
    )
}
export default User