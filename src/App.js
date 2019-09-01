import React, { Component } from "react";
import "./App.css";
//import data from 'https://raw.githubusercontent.com/justinmuskopf/Quotes/master/quotes.json';
//import data from 'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quotesData: [], //This will store all the authors & quotes in an array.
      quotesLength: 0, //This will be the length of the array.
      currQuote: "", //The current quote.
      currAuthor: "" //The current quote's author.
    };
    this.getRandomQuote = this.getRandomQuote.bind(this);
    this.setRandomGradient = this.setRandomGradient.bind(this);
    // this.facebookShare = this.facebookShare.bind(this);
  }

  componentDidMount() {
    //Runs when the app first opens.
    const fCCscript = document.createElement("script");
    fCCscript.src =
      "https://cdn.freecodecamp.org/testable-projects-fcc/v1/bundle.js";
    fCCscript.async = true;
    document.body.appendChild(fCCscript); //Needed to for freeCodeCamp Test Suite.

    //Fetches the quotes from the JSON file.
    const url =
      "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/";
    //const url = "https://raw.githubusercontent.com/justinmuskopf/Quotes/master/quotes.json"; //Alternative JSON file.

    fetch(url)
      .then(response => {
        return response.json();
      })
      .then(myJson => {
        myJson = JSON.stringify(myJson);
        //console.log ("myJson: ", myJson)
        if (typeof myJson === "string") {
          myJson = JSON.parse(myJson);
          this.setState({
            quotesData: myJson, //Every author and quote stored in an array.
            quotesLength: myJson.quotes.length //Length of the array.
          });
          // console.log("this.state.quotesData: ", this.state.quotesData);
          // console.log("this.state.quotesLength: ", this.state.quotesLength);
          this.getRandomQuote(); //Chooses a random quote to display when the app first loads.
        } else {
          console.log("Error loading JSON file.");
        }
      });

    // (function(d, s, id) { //Needed for the Facebook Share button.
    //   		var js, fjs = d.getElementsByTagName(s)[0];
    //   		if (d.getElementById(id)) return;
    //   		js = d.createElement(s); js.id = id;
    //   		js.src = "https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v3.0";
    //   		fjs.parentNode.insertBefore(js, fjs);
    // 		}(document, 'script', 'facebook-jssdk'));
  }

  getRandomQuote() {
    //Gets a random quote and updates the state.
    var randomNum = Math.floor(Math.random() * this.state.quotesLength + 1); //Chooses a random number within the length of the array.
    //console.log("randomNum: ", randomNum);

    this.setRandomGradient();

    this.setState({
      currQuote: this.state.quotesData.quotes[randomNum].quote,
      currAuthor: this.state.quotesData.quotes[randomNum].author
    });
    console.log(
      "this.state.currQuote: ",
      this.state.quotesData.quotes[randomNum].quote
    );
    console.log(
      "this.state.currAuthor: ",
      this.state.quotesData.quotes[randomNum].author
    );
  }

  setRandomGradient() {
    //Sets the background of the quote-box to a random gradient colour.
    let color1 = getRandomColor();
    let color2 = getRandomColor();

    function getRandomColor() {
      //Returns a random color in format #FF00FF.
      let letters = "89ABCDEF";
      let color = "#";
      for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 8)];
      }
      return color;
    }

    console.log("color1: ", color1, "color2: ", color2);
    document.getElementById(
      "quote-box"
    ).style.background = color1; /* Old browsers */
    document.getElementById("quote-box").style.background =
      "-moz-linear-gradient(top, " +
      color1 +
      " 0%, " +
      color2 +
      " 100%);"; /* FF3.6-15 */
    document.getElementById("quote-box").style.background =
      "-webkit-linear-gradient(top, " +
      color1 +
      " 0%, " +
      color2 +
      " 100%)"; /* Chrome10-25,Safari5.1-6 */
    document.getElementById("quote-box").style.background =
      "linear-gradient(to bottom, " +
      color1 +
      " 0%, " +
      color2 +
      " 100%)"; /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
    document.getElementById("quote-box").style.filter =
      "progid:DXImageTransform.Microsoft.gradient( startColorstr='" +
      color1 +
      "', endColorstr='" +
      color2 +
      "', GradientType=0)"; /* IE6-9 */
  }

  // facebookShare() {
  // 	console.log("Sharing!")
  // }

  render() {
    var res = encodeURIComponent(
      this.state.currQuote + " -" + this.state.currAuthor
    );
    //console.log("res: " + res);

    return (
      <div className="App" id="App">
        <h1>Random Quote Machine</h1>
        <div id="quote-box">
          <div id="text">
            <div id="quote">“{this.state.currQuote}”</div>
            <div id="author">-{this.state.currAuthor}</div>
            <button id="new-quote" onClick={this.getRandomQuote}>
              New Quote
            </button>
            <a
              id="tweet-quote"
              href={
                "https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=" +
                res
              }
              target="_blank"
              alt="Tweet this Quote!"
              rel="noopener noreferrer"
            >
              Tweet Quote
            </a>
            {/*<button id="shareBtn" onClick={this.facebookShare}>Share</button>
	                  <div class="fb-share-button" 
	    			   	   data-href="https://www.your-domain.com/your-page.html" 
	    			 	   data-layout="button_count">
	  				  </div>*/}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
