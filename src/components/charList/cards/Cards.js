
const Cards = (props) => {
    const {obj} = props.obj
    console.log(obj);
    return(
        <ul className="char__grid">
            <li className="char__item">
                <img src={obj[0]["thumbnail"]} alt={obj[0]["name"]}/>
                <div className="char__name">{obj[0]["name"]}</div>
            </li>
        </ul>
    )
}

export default Cards;