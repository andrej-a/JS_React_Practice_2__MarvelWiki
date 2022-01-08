import { Link, useParams } from 'react-router-dom';
import Spinner from '../../spinner/Spinner';
import ViewError from '../../error/Error';
import { useState, useEffect } from 'react';
import useMarvelService from '../../../services/MarvelService';

import './singleComic.scss';

const SingleComicsPage = () => {
    const { comicsID } = useParams();
    const [comic, setComic] = useState(null);
    const { loading, error, getComics } = useMarvelService();
    useEffect(() => {
        updateComics();
    }, [comicsID]);
    
    function updateComics() {
        if (!comicsID) {
            return;
        }
        getComics(comicsID)
            .then(list => onChangeState(list));
    }

    function onChangeState(list) {
        setComic(list);
    }
    const errorMessage = error ? <ViewError errorMessage={"This comic was not finding in our data. Please, choose something else!"}></ViewError> : null;
    const spinner = loading ? <Spinner></Spinner> : null;
    const content = !(loading || error || !comic) ? <ComicsCard comicsItem={comic} /> : null;

    return (
        <div className="single-comic">
            {errorMessage}
            {spinner}
            {content}
            <Link className="single-comic__back" to={"/comics"}>Back to all</Link>
        </div>
    )
}

const ComicsCard = (props) => {
    const {description, name, language, pages, price, thumbnail} = props.comicsItem;
    return (
        <>
            <img src={thumbnail} alt="x-men" className="single-comic__img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{name}</h2>
                <p className="single-comic__descr">{description}</p>
                <p className="single-comic__descr">{pages}</p>
                <p className="single-comic__descr">Language: {language}</p>
                <div className="single-comic__price">{price}</div>
            </div>
        </>
    )
}

export default SingleComicsPage;