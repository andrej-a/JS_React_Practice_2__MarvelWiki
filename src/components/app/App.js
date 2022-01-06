import { useState } from "react";

import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";

import ComicsHeader from "../comicsHeader/comicsHeader";
import AppBanner from "../appBanner/AppBanner";
import ComicsList from "../comicsList/comicsList";
import decoration from '../../resources/img/vision.png';

const App = () => {
    const [selectedChar, getID] = useState(null);
    
    //get id selected char and put it to char info
    const onCharSelected = (id) => {
        getID(id);
    };

    return (
        <Router>
            <div className="app">
                <AppHeader/>
                <main>
                    <Switch>
                        <Route exact path="/">
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
                        </Route> {/* main rout */}
    
                        <Route exact path="/comics">
                            <AppBanner/>
                            <ErrorBoundary errorMessage={"Some problems. We are working for solve it."}>
                                <ComicsList/>
                            </ErrorBoundary>
                        </Route>
                    </Switch>
                </main>
            </div>
        </Router>
    )
}

export default App;