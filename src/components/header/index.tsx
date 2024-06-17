import "./style.css"
import Camera from "../../assets/icons/camera.png"
import { useState } from "react"

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
          <div className={`menu ${menuState ? 'menu--open' : ''}`}>
            <ul>
              <li>Главная</li>
              <li>Все фильмы</li>
              <li>Избранные</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}