import { useState } from "react";

import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";

import decoration from '../../resources/img/vision.png';

const App = () => {
    const [selectedChar, getID] = useState(null);
    
    //get id selected char and put it to char info
    const onCharSelected = (id) => {
        getID(id);
    };

    return (
        <div className="app">
            <AppHeader/>
            <main>
                <ErrorBoundary errorMessage={"Some problems. We are working for solve it."}>
                    <RandomChar/>
                </ErrorBoundary>
                <div className="char__content">
                    <ErrorBoundary errorMessage={"Some problems. We are working for solve it."}>
                        <CharList 
                        onCharSelected={onCharSelected}
                        />
                    </ErrorBoundary>
                    
                    <ErrorBoundary errorMessage={"Something wrong. Please, try later."}>
                        <CharInfo 
                        charID={selectedChar}
                        />
                    </ErrorBoundary>
                </div>
                <img className="bg-decoration" src={decoration} alt="vision"/>
            </main>
        </div>
    )
}

export default App;