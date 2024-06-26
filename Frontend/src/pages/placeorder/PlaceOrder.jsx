import React, { useContext, useEffect, useState } from 'react'
import "./PlaceOrder.css"
import { StoreContext } from '../../context/StoreContext'
import axios from "axios"
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'


const PlaceOrder = () => {

  const {getTotalCartAmount,token,food_list,cartItems,url} = useContext(StoreContext);

  const [data,setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city:"",
    state: "",
    zipcode: "",
    country: "",
    phone: ""
  })

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data=>({...data,[name]:value}))
  }

  const placeOrder = async(event)=>{
    event.preventDefault();
    let orderItems = [];
    food_list.map((item)=>{
      if(cartItems[item._id] > 0){
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    })
    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount()*10+20,
    }
    
    try {
      let response = await axios.post(url+"/api/order/place", orderData, { headers: { token } });
      console.log(response.data.session_url);
      if (response.data.success) {
        // const { session_url } = response.data;
        navigate("/")
        toast.success("Order placed successfully!");
        // window.location.replace(session_url);
      } else {
        alert("Error");
      }
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Error in response");
    }
  }
  const navigate = useNavigate();

  useEffect(()=>{
    if(!token){
      navigate("/cart")
    }else if(getTotalCartAmount() === 0){
      navigate("/cart")
    }
  },[token])
  
  return (
    <form onSubmit={placeOrder} className='place-order'>
        <div className="place-order-left">
          <p className='title'>Delivery Informatioin</p>
          <div className="multi-fields">
            <input required onChange={onChangeHandler} name='firstName' value={data.firstName} type="text" placeholder='First Name' />
            <input required onChange={onChangeHandler} name='lastName' value={data.lastName} type="text" placeholder='Last Name' />
          </div>
          <input required onChange={onChangeHandler} name='email' value={data.email} type="email" placeholder='Email Address' />
          <input required onChange={onChangeHandler} name='street' value={data.street} type="text" placeholder='Street' />
          <div className="multi-fields">
            <input required onChange={onChangeHandler} name='city' value={data.city} type="text" placeholder='City' />
            <input required onChange={onChangeHandler} name='state' value={data.state} type="text" placeholder='State' />
          </div>
          <div className="multi-fields">
            <input required onChange={onChangeHandler} name='zipcode' value={data.zipcode} type="text" placeholder='Zip code' />
            <input required onChange={onChangeHandler} name='country' value={data.country} type="text" placeholder='Country' />
          </div>
          <input required name='phone' value={data.phone} onChange={onChangeHandler} type="text" placeholder='Phone' />
        </div>
        <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}0</p>
            </div>
              <hr />
            <div className="cart-total-details">
            <p>Delivery Fee</p>
            <p>${getTotalCartAmount()===0?0:20}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>${getTotalCartAmount()===0?0:getTotalCartAmount()+2}0</b>
            </div>
          </div>
            <button type='submit'>Place your Order</button>
        </div>
        </div>
    </form>
  )
}

export default PlaceOrder
