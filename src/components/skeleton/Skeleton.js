import './skeleton.scss';

const Skeleton = () => {
    return (
            <div className="skeleton">
            <p className="char__select">Please select a character to see information</p>
                <div className="pulse skeleton__header">
                    <div className="pulse skeleton__circle"></div>
                    <div className="pulse skeleton__mini"></div>
                </div>
                <div className="pulse skeleton__block"></div>
                <div className="pulse skeleton__block"></div>
                <div className="pulse skeleton__block"></div>
            </div>
    )
}

export default Skeleton;