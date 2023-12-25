const qtContainer = document.getElementById('qt_container');
const qtDisplay   = document.getElementById('qt_display');
const authName    = document.getElementById('author_name');
const tweetBtn    = document.getElementById('tweet_btn');
const nextBtn     = document.getElementById('next_quote');
const loader      = document.getElementById('loader');
let apiQuotes     = [];

function loading() {
    loader.hidden = true;
    qtContainer.hidden = false;
}

function loadComplete () {
    if (!loader.hidden) {
        quoteContainer.hidden = false;
        loader.hidden = true;
    }
}

function nextQuote() {
    loading();
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    // adjusting font size according to quotes length
    if (quote.text.length > 45) {
        qtDisplay.classList.add('long-qt');
    } else {
        qtDisplay.classList.remove('long-qt');
    }
    if (!quote.author) {
        authName.textContent = 'Unknown';
    } else {
        // separating author name from other info added by typefit api
        const commaIndex = quote.author.indexOf(',');
        const authorName = commaIndex !== -1 ? quote.author.substring(0, commaIndex) : quote.author;
        authName.textContent = authorName;   
    }
    qtDisplay.textContent = quote.text;
    loadComplete();
}

// To get quotes from API
async function getQuotes() {
    loading();
    const apiURL = 'https://type.fit/api/quotes';
    // const apiURL = 'https://zenquotes.io/api/quotes'; //alternate api, need changes to use
    try {
        const response = await fetch(apiURL);
        apiQuotes = await response.json();
        nextQuote();
    } catch (error) {
        
    }
    loadComplete();
}

// Tweet Quote
function tweetQuote() {
    const quote = qtDisplay.innerText;
    const author = authName.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl, '_blank');
}

nextBtn.addEventListener('click', nextQuote);
tweetBtn.addEventListener('click', tweetQuote);

//on load
getQuotes();