import { Link, useParams } from 'react-router-dom';
import Spinner from '../../spinner/Spinner';
import ViewError from '../../error/Error';
import { useState, useEffect } from 'react';
import useMarvelService from '../../../services/MarvelService';

import './singlePage.scss';

const SinglePage = () => {
    const { comicsID } = useParams();
    const { characterName } = useParams();
    const [comic, setComic] = useState(null);
    const [character, setCharacter] = useState(null)

    const { loading, error, getComics, getCharacterByName } = useMarvelService();
    useEffect(() => {
        updateData(comicsID, getComics, onChangeComic);
    }, [comicsID]);

    useEffect(() => {
        updateData(characterName, getCharacterByName, onChangeCharacter);
    }, [characterName]);

    function updateData(value, getFunc, changeStateFunc) {
        if (!value) {
            return;
        }
        getFunc(value)
            .then(data => changeStateFunc(data));
    }

    function onChangeCharacter(data) {
        setCharacter(data);
    }

    function onChangeComic(list) {
        setComic(list);
    }

    const errorMessage = error ? <ViewError errorMessage={"This item was not finding in our data. Please, choose something else!"}></ViewError> : null;
    const spinner = loading ? <Spinner></Spinner> : null;
    const comicContent = !(loading || error || !comic) ? <ContentCard item={comic} /> : null;
    const characterContent = !(loading || error || !character) ? <ContentCard item={character} /> : null;

    return (
        <div className="single-comic">
            {errorMessage}
            {spinner}
            {comicContent}
            {characterContent}
            <Link className="single-comic__back" to={"/"}>Back to main</Link>
        </div>
    )
}

const ContentCard = (props) => {
    const {description, name, language, pages, price, thumbnail} = props.item;
    const pagesInfo = pages ? <p className="single-comic__descr">{pages}</p> : null;
    const languagesInfo = language ? <p className="single-comic__descr"> Language: {language} </p> : null;
    const priceInfo = price ? <div className="single-comic__price">{price}</div> : null;
    return (
        <>
            <img src={thumbnail} alt="x-men" className="single-comic__img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{name}</h2>
                <p className="single-comic__descr">{description}</p>
                {pagesInfo}
                {languagesInfo}
                {priceInfo}
            </div>
        </>
    )
}

export default SinglePage;