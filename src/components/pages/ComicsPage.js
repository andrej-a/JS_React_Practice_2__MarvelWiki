import { Helmet } from "react-helmet";

import AppBanner from "../appBanner/AppBanner";
import ComicsList from "../comicsList/comicsList";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";

const ComicsPage = () => {
    return (
        <>
            <Helmet>
                <meta
                name="comics list"
                content="list of the comics"
                />
                <title>MIP_Comics</title>
            </Helmet>

            <AppBanner/>
            <ErrorBoundary errorMessage={"Some problems. We are working for solve it."}>
                <ComicsList/>
            </ErrorBoundary>
        </>
    )
};

export default ComicsPage;