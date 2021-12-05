import { Component } from 'react';
import MarvelService from '../../services/MarvelService';

import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';

class RandomChar extends Component{
    constructor(props) {
        super(props)
        this.updateCharacter()
    }
    //syntax field of classes
    state = {
        name: null,
        thumbnail: null,
        description: null,
        homeLink: "#",
        wikiLink: "#"
    }

    marvelService = new MarvelService()

    updateCharacter = () => {
        this.marvelService
            .getCharacter(1011250)
            .then(res => {
                console.log(res);
                this.setState({
                    name: res["data"]["results"][0].name,
                    thumbnail: (res.data.results[0].thumbnail.path + `.${res.data.results[0].thumbnail.extension}`),
                    description: (res.data.results[0].description === "" ? "Sorry, there is not description." : res.data.results[0].description),
                    homeLink: res.data.results[0].urls[0].url,
                    wikiLink: res.data.results[0].urls[1].url
                })
            })
    }

    render() {
        const {name, thumbnail, description, homeLink, wikiLink} = this.state;
        
        return(
            <div className="random">
                <div className="random__info">
                    <div className="random__image">
                        <img src={thumbnail} alt={thumbnail} />
                    </div>
                    <div className="random__description">
                        <div className="random__title">
                            <h2>{name}</h2>
                        </div>
                        <div className="random__text">
                            <p>{description}</p>
                        </div>
    
                        <div className="random__buttons">
                            <div className="random__btns">
                                <a href={homeLink} className="button button__main">
                                    <div className="inner">homepage</div>
                                </a>
                            </div>
                            <div className="random__btns">
                                <a href={wikiLink} className="button button__secondary">
                                    <div className="inner">Wiki</div>
                                </a>
                            </div>
                        </div>
                        
                    </div>
                </div>
    
                <div className="random__action">
                        <div className="random__action__title">
                            <p>Random character for today!</p>
                            <p>Do you want to get to know him better?</p>
                        </div>
                        <div className="random__action__choose">
                            <p>Or choose another one</p>
                        </div>
                        <div className="random__action__image">
                            <img src={mjolnir} alt="mjolnir" />
                        </div>
                        <div className="random__action__btns" onClick={(id) => {this.updateCharacter(id)}}>
                            <a href="#" className="button button__main">
                                <div className="inner">try it</div>
                            </a>
                        </div>    
                </div>
            </div>
        )
    }
}

export default RandomChar;