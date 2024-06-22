import { useNavigate } from "react-router";

function NavBar({onLoginClick, isLoggedIn}: {onLoginClick: () => void, isLoggedIn : boolean})
{

    const nav = useNavigate();
    return (
      <nav>
        <div className="nav-wrapper purple accent-5">
          <ul id="nav-mobile" className="left hide-on-med-and-down">
            <li onClick={() => nav("/configurations/")}>Конфигурации</li>
            {!isLoggedIn && (<li onClick={() => onLoginClick()}><a href="#login">Влез</a></li>)}
          </ul>
        </div> 
      </nav> 
    );
}

export default NavBar;