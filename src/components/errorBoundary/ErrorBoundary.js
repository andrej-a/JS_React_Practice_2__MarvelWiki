import { Component } from 'react';
import ViewError from '../error/Error';

class ErrorBoundary extends Component {
    constructor(props){
        super(props)
        this.state = {
            error: false
        }
    }

    componentDidCatch(error, info) {
        console.log(error, info);
        this.setState({
            error: true
        })
    }

    //like componentDidCatch but just update state for error
    /*static getDerivedStateFromCatch(error) {
        return {error: true}
    }*/

    render() {
        if (this.state.error) {
            return(
                <ViewError errorMessage={this.props.errorMessage}></ViewError>
            )
        }

        return this.props.children
    }
}

export default ErrorBoundary;