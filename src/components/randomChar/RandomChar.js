import { useState, useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';
import PropTypes from "prop-types";
import useMarvelService from '../../services/MarvelService';
import ViewError from '../error/Error';

import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';
import Spinner from '../spinner/Spinner';

const RandomChar = () => {
    
    const [char, setChar] = useState({});
    const [show, setShow] = useState(false);
    const {loading, error,clearError, getCharacter} = useMarvelService();

    useEffect(() => {
        updateCharacter();
    }, []);

    function onCharacterLoaded(char) {
        setChar(char);
        setShow(true);
    }

    function updateCharacter() {
        clearError();
        
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
        
        getCharacter(id)
            .then(char => onCharacterLoaded(char));
    }

        const errorMessage = error ? <ViewError errorMessage={"Sorry, this page is not found. Try it again!"}></ViewError> : null;
        const spinner = loading ? <Spinner></Spinner> : null;

        return(
            <div className="random">
                <div className="random__wrapper">
                    {errorMessage}
                    {spinner}
                    
                    <ViewInfo 
                    show={show}
                    char={char}
                    >
                    </ViewInfo>
                </div>

                <div className="random__action">
                        <div className="random__action__title">
                            <p>Random character for today!</p>
                            <p>Do you want to get to know him better?</p>
                        </div>
                        <div className="random__action__choose">
                            <p>Or choose another one</p>
                        </div>
                        <div className="random__action__image">
                            <img src={mjolnir} alt="mjolnir" />
                        </div>
                        <div className="random__action__btns" onClick={(id) => {
                            updateCharacter(id)
                            setShow(false)
                            }}>
                            <a href="#" className="button button__main">
                                <div className="inner">try it</div>
                            </a>
                        </div>    
                </div>
            </div>
        )
}

const ViewInfo = (props) => {

const {name, thumbnail, description, wikiLink, homeLink} = props.char;
const timeout = 1000;
    return(
        <CSSTransition
        classNames="random__info"
        timeout={timeout}
        in={props.show}
        >
            <div className="random__info">
                    <div className="random__image">
                        <img src={thumbnail} alt={thumbnail} />
                    </div>
                    <div className="random__description">
                        <div className="random__title">
                            <h2>{name}</h2>
                        </div>
                        <div className="random__text">
                            <p>{description}</p>
                        </div>
    
                        <div className="random__buttons">
                            <div className="random__btns">
                                <a href={homeLink} className="button button__main">
                                    <div className="inner">homepage</div>
                                </a>
                            </div>
                            <div className="random__btns">
                                <a href={wikiLink} className="button button__secondary">
                                    <div className="inner">Wiki</div>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
        </CSSTransition>
    )
}

ViewInfo.propTypes = {
    char: PropTypes.object
}

export default RandomChar;
