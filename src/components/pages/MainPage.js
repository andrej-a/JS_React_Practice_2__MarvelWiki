import { useState } from "react";

import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import decoration from '../../resources/img/vision.png';

import ErrorBoundary from "../errorBoundary/ErrorBoundary";

const MainPage = () => {
    const [selectedChar, getID] = useState(null);
    
    //get id selected char and put it to char info
    const onCharSelected = (id) => {
        getID(id);
    };
    return(
        <>
            <ErrorBoundary errorMessage={"Some problems. We are working for solve it."}>
                <RandomChar/>
            </ErrorBoundary>
            <div className="char__content">
                <ErrorBoundary errorMessage={"Some problems. We are working for solve it."}>
                    <CharList 
                    onCharSelected={onCharSelected}
                    />
                </ErrorBoundary>
                
                <ErrorBoundary errorMessage={"This component is wrong. We are solving it."}>
                    <CharInfo 
                    charID={selectedChar}
                    />
                </ErrorBoundary>
            </div>
            <img className="bg-decoration" src={decoration} alt="vision"/>
        </>
    )
};

export default MainPage;