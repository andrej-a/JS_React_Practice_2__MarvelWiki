import { Component } from 'react';
import ViewError from '../error/Error';
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
        }
    }
    
    marvelService = new MarvelService();
   
    componentDidMount() {
        this.marvelService.getAllCharacters()
        .then(list => this.onChangeState(list))
        .catch(this.onCatchError)
    }

    onChangeState = (list) => {
        this.setState({
            charList: list,
            loading: false
        })
    } 

    onCatchError = () => {
        this.setState({
            loading: false,
            error: true
        })
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
        const {loading, error, charList} = this.state;
        const spinner = loading ? <Spinner></Spinner> : null;
        const err = error ? <ViewError errorMessage={"Catch error! Please, upload this page."}></ViewError> : null;
        const content = !(loading || error) ? this.renderItems(charList) : null;
        return (
            <div className="char__list">
                {spinner}
                {err}
                {content}
                <button className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

export default CharList;
