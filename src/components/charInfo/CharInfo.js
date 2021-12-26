import { useState, useEffect, Fragment } from 'react';
import MarvelService from '../../services/MarvelService';
import PropTypes from "prop-types";
import './charInfo.scss';
import Spinner from '../spinner/Spinner';
import ViewError from '../error/Error';
import Skeleton from '../skeleton/Skeleton';

const CharInfo = (props) => {

    const [char, setChar] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [skeleton, setSkeleton] = useState(true);
    
    useEffect(() => {
        if (props.charID) {
            updateChar();
        }
    }, [props.charID]);
    
    const marvelService = new MarvelService();

    function updateChar() {
        setLoading(true);
        setSkeleton(false);
        setError(false);
        
        const {charID} = props;

        if (!charID) {
            return;
        }

        marvelService
            .getCharacter(charID)
            .then(char => {
                onChangeState(char);
            })
            .catch(onError)

    }

    function onChangeState(char) {
        setChar(char);
        setLoading(false);
    }

    function onError () {
        setLoading(false);
        setError(true);
    }
  
        const errorMessage = error ? <ViewError errorMessage={"Catch error! Please, upload this page."}></ViewError> : null;
        const firstMessage = skeleton ? <Skeleton></Skeleton> : null;
        const spinner = loading ? <Spinner></Spinner> : null;
        const content = !(loading || error || firstMessage) ? <Information char={char}></Information> : null;
        
        return (
            <Fragment>
                {firstMessage}
                {spinner}
                {errorMessage}

                {content}
            </Fragment>
        )
}

//card with main informstion of character 
const Information = (props) => {
    const {char} = props;
    let imgStyle = {"objectFit": "cover"}
    if (char["thumbnail"] === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
        imgStyle = {'objectFit' : 'unset'};
    }

    return (
        <div className="char__info">
            <div className="char__basics">
                <img style={imgStyle} src={char["thumbnail"]} alt="abyss"/>
                <div>
                    <div className="char__info-name">{char["name"]}</div>
                    <div className="char__btns">
                        <a href={char["homeLink"]} className="button button__main">
                            <div className="inner">Homepage</div>
                        </a>
                        <a href={char["wikiLink"]} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {char["description"]}
            </div>
            <div className="char__comics">Comics:</div>
                <Comics obj={char}></Comics>
        </div>
    )
}

//render comicses for info higher
const Comics = (props) => {
    const {obj} = props;      
    if (obj["comics"].length === 0) {
        return(
            <ul className="char__comics-list">
                <p>Sorry, there aren`t any comicses.</p>
            </ul>
        )
    }

    const comics = obj["comics"].map((item, index) => {

        return (
            <li key={index} className="char__comics-item">
                    <a href={item["resourceURI"]}>{item["name"]}</a>
                </li>
        )
    })

    return(
        <ul className="char__comics-list">
                {comics}
            </ul>
    )
    
}

CharInfo.propTypes = {
    charID: PropTypes.number
}

export default CharInfo;