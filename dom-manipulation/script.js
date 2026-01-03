let quotes = [
  { text: "Believe you can and you’re halfway there.", category: "motivation" },
  { text: "Learning never exhausts the mind.", category: "education" },
  { text: "Stay curious.", category: "inspiration" }
];

const quoteDisplay = document.getElementById("quoteDisplay");
const newQuoteBtn = document.getElementById("newQuote");

// REQUIRED FUNCTION
function showRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[randomIndex];

  quoteDisplay.innerHTML = `
    <p><strong>${quote.text}</strong></p>
    <small>Category: ${quote.category}</small>
  `;
}

function addQuote() {
  const textInput = document.getElementById("newQuoteText");
  const categoryInput = document.getElementById("newQuoteCategory");

  const newText = textInput.value.trim();
  const newCategory = categoryInput.value.trim();

  if (!newText || !newCategory) {
    alert("Please enter both quote and category.");
    return;
  }

  quotes.push({ text: newText, category: newCategory });

  textInput.value = "";
  categoryInput.value = "";

  alert("Quote added!");
}

newQuoteBtn.addEventListener("click", showRandomQuote);

// Show one on load
showRandomQuote();
