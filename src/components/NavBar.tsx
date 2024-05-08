function NavBar({onLoginClick}: {onLoginClick: ()=>void})
{
    return (
      <nav>
        <div className="nav-wrapper purple accent-5">
          <ul id="nav-mobile" className="left hide-on-med-and-down">
            <li><a href="#">Конфигурации</a></li>
            <li onClick={() => onLoginClick()}>Влез</li>
          </ul>
        </div> 
      </nav> 
    );
}

export default NavBar;