

import { lazy, Suspense } from "react";
//React.lazy works only with export default (january 2022)
//dynamic imports have to call after static

import {BrowserRouter as Router, Route, Routes} from "react-router-dom";

import AppHeader from "../appHeader/AppHeader";
import Spinner from "../spinner/Spinner";

const NotPage = lazy(() => import("../pages/404/404"));
const MainPage = lazy(() => import("../pages/MainPage"));
const ComicsPage = lazy(() => import("../pages/ComicsPage"));
const SinglePage = lazy(() => import("../pages/SinglePage/SinglePage"));
const App = () => {
    return (
        <Router>
            <div className="app">
                <AppHeader/>
                <main>
                    <Suspense fallback={<Spinner />}>
                        <Routes>
                            <Route path="/" element={<MainPage />} />
                            <Route path="/comics" element={<ComicsPage />} />
                            <Route path={"/comics/:comicsID"} element={<SinglePage />} />
                            <Route path={"/:characterName"} element={<SinglePage />} />
                            <Route path="*" element={<NotPage />}/>
                        </Routes>
                    </Suspense>
                </main>
            </div>
        </Router>
    )
}

export default App;