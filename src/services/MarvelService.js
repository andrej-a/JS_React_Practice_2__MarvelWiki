import useHttp from "../hooks/http.hook";

const useMarvelService = () => {
    const {loading, newItemsLoading, togglenewItemsLoading, request, error, clearError} = useHttp();

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
        console.log(res);
        return res["data"]["results"].map(_transformComics);
    };
                            //{}
    const _transformCharacter = (character) => {
        return {
            id: character.id,
            name: doShortDescription(character.name, 20),
            thumbnail: (character.thumbnail.path + `.${character.thumbnail.extension}`),
            description: (character.description === "" ? "Sorry, there is not description." : doShortDescription(character.description, 150)),
            homeLink: character.urls[0].url,
            wikiLink: character.urls[1].url,
            comics: doSpliceOfComics(character.comics.items, 10)
        };
    };

    const _transformComics = (comics) => {
        return {
            id: comics.id,
            price: +comics.prices[0].price === 0 ? "Not available now" : comics.prices[0].price,
            name: doShortDescription(comics.title, 30),
            thumbnail: (comics.thumbnail.path + `.${comics.thumbnail.extension}`),
            description: (comics.description === "" ? "Sorry, there is not description." : comics.description),
            resourceURL: comics.urls[0].url,
        };
    };

    return {loading, newItemsLoading, togglenewItemsLoading, error, clearError, _baseOffset, getAllCharacters, getCharacter, getAllComicses}
    
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