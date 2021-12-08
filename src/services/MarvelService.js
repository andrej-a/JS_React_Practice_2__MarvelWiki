
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

    getAllCharacters = async () => {
        const res = await this.getResource(`${this._apiBase}characters?limit=9&offset=210&${this._apiKey}`);
        return res["data"]["results"].map(this._transformCharacter);
    }

    getCharacter = async (id) => {
        const res = await this.getResource(`${this._apiBase}characters/${id}?${this._apiKey}`);
        return this._transformCharacter(res["data"]["results"][0]); //there is {}
    }
                            //{}
    _transformCharacter = (character) => {
        return {
            name: character.name,
            thumbnail: (character.thumbnail.path + `.${character.thumbnail.extension}`),
            description: (character.description === "" ? "Sorry, there is not description." : this.doShortDescription(character.description)),
            homeLink: character.urls[0].url,
            wikiLink: character.urls[1].url
        }
    }

    doShortDescription = (str) => {
        if (str.length > 150) {
            str = `${str.slice(0, 151)}...`;
        }
        return str;
    };
}

export default MarvelService;