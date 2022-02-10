import { useState } from "react";
import { Helmet } from "react-helmet";

import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import Search from "../search/Search"
import decoration from '../../resources/img/vision.png';

import ErrorBoundary from "../errorBoundary/ErrorBoundary";

const MainPage = () => {
    const [selectedChar, getID] = useState(null);
    const [character, getCharacter] = useState(null);
    //get id selected char and put it to char info
    const onCharSelected = (id) => {
        getID(id);
    };

    return(
        <>
            <Helmet>
                <meta
                name="description"
                content="MIP_Marvel-information-portal"
                />
                <title>MIP_Characters</title>
            </Helmet>
            
            <ErrorBoundary errorMessage={"Some problems. We are working for solve it."}>
                <RandomChar/>
            </ErrorBoundary>
            <div style={{position: "relative"}} className="char__content">
                <ErrorBoundary errorMessage={"Some problems. We are working for solve it."}>
                    <CharList 
                    onCharSelected={onCharSelected}
                    />
                </ErrorBoundary>
                
                <div className="characters_active">
                    <ErrorBoundary errorMessage={"This component is wrong. We are solving it."}>
                        <CharInfo 
                        charID={selectedChar}
                        />
                    </ErrorBoundary>

                    <ErrorBoundary errorMessage={"This component is wrong. We are solving it."}>
                        <Search />
                    </ErrorBoundary>
                </div>
            </div>
            <img className="bg-decoration" src={decoration} alt="vision"/>
        </>
    )
};

export default MainPage;