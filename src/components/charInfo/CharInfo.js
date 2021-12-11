import { Component, Fragment } from 'react';
import MarvelService from '../../services/MarvelService';
import './charInfo.scss';
import Spinner from '../spinner/Spinner';
import ViewError from '../error/Error';

class CharInfo extends Component {
    constructor(props) {
        super(props)

        this.state = {
            char: {},
            loading: false,
            error: false,
            startMessage: true
        }
    }
    //it happens when props were updating
    componentDidUpdate(prevProps) {
        // popular example (don`tforget compaire props):
        if (this.props.charID !== prevProps.charID) {
          this.updateChar();
        }
      }

    marvelService = new MarvelService();

    updateChar = () => {
        this.setState({
            loading: true,
            startMessage: false,
            error: false,
        })

        const {charID} = this.props;
        if (!charID) {
            return;
        }

        this.marvelService
        .getCharacter(charID)
        .then(char => {
            this.onChangeState(char);
        })
        .catch(this.onError)
    }

    onChangeState = (char) => {
        this.setState({
            char: char,
            loading: false
        })
    }

    onError = () => {
        this.setState({
            loading: false,
            error: true
        })
    }
  
      //card with main informstion of character
    renderInfo = (char) => {
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
                                <div className="inner">homepage</div>
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
                    {this.renderComics(char)}
            </div>
        )
    }
    //render comicses for info higher
    renderComics = (obj) => {

        if (obj["comics"]["items"].length === 0) {
            return(
                <ul className="char__comics-list">
                   <p>Sorry, there aren`t any comicses.</p>
                </ul>
            )
        }

        const comics = obj["comics"]["items"].map((item, index) => {

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

    render() {
        const {char, loading, error, startMessage } = this.state;
        const errorMessage = error ? <ViewError errorMessage={"Catch error! Please, upload this page."}></ViewError> : null;
        const firstMessage = startMessage ? <ViewError errorMessage={"Please, choose a card to have more information."}></ViewError> : null;
        const spinner = loading ? <Spinner></Spinner> : null;
        const content = !(loading || error || firstMessage) ? this.renderInfo(char) : null;
        return (
            <Fragment>
                {spinner}
                {errorMessage}
                {content}
                {firstMessage}
            </Fragment>
        )
    }
}

export default CharInfo;