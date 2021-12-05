
class MarvelService{
    _apiBase = "https://gateway.marvel.com:443/v1/public/";
    _apiKey = "apikey=683ce3e04d05ad95bdd2b2a45512ae1a"
     getResource = async (url) => {
        let result = await fetch(url);

        if (!result.ok) {
            throw new Error(`This url ${url} throw error: ${result.status}`);
        }

        return await result.json();
    }

    getAllCharacters = () => {
        return this.getResource(`${this._apiBase}characters?limit=9&offset=210&${this._apiKey}`);
    }

    getCharacter = (id) => {
        return this.getResource(`${this._apiBase}characters/${id}?${this._apiKey}`);
    }
}

export default MarvelService;