import { Component, Fragment } from 'react';
import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import './charList.scss';
import Cards from './cards/Cards';


class CharList extends Component {

    state = {
        loading: false,
        charList: []
    }
    
    marvelService = new MarvelService();

    getListCharacters = () => {
        const cards = [];
        this.marvelService.getAllCharacters()
        .then(list => list.map(obj => {
            return cards.push(obj)
        }))

        return cards;
    }
   
    componentDidMount() {
        this.setState({
            charList: this.getListCharacters()
        })
    }

    render() {
        const {loading} = this.state;
        const spinner = loading ? <Spinner></Spinner> : null;
        return (
            <div className="char__list">
                {spinner}
                <Cards obj={this.state.charList}></Cards>
                <button className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}


        
   

export default CharList;

{/*  */}