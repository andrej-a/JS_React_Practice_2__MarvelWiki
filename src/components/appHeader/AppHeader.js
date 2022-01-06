import './appHeader.scss';
import {Link, NavLink} from "react-router-dom";

const AppHeader = () => {
    
    return (
        <header>
            <div className="app">
                <div className="app__header">
                    <div className="app__title">
                        <Link to="/">
                            <h1><span>Marvel</span> information portal</h1>
                        </Link>
                    </div>

                    <div className="app__menu">
                        <ul>
                            <li className="app__menu"> <NavLink
                                end
                                to="/" 
                                className={({ isActive }) => "app__menu" + (isActive ? " active" : "")}
                                > Characters </NavLink> </li>
                             <span>/</span>
                            <li className="app__menu"> <NavLink
                                end 
                                to="/comics" 
                                className={({ isActive }) => "app__menu" + (isActive ? " active" : "")}
                                > Comics </NavLink> </li>
                        </ul>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default AppHeader;