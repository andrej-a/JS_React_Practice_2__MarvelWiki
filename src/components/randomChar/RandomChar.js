import { Component } from 'react';
import MarvelService from '../../services/MarvelService';
import ViewError from '../Error/Error';

import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';
import Spinner from '../spinner/Spinner';

class RandomChar extends Component{
    
    //syntax field of classes
    state = {
        char: {},
        loading: true,
        error: false
    }

    marvelService = new MarvelService()

    componentDidMount() {
        this.updateCharacter();
    }

    onCharacterLoaded = (char) => {
        return this.setState({
            char: char,
            loading: false
        })
    }

    onError = () => {
        return this.setState({
            loading: false,
            error: true
        })
    }

    updateCharacter = () => {
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
        this.setState({
            loading: true,
            error: false
        })

        this.marvelService
            .getCharacter(id)
            .then(char => this.onCharacterLoaded(char))
            .catch(this.onError)

    }

    render() {
        const {char, loading, error} = this.state;

        const errorMessage = error ? <ViewError errorMessage={"Sorry, this page is not found. Try it again!"}></ViewError> : null;
        const spinner = loading ? <Spinner></Spinner> : null;
        const character = !(errorMessage || spinner) ? <ViewInfo char={char}></ViewInfo> : null;

        return(
            <div className="random">
                {errorMessage}
                {spinner}
                {character}

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
                        <div className="random__action__btns" onClick={(id) => {this.updateCharacter(id)}}>
                            <a href="#" className="button button__main">
                                <div className="inner">try it</div>
                            </a>
                        </div>    
                </div>
            </div>
        )
    }
}

const ViewInfo = ({char}) => {

const {name, thumbnail, description, wikiLink, homeLink} = char;

    return(
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
    )
}

export default RandomChar;
