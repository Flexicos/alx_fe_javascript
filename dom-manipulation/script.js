// Quotes array
let quotes = [
  { text: "The best way to get started is to quit talking and begin doing.", category: "Motivation" },
  { text: "Life is what happens when you're busy making other plans.", category: "Life" }
];

// DOM references
const quoteDisplay = document.getElementById("quoteDisplay");
const newQuoteBtn = document.getElementById("newQuoteBtn");
const addQuoteFormContainer = document.getElementById("addQuoteFormContainer");

// Function to display a random quote
function showRandomQuote() {
  if (quotes.length === 0) {
    quoteDisplay.innerHTML = "No quotes available.";
    return;
  }
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[randomIndex];
  quoteDisplay.innerHTML = `"${quote.text}" — <strong>${quote.category}</strong>`;
}

// Function to add a new quote
function addQuote(textInput, categoryInput) {
  const text = textInput.value.trim();
  const category = categoryInput.value.trim() || "Uncategorized";

  if (!text) {
    alert("Quote cannot be empty!");
    return;
  }

  quotes.push({ text, category });

  textInput.value = "";
  categoryInput.value = "";

  showRandomQuote();
}

// Function to dynamically create the add quote form
function createAddQuoteForm() {
  const formDiv = document.createElement("div");

  const textInput = document.createElement("input");
  textInput.type = "text";
  textInput.placeholder = "Enter a new quote";

  const categoryInput = document.createElement("input");
  categoryInput.type = "text";
  categoryInput.placeholder = "Enter category";

  const addButton = document.createElement("button");
  addButton.textContent = "Add Quote";

  addButton.addEventListener("click", () => addQuote(textInput, categoryInput));

  formDiv.appendChild(textInput);
  formDiv.appendChild(categoryInput);
  formDiv.appendChild(addButton);

  addQuoteFormContainer.appendChild(formDiv);
}

// Initialize
createAddQuoteForm();
newQuoteBtn.addEventListener("click", showRandomQuote);
