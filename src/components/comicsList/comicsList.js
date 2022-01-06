import React, { useState, useEffect, useRef } from 'react';
import ViewError from '../error/Error';
import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';

import "./comicsList.scss";


const ComicsList = () => {
    const {loading, newItemsLoading, togglenewItemsLoading, error, _baseOffset, getAllComicses} = useMarvelService();

    const [comicsList, setComicsList] = useState([]);
    const [comicsOffset, togglecomicsOffset] = useState(_baseOffset);
    const [lastComicses, toggleLastComicses] = useState(false);

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
    }

    function onCatchError() {
        togglenewItemsLoading(false);
    }

    function renderItems(arr) {
        const items = arr.map((item, i) => {
            let imgStyle = {"objectFit": "cover"};
            
            if (item.thumbnail === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg") {
                imgStyle = {'objectFit' : 'unset'};
            }
    
            return (
                <li 
                    className="comics__item"
                    key={item.id}
                    >
                    <img src={item.thumbnail} alt={item.name} style={imgStyle}/>
                    <a target="blank" href={item["resourceURL"]}>
                        <div className="comics__item__title">
                            {item.name}
                        </div>
                    </a>
                    <div className="comics__item__price">
                        {item.price}
                    </div>
                </li>
            )
        })

        return (
            <ul className="comics__list">
                {items}
            </ul>
        )
    }


    const content = !(error) ? renderItems(comicsList) : null;
    const spinner = (!(newItemsLoading) && loading) ? <Spinner></Spinner> : null;
    const err = error ? <ViewError errorMessage={"Catch error! Please, upload this page."}></ViewError> : null;

    const minLoad = newItemsLoading ? <Spinner></Spinner> : null;
    const lastCard = lastComicses ? <ViewError errorMessage={"Out of cards."}></ViewError> : null;
    const loadButton = !(error || loading || newItemsLoading || lastComicses) ? <LoadCharButton getMoreComicses={() => getMoreComicses(comicsOffset)}></LoadCharButton> : null;


    return(
        <>
            <div className="comics">
                {content}
            </div>
            {spinner}
            {err}
            {minLoad}
            {lastCard}
            {loadButton}
        </>
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