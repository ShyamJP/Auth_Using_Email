import axios from "axios";
import { useState } from "react";

const ResetPassword = ()=>{
    const [newPassword ,setNewPassword] = useState('');
    const [token,setToken] = useState('');

    const HandleResetPassword = async(e) =>{
        e.preventDefault();
        await axios.post(`http://localhost:3001/user/reset-password/${token}`,{newPassword})
        .then(res => console.log(res))
        .catch(err=>console.log(err));
    }
    return(
        <>
        <p>Reset PassWord</p>
        <form action="" onSubmit={HandleResetPassword}>
            <label htmlFor="email">Enter your Email</label>
            <input type="Password" onChange={e=>setNewPassword(e.target.value)}/>
            
            <label htmlFor="token">Enter Token Which you receive in your email</label>
            <input type="text" name="token" onChange={(e)=> setToken(e.target.value)} />
            <button type="submit">Submit</button>
        </form>
        </>
    )
}
export default ResetPassword;