import React, { useState, useEffect, useRef } from 'react';
import PropTypes from "prop-types";
import ViewError from '../error/Error';
import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './charList.scss';


const CharList = (props) => {
const {loading, newItemsLoading, togglenewItemsLoading, error, _baseOffset, getAllCharacters} = useMarvelService();

const [charList, setCharList] = useState([]);
const [offset, toggleOffset] = useState(_baseOffset);
const [lastCharacters, toggleLastCharacters] = useState(false);
const [show, setShow] = useState(false);
//firsttime loading
useEffect(() => {
    getMoreCharacters(offset);
}, []);        

//getting characters
function getMoreCharacters(offset){
    if (charList.length > 0) {
        togglenewItemsLoading(true);
    }

    getAllCharacters(offset)
    .then(list => {
        if (list.length === 0) {
            toggleLastCharacters(true);
        } else {
            onNewItemsCharacters(list);
        }  
    })
    .catch(onCatchError);
}

function onCatchError() {
    togglenewItemsLoading(false);
}

function onNewItemsCharacters(newArray) {
    setCharList(charList => [...charList, ...newArray]);
    toggleOffset(offset => offset + 9);
    setShow(true);
}


    const spinner = (!(newItemsLoading) && loading) ? <Spinner></Spinner> : null;
    const err = error ? <ViewError errorMessage={"Catch error! Please, upload this page."}></ViewError> : null;
    
    const minLoad = newItemsLoading ? <Spinner></Spinner> : null;
    const lastCard = lastCharacters ? <ViewError errorMessage={"Out of cards."}></ViewError> : null;
    const loadButton = !(error || loading || newItemsLoading || lastCharacters) ? <LoadCharButton setShow={setShow} getMoreCharacters={() => getMoreCharacters(offset)}></LoadCharButton> : null;

    return (
        <div className="char__list">
            {spinner}
            {err}
            <RenderItems
            onCharSelected={props.onCharSelected} 
            show={show} 
            arr={charList}></RenderItems>
            {minLoad}
            {loadButton}
            {lastCard}
        </div>
    )
}

const RenderItems = (props) => {
    let itemRefs = useRef([]);

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

    const items = props.arr.map((item, i) => {
        let imgStyle = {"objectFit": "cover"};
        const timeout = 1000;
        if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
            imgStyle = {'objectFit' : 'unset'};
        }

        return (
            <CSSTransition
            key={item["id"]}
            classNames="items"
            timeout={timeout}
            in={props.show}
            >
                <li 
                    ref={el => itemRefs.current[i] = el}
                    className="char__item items"
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
                    >
                        <img src={item.thumbnail} alt={item.name} style={imgStyle}/>
                        <a target="blank" href={item["homeLink"]}>
                            <div className="char__name">{item.name}</div>
                        </a>
                </li>
            </CSSTransition>
        )
    })
    
    return (
        <ul className="char__grid">
            <TransitionGroup component={null}>
                {items}
            </TransitionGroup>
        </ul>
    )
}

const LoadCharButton = (props) => {
    return(
        <button
        onClick={() => {
            props.getMoreCharacters();
            props.setShow(false);
        }}
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