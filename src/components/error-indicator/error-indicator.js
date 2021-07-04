
import './error-indicator.css';
import icon from './death-star.png';

const ErrorIndicator = () => {
  return (
    <div className='error-indicator'>
      <img src={icon} width='25%' alt='X'></img>
      <span className='boom'>OOPS!</span>
      <span> something has gone terribly wrong </span>
      <span>
        (but we already send droids to fix it)
      </span>
    </div>
  )
}

export default ErrorIndicator;