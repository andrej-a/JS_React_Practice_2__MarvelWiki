

import { lazy, Suspense } from "react";
//React.lazy works only with export default (january 2022)
//dynamic imports have to call after static

import {BrowserRouter as Router, Route, Routes} from "react-router-dom";

import AppHeader from "../appHeader/AppHeader";
import Spinner from "../spinner/Spinner";

const NotPage = lazy(() => import("../pages/404/404"));
const MainPage = lazy(() => import("../pages/MainPage"));
const ComicsPage = lazy(() => import("../pages/ComicsPage"));
const SingleComicsPage = lazy(() => import("../pages/SingleComicsPage/SingleComicsPage"));
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
                            <Route path={"/comics/:comicsID"} element={<SingleComicsPage />} />
                            <Route path="*" element={<NotPage />}/>
                        </Routes>
                    </Suspense>
                </main>
            </div>
        </Router>
    )
}

export default App;