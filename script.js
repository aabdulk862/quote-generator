const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

// Show Loading
function loading() {
  loader.hiden = false;
  quoteContainer.hidde = true;
}
// Hide Loading
function complete() {
  quoteContainer.hidden = false;
  loader.hidden = true;
}
let apiQuotes = [];

// Show New Quote
function newQuote() {
  loading();
  // Pick a random quote from apiQuotes array
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  //   Check if author is blank
  if (!quote.author) {
    authorText.textContent = "Unkown";
  } else {
    authorText.textContent = quote.author;
  }

  //   Check Qutoe Length to determine styling
  if (quote.text.length > 100) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }
  //   Set Quote, Hide Loader
  quoteText.textContent = quote.text;
  complete();
}
// Get quotes From API
async function getQuotes() {
  loading();
  const apiUrl = "https://type.fit/api/quotes";
  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    newQuote();
  } catch (error) {
    // Catch error here
  }
}

// Tweet Quote
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, "_blank");
}

//  Event Listener
newQuoteBtn.addEventListener("click", newQuote);
twitterBtn.addEventListener("click", tweetQuote);

// On Load
getQuotes();
