import axios from "axios";
import { useState } from "react";

const ForgotPassword = ()=>{
    const [email,setEmail] = useState('');
    const [result,setResult] = useState('')

    const HandleForgotPassword = async(e) =>{
        setResult("Loading....");
        e.preventDefault();
        await axios.post('http://localhost:3001/user/forgetPassword',{email})
        .then(res=> {
            console.log(res); 
            setResult("Email Sent Successfully")
        })
        .catch(err=>console.log(err));
    }
    return(
        <>
        <h1>Forgot PassWord</h1>
        <p>for Reset Password Enter your Email you got an Email with ResetLink for reset password</p>
        <form action="" onSubmit={HandleForgotPassword}>
            <label htmlFor="email">Enter your Email</label>
            <input type="email" onChange={e=>setEmail(e.target.value)}/>
            
            <button type="submit">Submit</button>
        </form>
        <h2>{result}</h2>
        </>
    )
}
export default ForgotPassword;