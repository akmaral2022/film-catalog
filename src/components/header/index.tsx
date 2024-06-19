import "./style.css"
import Camera from "../../assets/icons/camera.png"
import { useState } from "react"
import { Link } from "react-router-dom";

export const Header = () => {
  const [menuState, setMenuState] = useState<boolean>(false);

  const handleMenuBurger = () => {
    setMenuState(!menuState)
  }

  return (
    <div className="header">
      <div className="conteiner">
        <div className="header__body">
          <div className="logo">
            <img src={Camera} alt="logo" />
          </div>
          <div className="header__burger" onClick={handleMenuBurger}>
            <span></span>
          </div>
          <div className={`menu ${menuState ? 'menu--open' : 'menu--closed'}`}>
            <ul>
              <li><Link to='/'>Все фильмы</Link></li>
              <li><Link to='/selected-films'>Избранные</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}