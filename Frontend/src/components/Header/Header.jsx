import React from 'react'
import "./Header.css"

const Header = () => {
  return (
    <div className='header'>
        <div className="header-contents">
            <h2>Satisfy Your Cravings Instantly....</h2>
            <p>Explore an exciting menu filled with a mouth-watering selection of dishes, crafted to perfection and delivered fresh to your door. Enjoy the convenience of gourmet dining at home, any time of day.</p>
            <a href="#explore-menu"><button className='view-more'>View Menu</button></a>
        </div>
        <div className="plate">
            <div className="food">
                <img src="/food_rotate.png" alt="Header food image" height={400} width={400} />  
            </div>
        </div>
     </div>
  )
}

export default Header
