import AppBanner from "../appBanner/AppBanner";
import ComicsList from "../comicsList/comicsList";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";

const ComicsPage = () => {
    return (
        <>
            <AppBanner/>
            <ErrorBoundary errorMessage={"Some problems. We are working for solve it."}>
                <ComicsList/>
            </ErrorBoundary>
        </>
    )
};

export default ComicsPage;