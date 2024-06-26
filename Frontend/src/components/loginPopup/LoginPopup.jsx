import React, { useContext, useState } from 'react'
import "./LoginPopup.css"
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import {toast} from 'react-toastify'


const LoginPopup = ({ setShowLogin }) => {

    const {url,setToken, setUser} = useContext(StoreContext);
    const [currState, setCurrState] = useState("Sign up");

    const [data,setData] = useState({
        name:"",
        email: "",
        password: ""
    })

    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        setData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };


    const onLogin = async(event)=>{
        event.preventDefault();
        let newUrl = url;
        newUrl += currState === "login" ? "/api/user/login" : "/api/user/register";
        const response = await axios.post(newUrl,data)
        if(response.data.success){
            setToken(response.data.token)
            localStorage.setItem("token",response.data.token)
            if (response.data.user) {
                setUser(response.data.user);
                localStorage.setItem("user", JSON.stringify(response.data.user));
            }
            setShowLogin(false);
            toast.success(currState === "login" ? "Logged in successfully!" : "Account created successfully!");
        }else{
            toast.error(response.data.message);
        }
    }


    return (
        <div className='login-popup'>
            <form onSubmit={onLogin} action="" className='login-popup-container'>
                <div className="login-popup-title">
                    <h2>{currState}</h2>
                    <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="" />
                </div>
                <div className="login-popup-inputs">
                    {currState === 'login' ? <>
                    </> : <input name='name' onChange={onChangeHandler} value={data.name} type="text" placeholder='Your name' required />}

                    <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Your email' required />
                    <input name='password' onChange={onChangeHandler} value={data.password} type="password" placeholder='password' required />
                </div>
                <button type='submit'>{currState === "Sign up" ? "Create account" : "Login"}</button>
                <div className="login-popup-condition">
                    <input type="checkbox" required />
                    <p>By continuing, i agree to the terms of use & privacy policy.</p>

                </div>
                <p>
                    {currState === "login" ? "Create a new account?" : "Already have an account?"}{" "}
                    <span onClick={() => setCurrState(currState === "login" ? "Sign up" : "login")}>
                        {currState === "login" ? "Sign up here" : "Login here"}
                    </span>
                </p>
            </form>
        </div>
    )
}

export default LoginPopup
