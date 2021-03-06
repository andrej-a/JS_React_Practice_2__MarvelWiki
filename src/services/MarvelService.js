import useHttp from "../hooks/http.hook";

const useMarvelService = () => {
    const {loading, newItemsLoading, togglenewItemsLoading, request, error, clearError, process,
        onSetProcess,} = useHttp();

    const _apiBase = "https://gateway.marvel.com:443/v1/public/";
    const _apiKey = "apikey=2440c7a859b3bff0de7ce61825d29c6d";
    const _baseOffset = 210;
    const _baseLimit = 8;
     
    

    const getAllCharacters = async (offset = _baseOffset) => {
        const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);
        return res["data"]["results"].map(_transformCharacter);
    };

    const getCharacter = async (id) => {
        const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
        return _transformCharacter(res["data"]["results"][0]); //there is {}
    };

    const getAllComicses = async (offset = _baseOffset) => {
        const res = await request(`${_apiBase}comics?limit=${_baseLimit}&offset=${offset}&${_apiKey}`);
        return res["data"]["results"].map(_transformComics);
    };

    const getComics = async (id) => {
        const res = await request(`${_apiBase}comics/${id}?${_apiKey}`);
        return _transformComics(res["data"]["results"][0], false); //there is {}
    };

    const getCharacterByName = async (name) => {
        const res = await request(`${_apiBase}characters?name=${name}&${_apiKey}`);
        return res["data"]["results"].length > 0 ? _transformCharacter(res["data"]["results"][0], false) : [];
    };
                            //{}
    const _transformCharacter = (character, shortDescription = true) => {
        return {
            id: character.id,
            name: shortDescription ? doShortDescription(character.name, 20) : character.name,
            thumbnail: (character.thumbnail.path + `.${character.thumbnail.extension}`),
            description: (character.description === "" ? "Sorry, there is not description." : 
            shortDescription ? doShortDescription(character.description, 150) : character.description),
            homeLink: character.urls[0].url,
            wikiLink: character.urls[1].url,
            comics: doSpliceOfComics(character.comics.items, 10)
        };
    };

    const _transformComics = (comics, doShort = true) => {
        return {
            id: comics.id,
            price: +comics.prices[0].price === 0 ? "Not available now" : `${comics.prices[0].price}$`,
            name: doShort ? doShortDescription(comics.title, 30) : comics.title,
            pages: `${comics.pageCount} pages`,
            thumbnail: (comics.thumbnail.path + `.${comics.thumbnail.extension}`),
            language: comics.textObjects.languge || "en-us",
            description: (comics.description === ("" || null) ? "Sorry, there is not description." : comics.description),
            resourceURL: comics.urls[0].url,
        };
    };

    return {loading, 
            newItemsLoading, 
            togglenewItemsLoading, 
            error, 
            clearError, 
            _baseOffset, 
            getAllCharacters, 
            getCharacter, 
            getAllComicses, 
            getComics,
            getCharacterByName,
            process,
            onSetProcess}
    
};//useMarvelService

    const doShortDescription = (str, num) => {
        if (str.length > num) {
            str = `${str.slice(0, num)}...`;
        }
        return str;
    };

    const doSpliceOfComics = (arr, num) => {
        if (arr.length > num) {
            arr = arr.splice(0, num) 
        }
        return arr;
    };

export default useMarvelService;