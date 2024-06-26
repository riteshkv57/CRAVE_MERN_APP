import React, { useContext, useState } from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
import { Link,useNavigate } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext'

const Navbar = ({setShowLogin}) => {
    const [menu,setMenu] = useState("Home")
    const navigate = useNavigate();

    const {getTotalCartAmount,token, setToken, user, logout} = useContext(StoreContext);
    // const { name } = user;
    
  return (
    <div className='navbar'>
        <Link to={'/'}><img src={assets.logo} alt="" className='logo' /></Link>
        <ul className="navbar-menu">
            <Link to={"/"} onClick={()=>setMenu("Home")} className={menu === "Home"?"active":""}>Home</Link>
            <a href='#explore-menu' onClick={()=>setMenu("Menu")} className={menu === "Menu"?"active":""}>Menu</a>
            <a href='#reservation' onClick={()=>setMenu("reservation")} className={menu === "reservation"?"active":""}>Reservation</a>
            <a href='#footer' onClick={()=>setMenu("Contact-Us")} className={menu === "Contact-Us"?"active":""}>Contact Us</a>
        </ul>
        <div className="navbar-right">
            <div className="navbar-search-icon">
                <Link to={'/cart'}><img  src={assets.basket_icon} height={35} width={35} alt="" /></Link>
                <div className={getTotalCartAmount()=== 0 ?"":"dot"}></div>
            </div>
            {
                !token?<button onClick={()=>setShowLogin(true)}>sign in</button>
                :<div className='nav-profile'>
                    <img src={assets.profile_icon} alt="" height={40} width={40} />
                    <ul className='nav-profile-dropdown'>
                    {/* <li><p>{user?.name}</p></li> */}
                        {/* <hr /> */}
                        <li onClick={()=>navigate("/myorders")}><img src={assets.bag_icon} alt="" /><p>orders</p></li>
                        {/* <hr /> */}
                        <li onClick={logout}><img src={assets.logout_icon} alt="" /><p>Logout</p></li>
                    </ul>
                </div>
            }
            
        </div>
    </div>
  )
}

export default Navbar
