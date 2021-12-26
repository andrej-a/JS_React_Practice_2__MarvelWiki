import React, { useState, useEffect, useRef } from 'react';
import PropTypes from "prop-types";
import ViewError from '../error/Error';
import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import './charList.scss';


const CharList = (props) => {
const marvelService = new MarvelService();

let [charList, setCharList] = useState([]);
let [loading, toggleLoading] = useState(true);
let [error, toggleError] = useState(false);
let [newItemsLoading, togglenewItemsLoading] = useState(false);
let [offset, toggleOffset] = useState(marvelService._baseOffset);
let [lastCharacters, toggleLastCharacters] = useState(false);

let itemRefs = useRef([]);

//firsttime loading
useEffect(() => {
    getMoreCharacters(offset);
}, []);        

//getting characters
function getMoreCharacters(offset){
    if (charList.length > 0) {
        togglenewItemsLoading(true);
    }

    marvelService.getAllCharacters(offset)
    .then(list => {

        if (list.length === 0) {
            toggleLastCharacters(true);
            togglenewItemsLoading(false);
        } else {
            onNewItemsCharacters(list);
        }  
    })
    .catch(onCatchError);
}

function onCatchError() {
    toggleLoading(false);
    togglenewItemsLoading(false);

    toggleError(true);
}

function onNewItemsCharacters(newArray) {
    setCharList(charList => [...charList, ...newArray]);
    toggleLoading(false);
    togglenewItemsLoading(false);
    toggleOffset(offset => offset + 9);
}

function focusOnItem(id) {
    if (itemRefs.current[id].classList.contains('char__item__selected')) {
        itemRefs.current[id].classList.remove('char__item__selected')
        itemRefs.current[id].classList.add('char__item');
    } else {
        itemRefs.current.forEach(item => item.classList.remove('char__item__selected'));
        itemRefs.current[id].classList.add('char__item__selected');
        itemRefs.current[id].focus();
    }
}

function renderItems(arr) {
    const items = arr.map((item, i) => {
        let imgStyle = {"objectFit": "cover"}
        
        if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
            imgStyle = {'objectFit' : 'unset'};
        }

        return (
            <li 
                ref={el => itemRefs.current[i] = el}
                className="char__item"
                onKeyPress={(e) => {
                    if (e.key === ' ' || e.key === "Enter") {
                        props.onCharSelected(item["id"])
                        focusOnItem(i);
                    }
                }}
                onClick={() => {
                    props.onCharSelected(item["id"])
                    focusOnItem(i);
                }}
                key={item["id"]}
                >
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
    const content = !(error) ? renderItems(charList) : null;
    const spinner = loading ? <Spinner></Spinner> : null;
    const err = error ? <ViewError errorMessage={"Catch error! Please, upload this page."}></ViewError> : null;
    
    const minLoad = (!(loading) && newItemsLoading) ? <Spinner></Spinner> : null;
    const lastCard = lastCharacters ? <ViewError errorMessage={"Out of cards."}></ViewError> : null;
    const loadButton = !(error || loading || newItemsLoading || lastCharacters) ? <LoadCharButton getMoreCharacters={() => getMoreCharacters(offset)}></LoadCharButton> : null;

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
