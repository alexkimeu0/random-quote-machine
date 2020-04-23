import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.css';
import 'bootstrap/dist/css/bootstrap.css';


const API = "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json";

class Quote extends React.Component {
    state = {
        quotes: [
            {
                "quote":"Life isn’t about getting and having, it’s about giving and being.","author":"Kevin Kruse"}
        ],
        index: 0
    }

    componentDidMount(){
        //call the API and update state
        fetch(API).then(res => res.json())
            .then(res => {
                this.setState({
                    quotes: res.quotes
                }, this.getRandomIndex);
            });
    }

    getRandomIndex = () => {
        const { quotes } = this.state;
        if(quotes.length > 0){
            const index = Math.floor(Math.random() * quotes.length);

            this.setState({
                index
            })
        }
    }

    render() {
        const { quotes, index } = this.state

        const quote = quotes[index];
        const tweetURL = `https://twitter.com/intent/tweet?text=${quote.quote} ~ ${quote.author}`

        return(
            <div className="wrapper d-flex align-items-center justify-content-center">
                <div className="col-md-6 col-xs-12 box p-4" id="quote-box">
                    {
                        quote && (
                            <div className="mb-4 text-center">
                                <i class="fa fa-quote-left fa-3x mb-2"> </i>                     &nbsp;
                                <p id="text">{quote.quote}</p>
                                <cite className="d-block text-center mt-2" id="author">~                         {quote.author}</cite>
                            </div>
                        )
                    }

                    <div className="d-flex justify-content-between                  mt-2">
                        <a href={tweetURL} target="_blank" class="btn btn-secondary" id="tweet-quote">
                            <i className="fab fa-twitter"></i></a>
                        <button className="btn btn-secondary" onClick={this.getRandomIndex} id="new-quote">
                            <i className="fas fa-random"></i></button>
                    </div>
                </div>
            </div>
        );
    }
}

ReactDOM.render(<Quote />, document.getElementById('root'));