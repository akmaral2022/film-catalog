import "./style.css"
import Camera from "../../assets/icons/camera.png"

export const Welcome = () => {
  return (
    <div className="welcome">
      <div className="trial">
      </div>
      <div className="trial-logo">
        <img src={Camera} alt="logo" />
      </div>
      <div className="trial-text">
        <h1>Здесь вы можете найти фильм подходящий вашим предподчтениям</h1>
        <h2> Приятного просмотра</h2>
      </div>
    </div>
  )
}