import "./error.scss"
import PropTypes from "prop-types";
const ViewError = (props) => {
    return(
        <div className="random__error">
            <p>{props.errorMessage}</p>
        </div>
    )
}

ViewError.propTypes = {
    errorMessage: PropTypes.string
}

ViewError.defaultProps = {
    errorMessage: "Some problems. We are trying to resolve it."
}

export default ViewError;