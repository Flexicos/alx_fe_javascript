let quotes = [
  { text: "Believe you can and you’re halfway there.", category: "motivation" },
  { text: "Learning never exhausts the mind.", category: "education" },
  { text: "Stay curious.", category: "inspiration" }
];

const quoteDisplay = document.getElementById("quoteDisplay");
const newQuoteBtn = document.getElementById("newQuote");

function displayQuote() {
  const index = Date.now() % quotes.length;
  const quote = quotes[index];

  // Clear previous content
  while (quoteDisplay.firstChild) {
    quoteDisplay.removeChild(quoteDisplay.firstChild);
  }

  const p = document.createElement("p");
  p.textContent = quote.text;

  const small = document.createElement("small");
  small.textContent = "Category: " + quote.category;

  quoteDisplay.appendChild(p);
  quoteDisplay.appendChild(small);
}

newQuoteBtn.addEventListener("click", displayQuote);

// Show first quote on load
displayQuote();
