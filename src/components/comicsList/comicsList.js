import React, { useState, useEffect } from 'react';
import {Link} from "react-router-dom";
import ViewError from '../error/Error';
import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import "./comicsList.scss";


const ComicsList = () => {
    const {loading, newItemsLoading, togglenewItemsLoading, error, _baseOffset, getAllComicses} = useMarvelService();

    const [comicsList, setComicsList] = useState([]);
    const [comicsOffset, togglecomicsOffset] = useState(_baseOffset);
    const [lastComicses, toggleLastComicses] = useState(false);
    const [show, setShow] = useState(false);
    useEffect(() => {
        getMoreComicses(comicsOffset);
    }, []);

    function getMoreComicses(comicsOffset){
        if (comicsList.length > 0) {
            togglenewItemsLoading(true);
        }
    
        getAllComicses(comicsOffset)
        .then(list => {
            if (list.length === 0) {
                toggleLastComicses(true);
            } else {
                onNewItemsComicses(list);
            }  
        })
        .catch(onCatchError);
    }

    function onNewItemsComicses(newArray) {
        setComicsList(comicsList => [...comicsList, ...newArray]);
        togglecomicsOffset(comicsOffset => comicsOffset + 8);
        setShow(true);
    }

    function onCatchError() {
        togglenewItemsLoading(false);
    }

    const spinner = (!(newItemsLoading) && loading) ? <Spinner></Spinner> : null;
    const err = error ? <ViewError errorMessage={"Catch error! Please, upload this page."}></ViewError> : null;

    const minLoad = newItemsLoading ? <Spinner></Spinner> : null;
    const lastCard = lastComicses ? <ViewError errorMessage={"Out of cards."}></ViewError> : null;
    const loadButton = !(error || loading || newItemsLoading || lastComicses) ? <LoadCharButton getMoreComicses={() => getMoreComicses(comicsOffset)}></LoadCharButton> : null;


    return(
        <>
            <div className="comics">
                <RenderItems
                show={show} 
                arr={comicsList}
                ></RenderItems>
            </div>
            {spinner}
            {err}
            {minLoad}
            {lastCard}
            {loadButton}
        </>
    )
}

const RenderItems = (props) => {
    const items = props.arr.map((item, i) => {
        let imgStyle = {"objectFit": "cover"};
        
        if (item.thumbnail === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg") {
            imgStyle = {'objectFit' : 'unset'};
        }
        const timeout = 1000;
        return (
            <CSSTransition
            timeout={timeout}
            classNames="items"
            in={props.show}
            key={i} //service is missing and returns the comicses with repeat (january 2022)
            >
                <li 
                    className="comics__item items"
                    >
                        <Link to={`/comics/${item.id}`}>
                        <img src={item.thumbnail} alt={item.name} style={imgStyle}/>
                        </Link>
                        
                        <a target="blank" href={item["resourceURL"]}>
                            <div className="comics__item__title">
                                {item.name}
                            </div>
                        </a>
                        <div className="comics__item__price">
                            {item.price}
                        </div>
                </li>
            </CSSTransition>
        )
    })

    return (
        <ul className="comics__list">
            <TransitionGroup component={null}>
                {items}
            </TransitionGroup>
        </ul>
    )
}

const LoadCharButton = (props) => {
    return(
        <button
        onClick={() => props.getMoreComicses()}
        className="button button__main button__long">
            <div className="inner">load more</div>
        </button>
    )
}
export default ComicsList;