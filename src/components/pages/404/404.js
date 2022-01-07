import "../404/404.scss";
import {Link} from "react-router-dom";
const NotPage = () => {
    return (
        <div className="notpage">
            <div className="notpage__title">
                <p>Oooophs 404! Click <Link to="/"><span>here</span></Link> to come back into the main page.</p>
            </div>
            <div className="notpage__imagine">
            </div>
        </div>
    )
};

export default NotPage;