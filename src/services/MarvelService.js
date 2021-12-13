
class MarvelService{
    _apiBase = "https://gateway.marvel.com:443/v1/public/";
    _apiKey = "apikey=2440c7a859b3bff0de7ce61825d29c6d"
     
    //the main method for get result
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
            id: character.id,
            name: this.doShortDescription(character.name, 20),
            thumbnail: (character.thumbnail.path + `.${character.thumbnail.extension}`),
            description: (character.description === "" ? "Sorry, there is not description." : this.doShortDescription(character.description, 150)),
            homeLink: character.urls[0].url,
            wikiLink: character.urls[1].url,
            comics: this.doSpliceOfComics(character.comics.items, 10)
        }
    }

    doShortDescription = (str, num) => {
        if (str.length > num) {
            str = `${str.slice(0, num)}...`;
        }
        return str;
    };

    doSpliceOfComics = (arr, num) => {
        if (arr.length > num) {
            arr = arr.splice(0, num) 
        }
        return arr;
    }
}

export default MarvelService;