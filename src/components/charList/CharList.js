import { Component } from 'react';
import PropTypes from "prop-types";
import ViewError from '../Error/Error';
import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import './charList.scss';


class CharList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            charList: [],
            loading: true,
            error: false,
            newItemsLoading: false,
            offset: 1660,
            lastCharacters: false,
        }
    }
    
    marvelService = new MarvelService();
   
    componentDidMount() {
        this.getMoreCharacters()
    }

    getMoreCharacters = (offset) => {
        this.onNewItemsLoading();
        
        this.marvelService.getAllCharacters(offset)
        .then(list => {
            if (list.length === 0) {
                this.setState({lastCharacters: true})
            }  
            this.onNewItemsCharacters(list)
        })
        .catch(this.onCatchError)
    }

    onCatchError = () => {
        this.setState({
            loading: false,
            error: true,
            newItemsLoading: false,
        })
    }

    onNewItemsLoading = () => {
        this.setState({
            loading: false,
            newItemsLoading: true
        })
    }

    onNewItemsCharacters = (newArray) => {
        this.setState(({offset, charList}) => ({
            charList: [...charList, ...newArray],
            newItemsLoading: false,
            offset: offset + 9,
        }))
    }
    
    renderItems = (arr) => {
        const items = arr.map(item => {
            let imgStyle = {"objectFit": "cover"}
            
            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = {'objectFit' : 'unset'};
            }

            return (
                <li 
                    className="char__item"
                    onClick={() => {
                        this.props.onCharSelected(item["id"])
                    }}
                    key={item["id"]}>
                        <img src={item.thumbnail} alt={item.name} style={imgStyle}/>
                        <a target="blank" href={item["homeLink"]}>
                            <div className="char__name">{item.name}</div>
                        </a>
                </li>
            )
        })
        
        return (
            <ul className="char__grid">
                {items}
            </ul>
        )
    }

    render() {
        const {loading, error, charList, newItemsLoading, offset, lastCharacters} = this.state;
        const spinner = loading ? <Spinner></Spinner> : null;
        const err = error ? <ViewError errorMessage={"Catch error! Please, upload this page."}></ViewError> : null;
        const content = !(error) ? this.renderItems(charList) : null;

        const minLoad = (!(loading) && newItemsLoading) ? <Spinner></Spinner> : null;
        const loadButton = !(error || loading || newItemsLoading || lastCharacters) ? <LoadCharButton getMoreCharacters={() => this.getMoreCharacters(offset)}></LoadCharButton> : null;
        const lastCard = lastCharacters ? <ViewError errorMessage={"Out of cards."}></ViewError> : null;
        return (
            <div className="char__list">
                {spinner}
                {err}
                {content}
                {minLoad}
                {loadButton}
                {lastCard}
            </div>
        )
    }
}

const LoadCharButton = (props) => {
    return(
        <button
        onClick={() => props.getMoreCharacters()}
        className="button button__main button__long">
            <div className="inner">load more</div>
        </button>
    )
}

CharList.propTypes = {
    onCharSelected: PropTypes.func
}

LoadCharButton.propTypes = {
    getMoreCharacters: PropTypes.func
}

export default CharList;
