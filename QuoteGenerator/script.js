const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

// Get Quote from API

// console.log('Hello');
// async function getQuote() {
//     const proxyUrl='https://cors-anywhere.herokuapp.com/'
//     const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
//     try {
//         console.log('1');
//         const response = await fetch(proxyUrl+apiUrl);
//         const data=await response.json();
//         authorText.innerText = data.quoteAuthor;
//         quoteText.innerText = data.quoteText;
//         console.log('2');
//     } catch (error){
//         getQuote();
//     }
// }
// console.log('Hello 2');


async function getQuote() {
    loading();
    const proxyUrl = 'https://whispering-tor-04671.herokuapp.com/'
    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    try {
        const response = await fetch(proxyUrl + apiUrl);
        const data = await response.json();
        // If Author is blank, add 'Unknown'
        if (data.quoteAuthor === '') {
            authorText.innerText = 'Unknown';
        } else {
            authorText.innerText = data.quoteAuthor;
        }
        // Reduce font size for long quotes
        if (data.quoteText.length > 120) {
            quoteText.classList.add('long-quote');
        } else {
            quoteText.classList.remove('long-quote');
        }
        quoteText.innerText = data.quoteText;
        // Stop Loader, Show Quote
        complete();
    } catch (error) {
        getQuote();
    }
}