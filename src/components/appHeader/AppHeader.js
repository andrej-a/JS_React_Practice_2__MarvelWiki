import './appHeader.scss';
import {Link} from "react-router-dom";

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
                            <li className="app__menu"> <Link to="/"> Characters </Link> </li>
                             <span>/</span>
                            <li className="app__menu"> <Link to="/comics"> Comics </Link> </li>
                        </ul>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default AppHeader;