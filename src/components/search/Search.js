import { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import useMarvelService from '../../services/MarvelService';
import Spinner from "../spinner/Spinner"; 
import * as Yup from "yup";
import {Link} from "react-router-dom";
import "./Search.scss";

const Search = (props) => {
    const [name, setName] = useState("");
    const [character, setCharacter] = useState(null);
    const [isCharacter, setIsCharacter] = useState(false);
    const [isMistake, setIsMistake] = useState(false);
    const {loading, error,clearError, getCharacterByName} = useMarvelService();
    
    useEffect(() => {
        if (name.length === 0) {
            setIsCharacter(false);
            setIsMistake(false);
        }
    }, [name]);

    const onSetName = (value) => {
        setName(value);
    };

    const Message = (props) => {
        const button = error_message ? null : <Link to={`/${props.name}`}><button className="message__button">To page!</button></Link>;
        return(
            <div className="message">
                <div className={props.classez ? props.classez : "message__success"}> {props.text ? props.text : <div>There is! Visit <span>{props.name}</span> page?</div>} </div>
                {button}
            </div>
        )
    }

    const button = loading ? <Spinner width={"80px"} height={"80px"}/> : <button className="search__button" type="submit" > Find </button>;
    const message = isCharacter ? <Message name={character.name} /> : null;
    const error_message = isMistake ? <Message classez="message__error" text="This character is not found!" /> : null;

    return(
        <div className="search">
            <Formik
                initialValues={
                { //primary values for inputs/selectors bellow
                    text: '',
                }
                }
                validationSchema={Yup.object({//use Yup
                text: Yup.string()
                            .required('This field is required'),
                })}
                onSubmit={() => {
                    setIsCharacter(false);
                    setIsMistake(false);
                    
                    getCharacterByName(name)
                    .then(data => {
                        setCharacter(data)

                        if (data.id) {
                            setIsCharacter(true);
                            setIsMistake(false);
                        } else {
                            setIsCharacter(false);
                            setIsMistake(true);
                        }
                    });
                    
                }}
                >
                {({ values }) => (
                    <Form className="form">
                        <label htmlFor="text" className="search__text">Or find a character by name:</label>
                        <div className="wrapper">
                        <Field onKeyUp={ e => {onSetName(values.text)} } placeholder="Enter name"  id="text" name="text" type="text"></Field>
                        {button}
                        </div>
                        <ErrorMessage className="message__error" name="text" component="div" />
                        {message}
                        {error_message}
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default Search;