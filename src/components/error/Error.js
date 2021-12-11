import "./error.scss"

const ViewError = (props) => {
    return(
        <div className="random__error">
            <p>{props.errorMessage}</p>
        </div>
    )
}

export default ViewError;