import './appHeader.scss';

const AppHeader = () => {
    return (
        <header>
            <div className="app">
                <div className="app__header">
                    <div className="app__title">
                        <h1><span>Marvel</span> information portal</h1>
                    </div>

                    <div className="app__menu">
                        <ul>
                            <li className="app__menu active">Characters</li>
                             <span>/</span>
                            <li className="app__menu">Comics</li>
                        </ul>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default AppHeader;